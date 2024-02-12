import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg border-t">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          Developed by{" "}
          <Link
            href="https://github.com/jaykeraliya0"
            target="_blank"
            className="hover:underline"
          >
            Jay Keraliya & Henil Mendapra
          </Link>
        </span>
        <span className="text-sm text-gray-500 sm:text-center">
          Licensed under MIT.{" "}
          <Link
            href="https://github.com/jay-s-block/project-block-subs"
            target="_blank"
            className="hover:underline"
          >
            Source code
          </Link>
        </span>
      </div>
    </footer>
  );
}
