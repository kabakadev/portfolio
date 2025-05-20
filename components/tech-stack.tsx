"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Code, Server, Wrench } from "lucide-react";

const technologies = {
  frontend: [
    { name: "React", level: "Advanced" },
    { name: "Next.js", level: "Intermediate" },
    { name: "TypeScript", level: "Intermediate" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Framer Motion", level: "Intermediate" },
    { name: "Ripple UI", level: "Intermediate" },
    { name: "Material UI", level: "Intermediate" },
  ],
  backend: [
    { name: "Python", level: "Advanced" },
    { name: "Flask", level: "Intermediate" },
    { name: "SQLAlchemy", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "PHP", level: "Intermediate" },
    { name: "Laravel Framework", level: "Beginner" },
    { name: "Guzzle HTTP", level: "Beginner" },
    { name: "Laravel CORS", level: "Beginner" },
    { name: "Laravel Tinker", level: "Beginner" },
  ],
  tools: [
    { name: "Git", level: "Advanced" },
    { name: "Docker", level: "Intermediate" },
    { name: "GitHub Actions", level: "Intermediate" },
    { name: "Postman", level: "Intermediate" },
    { name: "M-Pesa Daraja API", level: "Intermediate" },
  ],
};

// Simple Marquee component that uses CSS animations instead of JS
function SimpleMarquee({ children }: { children: React.ReactNode }) {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const updateWidths = () => {
      setContainerWidth(containerRef.current?.offsetWidth || 0);
      setContentWidth(contentRef.current?.offsetWidth || 0);
    };

    updateWidths();
    window.addEventListener("resize", updateWidths);
    return () => window.removeEventListener("resize", updateWidths);
  }, []);

  // Only animate if content is wider than container
  const needsMarquee = contentWidth > containerWidth;

  if (!needsMarquee) {
    return <div className="flex flex-wrap gap-3">{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className="overflow-hidden relative"
      onMouseEnter={() => setShouldAnimate(false)}
      onMouseLeave={() => setShouldAnimate(true)}
      onTouchStart={() => setShouldAnimate(false)}
      onTouchEnd={() => setShouldAnimate(true)}
    >
      <div
        ref={contentRef}
        className={`flex gap-3 ${shouldAnimate ? "animate-marquee" : ""}`}
        style={{
          animationPlayState: shouldAnimate ? "running" : "paused",
          paddingRight: "2rem", // Add spacing between the end and start of the loop
        }}
      >
        {children}
      </div>
      <div
        className={`flex gap-3 absolute top-0 ${
          shouldAnimate ? "animate-marquee2" : ""
        }`}
        style={{
          animationPlayState: shouldAnimate ? "running" : "paused",
          paddingRight: "2rem", // Add spacing between the end and start of the loop
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function TechStack() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

  return (
    <section
      id="tech-stack"
      className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Tech Stack
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TechCategory
            title="Frontend"
            icon={<Code size={24} />}
            technologies={technologies.frontend}
            prefersReducedMotion={prefersReducedMotion}
            isDesktop={isDesktop}
            container={container}
            item={item}
          />

          <TechCategory
            title="Backend"
            icon={<Server size={24} />}
            technologies={technologies.backend}
            prefersReducedMotion={prefersReducedMotion}
            isDesktop={isDesktop}
            container={container}
            item={item}
          />

          <TechCategory
            title="Tools & APIs"
            icon={<Wrench size={24} />}
            technologies={technologies.tools}
            prefersReducedMotion={prefersReducedMotion}
            isDesktop={isDesktop}
            container={container}
            item={item}
          />
        </div>
      </div>
    </section>
  );
}

function TechCategory({
  title,
  icon,
  technologies,
  prefersReducedMotion,
  isDesktop,
  container,
  item,
}: {
  title: string;
  icon: React.ReactNode;
  technologies: { name: string; level: string }[];
  prefersReducedMotion: boolean;
  isDesktop: boolean;
  container: any;
  item: any;
}) {
  const renderTechItem = (tech: { name: string; level: string }) => (
    <div
      key={tech.name}
      className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 flex justify-between items-center min-w-[200px] md:min-w-0"
    >
      <span className="font-medium text-gray-900 dark:text-white">
        {tech.name}
      </span>
      <span className="text-sm px-3 py-1 rounded-lg bg-primary/10 text-primary ml-2">
        {tech.level}
      </span>
    </div>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="overflow-hidden">
        {isDesktop || prefersReducedMotion ? (
          <motion.div
            className="flex flex-col gap-3"
            variants={prefersReducedMotion ? {} : container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {technologies.map(renderTechItem)}
          </motion.div>
        ) : (
          <div className="pb-2">
            <SimpleMarquee>{technologies.map(renderTechItem)}</SimpleMarquee>
          </div>
        )}
      </div>
    </div>
  );
}
