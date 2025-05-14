"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Calendar, MapPin, Award } from "lucide-react";

export default function About() {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section
      id="about"
      className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          About Me
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full md:w-1/3 flex-shrink-0"
          >
            <div className="mx-auto w-[200px] md:w-[300px] aspect-square rounded-full overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Profile"
                fill
                sizes="(max-width: 768px) 200px, 300px"
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full md:w-2/3"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Full-Stack Developer with 5+ Years Experience
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a passionate full-stack developer specializing in building
              exceptional digital experiences. With a focus on creating
              responsive, accessible, and performant web applications, I bring
              ideas to life through clean code and modern technologies.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  San Francisco, CA (Remote)
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Calendar size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Available for freelance work
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  BS in Computer Science
                </span>
              </div>
            </div>

            {isMobile ? (
              <details className="group">
                <summary className="list-none flex justify-between items-center cursor-pointer">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Read more
                  </span>
                  <span className="transition group-open:rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="pt-4">
                  <p className="text-gray-700 dark:text-gray-300">
                    My journey in web development began with a curiosity about
                    how websites work. That curiosity evolved into a passion for
                    creating intuitive user interfaces and robust backend
                    systems. I've worked with startups and established companies
                    alike, helping them build products that users love.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    When I'm not coding, you can find me hiking, reading about
                    new technologies, or contributing to open-source projects. I
                    believe in continuous learning and staying updated with the
                    latest industry trends.
                  </p>
                </div>
              </details>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  My journey in web development began with a curiosity about how
                  websites work. That curiosity evolved into a passion for
                  creating intuitive user interfaces and robust backend systems.
                  I've worked with startups and established companies alike,
                  helping them build products that users love.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  When I'm not coding, you can find me hiking, reading about new
                  technologies, or contributing to open-source projects. I
                  believe in continuous learning and staying updated with the
                  latest industry trends.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
