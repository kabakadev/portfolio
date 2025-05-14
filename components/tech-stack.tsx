"use client";

import type React from "react";

import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Code, Server, Wrench } from "lucide-react";

const technologies = {
  frontend: [
    { name: "React", level: "Advanced" },
    { name: "Next.js", level: "Advanced" },
    { name: "TypeScript", level: "Advanced" },
    { name: "Tailwind CSS", level: "Advanced" },
    { name: "Framer Motion", level: "Intermediate" },
  ],
  backend: [
    { name: "Node.js", level: "Advanced" },
    { name: "Express", level: "Advanced" },
    { name: "MongoDB", level: "Intermediate" },
    { name: "PostgreSQL", level: "Intermediate" },
    { name: "GraphQL", level: "Intermediate" },
  ],
  tools: [
    { name: "Git", level: "Advanced" },
    { name: "Docker", level: "Intermediate" },
    { name: "AWS", level: "Intermediate" },
    { name: "CI/CD", level: "Intermediate" },
    { name: "Jest", level: "Intermediate" },
  ],
};

export default function TechStack() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

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
            container={container}
            item={item}
          />

          <TechCategory
            title="Backend"
            icon={<Server size={24} />}
            technologies={technologies.backend}
            prefersReducedMotion={prefersReducedMotion}
            container={container}
            item={item}
          />

          <TechCategory
            title="Tools"
            icon={<Wrench size={24} />}
            technologies={technologies.tools}
            prefersReducedMotion={prefersReducedMotion}
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
  container,
  item,
}: {
  title: string;
  icon: React.ReactNode;
  technologies: { name: string; level: string }[];
  prefersReducedMotion: boolean;
  container: any;
  item: any;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-primary/10 text-primary">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>

      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <motion.div
          className="flex flex-row md:flex-col gap-3 min-w-max md:min-w-0"
          variants={prefersReducedMotion ? {} : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={prefersReducedMotion ? {} : item}
              className="bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-3 flex justify-between items-center"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {tech.name}
              </span>
              <span className="text-sm px-3 py-1 rounded-lg bg-primary/10 text-primary">
                {tech.level}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
