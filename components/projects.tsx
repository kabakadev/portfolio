"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  // Top Strong Projects
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
  {
    id: 2,
    title: "Book Nook",
    description:
      "A React & Vite reading list manager. Create, view, and organize your favorite books with ease.",
    image: "/images/project_images/booknook.png",
    tags: ["React", "Vite", "Tailwind CSS"],
    github: "https://github.com/kabakadev/book_app_frontend",
    demo: "https://booknook254.netlify.app/",
  },
  {
    id: 3,
    title: "FlashLearn",
    description:
      "An AI-powered flashcard app with user authentication, deck & card management, and performance stats.",
    image: "/images/project_images/flashlearn.png",
    tags: ["React", "Vite", "Tailwind CSS", "JWT Auth"],
    github: "https://github.com/kabakadev/flashlearn-frontend",
    demo: "https://flashlearn254.netlify.app/",
  },
  // Secondary Projects
  {
    id: 4,
    title: "Dog Breed Finder",
    description:
      "Search and learn about dog breeds in this responsive React app.",
    image: "/images/project_images/dogfinder.png",
    tags: ["React", "Tailwind CSS", "Dog API"],
    github: "https://github.com/kabakadev/dogfinder",
    demo: "https://dogsfinder.netlify.app/",
  },
  {
    id: 5,
    title: "Sneakers Showcase",
    description:
      "A React-based sneakers showcase highlighting popular sneaker models in a clean UI.",
    image: "/images/project_images/sneaker.png",
    tags: ["React", "Tailwind CSS"],
    github: "https://github.com/kabakadev/sneakers-project-app",
    demo: "https://kabakadev.github.io/sneakers-project-app/",
  },
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

function ProjectCard({
  project,
  index,
  prefersReducedMotion,
}: {
  project: (typeof projects)[0];
  index: number;
  prefersReducedMotion: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
        />

        <div
          className={`absolute inset-0 bg-black/70 flex flex-col justify-center items-center p-6 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0 sm:opacity-0"
          }`}
        >
          <div className="flex flex-wrap gap-2 justify-center mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-gray-800 text-white hover:bg-gray-700 transition-colors"
              aria-label={`View ${project.title} on GitHub`}
            >
              <Github size={20} />
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors"
              aria-label={`View ${project.title} demo`}
            >
              <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}
