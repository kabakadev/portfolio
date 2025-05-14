"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with cart, checkout, and payment processing.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "MongoDB"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "Socket.io", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather dashboard with location search and 7-day forecast.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "OpenWeather API", "Chart.js", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 4,
    title: "Blog Platform",
    description:
      "A content management system for creating and publishing blog posts.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["Next.js", "MDX", "Prisma", "PostgreSQL"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 5,
    title: "Fitness Tracker",
    description:
      "An application to track workouts, nutrition, and fitness progress.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React Native", "Firebase", "Redux", "Chart.js"],
    github: "https://github.com",
    demo: "https://example.com",
  },
  {
    id: 6,
    title: "Real Estate Listings",
    description: "A platform for browsing and filtering real estate listings.",
    image: "/placeholder.svg?height=600&width=800",
    tags: ["React", "Node.js", "MongoDB", "Google Maps API"],
    github: "https://github.com",
    demo: "https://example.com",
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
          src={project.image || "/placeholder.svg"}
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
