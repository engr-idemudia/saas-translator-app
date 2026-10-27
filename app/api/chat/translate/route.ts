import { adminDb } from "@/firebase-admin";
import { NextResponse } from "next/server";
import { LanguagesSupported } from "@/store/store";

const supportedLanguages: LanguagesSupported[] = [
  "en",
  "de",
  "fr",
  "es",
  "hi",
  "ja",
  "la",
  "ru",
  "zh",
  "ar",
  "et",
];

const REQUEST_TIMEOUT_MS = 8000;

// Fetch JSON with a timeout. Throws if the reply is not OK or not JSON
// (for example, the HTML "unusual traffic" page Google sometimes returns).
async function fetchJson(url: string): Promise<any> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  if (!response.ok || !contentType.includes("json")) {
    throw new Error(
      `Unexpected reply: ${response.status} ${contentType || "no content type"}`,
    );
  }

  return response.json();
}

// Provider 1: Google's free translation endpoint (no API key).
async function translateWithGoogle(
  text: string,
  targetLang: string,
): Promise<string> {
  const data = await fetchJson(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
  );
  const translated = data?.[0]?.map((item: any) => item[0]).join("");
  if (!translated) throw new Error("Empty Google translation");
  return translated;
}

// Provider 2: MyMemory free API (no API key). Setting MYMEMORY_EMAIL raises
// the free daily limit from about 5,000 to 50,000 characters.
async function translateWithMyMemory(
  text: string,
  targetLang: string,
): Promise<string> {
  const email = process.env.MYMEMORY_EMAIL;
  const data = await fetchJson(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=Autodetect|${targetLang}${email ? `&de=${encodeURIComponent(email)}` : ""}`,
  );
  const translated: string | undefined = data?.responseData?.translatedText;
  if (data?.responseStatus !== 200 || !translated) {
    throw new Error(`MyMemory error: ${data?.responseDetails ?? "no result"}`);
  }
  return translated;
}

// Try each provider in turn. If all fail, keep the original text, so the
// message still shows and the loading spinner stops.
async function translateText(
  text: string,
  targetLang: string,
): Promise<{ text: string; ok: boolean }> {
  for (const provider of [translateWithGoogle, translateWithMyMemory]) {
    try {
      return { text: await provider(text, targetLang), ok: true };
    } catch (error) {
      console.warn(
        `${provider.name} failed for "${targetLang}":`,
        (error as Error).message,
      );
    }
  }
  return { text, ok: false };
}

export async function POST(req: Request) {
  const { chatId, messageId, input } = await req.json();

  if (!chatId || !messageId || !input) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  try {
    const translations: Partial<Record<LanguagesSupported, string>> = {};
    let failed = 0;

    await Promise.all(
      supportedLanguages.map(async (lang) => {
        const result = await translateText(input, lang);
        translations[lang] = result.text;
        if (!result.ok) failed++;
      }),
    );

    if (failed > 0) {
      console.error(
        `Translation incomplete: ${failed} of ${supportedLanguages.length} languages kept the original text.`,
      );
    }

    await adminDb
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .doc(messageId)
      .update({ translated: translations });

    return NextResponse.json({ success: true, failed });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
