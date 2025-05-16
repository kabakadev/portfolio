"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formState.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormState({ name: "", email: "", message: "" });
      } else {
        console.error("Error response:", await res.json());
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 px-4 md:px-8 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Contact
        </h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Contact Information
            </h3>
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary mt-1">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Email
                  </h4>
                  <a
                    href="mailto:iankabaka9114@gmail.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    iankabaka9114@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary mt-1">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Location
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Nakuru, Kenya
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              I’m always open to discussing new projects, creative ideas, or
              opportunities to collaborate.
            </p>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            {submitStatus === "success" ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 text-center">
                <CheckCircle
                  size={48}
                  className="text-green-600 dark:text-green-400 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Message Sent!
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Thank you for reaching out. I’ll get back to you as soon as
                  possible.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : submitStatus === "error" ? (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 text-center">
                <AlertCircle
                  size={48}
                  className="text-red-600 dark:text-red-400 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  Something Went Wrong
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  There was an error sending your message. Please try again.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder=" "
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border ${
                      errors.name
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors peer`}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-3 top-2 z-10 bg-white dark:bg-gray-800 px-2 text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
                  >
                    Your Name
                  </label>
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder=" "
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border ${
                      errors.email
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors peer`}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-3 top-2 z-10 bg-white dark:bg-gray-800 px-2 text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
                  >
                    Your Email
                  </label>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder=" "
                    className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-800 border ${
                      errors.message
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    } focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-colors peer`}
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-3 top-2 z-10 bg-white dark:bg-gray-800 px-2 text-gray-600 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:scale-100"
                  >
                    Your Message
                  </label>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
