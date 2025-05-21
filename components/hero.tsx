"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export default function Hero() {
  const [text, setText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Building modern web experiences";
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setText(fullText);
      return;
    }

    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [prefersReducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 -z-10" />

      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center animate-fadeSlideIn">
          {/* Heading with consistent mobile font size */}
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Full-Stack Developer
          </h1>

          {/* Subtext with proper wrapping and font size */}
          <p className="text-base md:text-xl text-gray-700 dark:text-gray-300 mb-2 h-8">
            {text}
            <span
              className={`${
                showCursor ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              |
            </span>
          </p>

          <p className="text-gray-600 dark:text-gray-400 mb-8 text-base md:text-lg">
            Crafting responsive, accessible, and performant web applications
          </p>

          {/* Vertically stacked, full-width buttons on mobile */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="#projects"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary/90 text-white font-medium text-lg hover:opacity-90 transition-colors min-h-[44px] flex items-center justify-center"
            >
              View Projects
            </Link>
            <Link
              href="#contact"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-medium text-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-h-[44px] flex items-center justify-center gap-2"
            >
              Contact Me <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/kabakadev"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/ian-kabaka/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
