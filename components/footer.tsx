import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 dark:text-white"
            >
              Kabaka<span className="text-primary">Dev</span>
            </Link>
            <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-md">
              Building modern, responsive, and accessible web applications with
              a focus on performance and user experience.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/kabakadev"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter size={20} />
              </a>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © {currentYear} KabakaDev. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
