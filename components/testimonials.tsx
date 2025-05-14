"use client";

import { useRef, useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Product Manager at TechCorp",
    content:
      "Working with this developer was a game-changer for our project. Their technical expertise and attention to detail resulted in a product that exceeded our expectations.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO at StartupX",
    content:
      "An exceptional developer who delivers high-quality code on time. Their ability to understand complex requirements and translate them into elegant solutions is impressive.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Founder at DesignHub",
    content:
      "I was blown away by the level of creativity and technical skill. They not only built exactly what we needed but also suggested improvements that made our product even better.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Lead Developer at WebSolutions",
    content:
      "A true professional who writes clean, maintainable code. Their deep understanding of both frontend and backend technologies made them an invaluable asset to our team.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference and screen size
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);

    const handleMotionChange = () =>
      setPrefersReducedMotion(motionQuery.matches);
    const handleMobileChange = () => setIsMobile(mobileQuery.matches);

    motionQuery.addEventListener("change", handleMotionChange);
    mobileQuery.addEventListener("change", handleMobileChange);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
    };
  }, []);

  // Handle pagination dot click
  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const scrollAmount = index * scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: scrollAmount,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  // Handle scroll event to update active index
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollPosition / cardWidth);
      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    }
  };

  return (
    <section id="testimonials" className="py-16 px-4 md:px-8">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Testimonials
        </h2>

        <div className="max-w-4xl mx-auto">
          {/* Scroll-snap carousel container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-hide snap-x snap-mandatory flex w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onScroll={handleScroll}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-full w-full flex-shrink-0 px-4 snap-center"
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-4 h-4 rounded-full transition-colors ${
                  activeIndex === index
                    ? "bg-primary"
                    : "bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={activeIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0];
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm h-full animate-fadeIn">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={testimonial.avatar || "/placeholder.svg"}
            alt={testimonial.name}
            className="object-cover w-full h-full"
            style={{ aspectRatio: "1/1" }}
          />
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {testimonial.role}
          </p>
        </div>

        <div className="ml-auto text-primary">
          <Quote size={24} />
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300">{testimonial.content}</p>
    </div>
  );
}
