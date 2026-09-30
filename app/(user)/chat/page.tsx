import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";

type Props = {
  searchParams: Promise<{
    error: string;
  }>;
};

async function App({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div>
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}

      <ChatList />
    </div>
  );
}

export default App;
