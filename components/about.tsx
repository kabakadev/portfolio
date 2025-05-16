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

        <div className="flex flex-col md:flex-row items-start gap-8">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative md:sticky md:top-24 flex-shrink-0 mx-auto md:mx-0"
          >
            <div className="w-[140px] md:w-[180px] aspect-square rounded-full overflow-hidden ring-4 ring-gray-200 dark:ring-gray-800 bg-white filter brightness-75 contrast-125 saturate-100 dark:bg-gray-900 relative">
              <Image
                src="/images/passport1.png"
                alt="Passport Photo"
                fill
                sizes="(max-width: 768px) 140px, 180px"
                className="object-cover filter dark:brightness-90"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex-1"
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Full-Stack Developer & Software Engineer
            </h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I build robust, responsive web applications using React, Next.js,
              Tailwind CSS, Python with Flask and SQLAlchemy, PostgreSQL, and
              Laravel. From FlashLearn and BookNook to DogBreedFinder, I turn
              ideas into polished, user-friendly products. I'm passionate about
              clean code, continuous learning, and leveraging modern
              technologies to solve real-world problems.
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Nakuru & Kisii, Kenya
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Calendar size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  Open to remote & local opportunities
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Award size={20} />
                </div>
                <span className="text-gray-700 dark:text-gray-300">
                  IT Diploma (Egerton University) & Moringa School Bootcamp
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
                    My journey started at Egerton University and Moringa School,
                    where I honed my skills in software development. Since then,
                    I've collaborated with startups and teams to launch features
                    that drive engagement.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 mt-4">
                    When I'm not coding, you'll find me at the gym pushing my
                    limits, experimenting with new workout routines, or refining
                    my diet to hit my fitness goals. I also contribute to
                    open-source projects to give back to the community.
                  </p>
                </div>
              </details>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  My journey started at Egerton University and Moringa School,
                  where I honed my skills in software development. Since then,
                  I've collaborated with startups and teams to launch features
                  that drive engagement.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  When I'm not coding, you'll find me at the gym pushing my
                  limits, experimenting with new workout routines, or refining
                  my diet to hit my fitness goals. I also contribute to
                  open-source projects to give back to the community.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
