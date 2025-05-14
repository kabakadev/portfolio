"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle body overflow and focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      // Simple focus trap implementation
      const focusableElements = drawerRef.current?.querySelectorAll(
        'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      ) as NodeListOf<HTMLElement>;

      if (focusableElements && focusableElements.length > 0) {
        // Focus the first element
        focusableElements[0].focus();

        // Handle tab key navigation
        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key === "Tab") {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            // If shift + tab and on first element, move to last element
            if (e.shiftKey && document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
            // If tab and on last element, move to first element
            else if (!e.shiftKey && document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        };

        document.addEventListener("keydown", handleTabKey);
        return () => {
          document.removeEventListener("keydown", handleTabKey);
        };
      }
    } else {
      document.body.style.overflow = "auto";
      // Return focus to menu button when closing
      if (menuButtonRef.current) {
        menuButtonRef.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
          onClick={() => setIsOpen(false)}
        >
          <span className="text-primary">Dev</span>Portfolio
        </Link>

        {/* Mobile menu button and theme toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-base font-medium transition-colors hover:text-primary text-gray-700 dark:text-gray-300"
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile drawer menu with backdrop - using CSS transitions */}
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 z-40 md:hidden animate-fadeIn"
              aria-hidden="true"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <div
              ref={drawerRef}
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 h-full w-4/5 max-w-[300px] bg-white dark:bg-gray-900 z-50 md:hidden shadow-xl rounded-l-xl overflow-auto animate-slideIn"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
                <Link
                  href="/"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-primary">Dev</span>Portfolio
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col py-4">
                {navItems.map((item, index) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative overflow-hidden text-xl font-medium py-4 px-6 text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors active:bg-gray-100 dark:active:bg-gray-700 min-h-[44px] flex items-center animate-fadeSlideIn"
                    style={{ animationDelay: `${index * 75}ms` }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div
                  className="mt-4 px-6 animate-fadeSlideIn"
                  style={{ animationDelay: `${navItems.length * 75}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700 dark:text-gray-300">
                      Theme:
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
