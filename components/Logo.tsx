import Link from "next/link";

function Logo() {
  return (
    <Link href="/" prefetch={false}>
      <div className="flex items-center h-14 px-2">
        <span className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          Lingua
        </span>
        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Chat
        </span>
      </div>
    </Link>
  );
}

export default Logo;
