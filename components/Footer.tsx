export default function Footer() {
  return (
    <footer className="bg-white rounded-lg">
      <div className="w-full mx-auto max-w-screen-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          Developed by{" "}
          <a
            href="https://github.com/jaykeraliya0"
            target="_blank"
            className="hover:underline"
          >
            Jay Keraliya
          </a>
        </span>
        {/* add github source code link */}
        <span className="text-sm text-gray-500 sm:text-center">
          Licensed under MIT.{" "}
          <a
            href="https://github.com/jaykeraliya0/project-block-subs"
            target="_blank"
            className="hover:underline"
          >
            Source code
          </a>
        </span>
      </div>
    </footer>
  );
}
