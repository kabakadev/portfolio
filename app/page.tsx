import { Suspense } from "react";
import Hero from "@/components/hero";
import TechStack from "@/components/tech-stack";
import Projects from "@/components/projects";
import About from "@/components/about";
import Contact from "@/components/contact";
import LoadingSpinner from "@/components/loading-spinner";

export default function Home() {
  return (
    <main className="min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white dark:focus:bg-gray-900 focus:z-50"
      >
        Skip to content
      </a>
      <div id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <TechStack />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Projects />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <About />
        </Suspense>
        <Suspense fallback={<LoadingSpinner />}>
          <Contact />
        </Suspense>
      </div>
    </main>
  );
}
