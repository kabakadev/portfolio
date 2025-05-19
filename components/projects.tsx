"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import Image from "next/image";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Weather Forecast",
    description:
      "A weather dashboard built with Next.js featuring city search, temperature unit toggle, and a 3-day forecast.",
    image: "/images/project_images/weather_forecast.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "OpenWeatherMap API"],
    github: "https://github.com/kabakadev/weather-frontend",
    demo: "https://weather-frontend-umber.vercel.app/",
  },
  // …other projects
];

export default function Projects() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  return (
    <section id="projects" className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ——————————————————————————————————————————
// Marquee component for smooth looping animation
// ——————————————————————————————————————————
interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  prefersReducedMotion?: boolean;
}

function Marquee({
  children,
  speed = 20,
  pauseOnHover = true,
  direction = "left",
  prefersReducedMotion = false,
}: MarqueeProps): JSX.Element {
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const baseVelocity = direction === "left" ? -speed : speed;

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;
    const measure = () => {
      setContainerWidth(containerRef.current!.offsetWidth);
      setContentWidth(contentRef.current!.offsetWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [children]);

  useEffect(() => {
    setShouldAnimate(contentWidth > containerWidth);
  }, [contentWidth, containerWidth]);

  useAnimationFrame((_, delta) => {
    if (prefersReducedMotion || !shouldAnimate || !contentWidth) return;
    const moveBy = baseVelocity * (delta / 1000);
    if (direction === "left" && x.get() <= -contentWidth) {
      x.set(0);
    } else if (direction === "right" && x.get() >= contentWidth) {
      x.set(0);
    }
    x.set(x.get() + moveBy);
  });

  if (!shouldAnimate || prefersReducedMotion) {
    return (
      <div className="flex justify-start overflow-hidden" ref={containerRef}>
        <div ref={contentRef} className="flex gap-2">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex overflow-hidden relative"
      ref={containerRef}
      onMouseEnter={() => pauseOnHover && setShouldAnimate(false)}
      onMouseLeave={() => pauseOnHover && setShouldAnimate(true)}
      onTouchStart={() => setShouldAnimate(false)}
      onTouchEnd={() => setShouldAnimate(true)}
    >
      <motion.div
        ref={contentRef}
        className="flex gap-2 min-w-max"
        style={{ x }}
      >
        {children}
      </motion.div>
      <motion.div
        className="flex gap-2 min-w-max absolute left-full"
        style={{ x }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ——————————————————————————————————————————
// ProjectCard
// ——————————————————————————————————————————
function ProjectCard({
  project,
  index,
  prefersReducedMotion,
}: {
  project: (typeof projects)[0];
  index: number;
  prefersReducedMotion: boolean;
}): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const renderTags = (tags: string[]) =>
    tags.map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm whitespace-nowrap"
      >
        {tag}
      </span>
    ));

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm flex flex-col"
      onMouseEnter={() => isDesktop && setIsHovered(true)}
      onMouseLeave={() => isDesktop && setIsHovered(false)}
    >
      {/* Image + hover overlay */}
      <div className="relative aspect-[4/3]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />
        {isDesktop && (
          <div
            className={`absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {renderTags(project.tags)}
            </div>
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                aria-label={`View ${project.title} on GitHub`}
              >
                <Github size={20} />
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
                aria-label={`View ${project.title} demo`}
              >
                <ExternalLink size={20} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>

      {/* Mobile footer */}
      {!isDesktop && (
        <div className="px-6 pb-6 space-y-4">
          <div className="py-1">
            <Marquee speed={15} prefersReducedMotion={prefersReducedMotion}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </Marquee>
          </div>
          <div className="flex gap-3 mt-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 px-4 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 h-12 px-4 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <ExternalLink size={20} />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      )}
    </motion.div>
  );
}
