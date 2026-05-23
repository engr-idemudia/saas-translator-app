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

async function translateText(
  text: string,
  targetLang: string,
): Promise<string> {
  const response = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`,
  );
  const data = await response.json();
  return data[0]?.map((item: any) => item[0]).join("") || text;
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

    await Promise.all(
      supportedLanguages.map(async (lang) => {
        const translated = await translateText(input, lang);
        translations[lang] = translated;
      }),
    );

    await adminDb
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .doc(messageId)
      .update({ translated: translations });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Translation failed" }, { status: 500 });
  }
}
