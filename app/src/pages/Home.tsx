import { motion } from "motion/react";
import type { MotionProps } from "motion/react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import type { FC, HTMLAttributes } from "react";

// Common motion transition for sequential animations
const fadeUpTransition: MotionProps["transition"] = { duration: 0.8 };

// Contact icon configuration
const contactLinks: { href: string; Icon: FC<HTMLAttributes<SVGElement>>; bg: string; color: string }[] = [
  {
    href: "https://github.com",
    Icon: Github,
    bg: "rgba(168, 216, 234, 0.15)",
    color: "var(--pastel-blue)",
  },
  {
    href: "https://linkedin.com",
    Icon: Linkedin,
    bg: "rgba(255, 233, 167, 0.15)",
    color: "var(--pastel-yellow)",
  },
  {
    href: "https://twitter.com",
    Icon: Twitter,
    bg: "rgba(255, 179, 217, 0.15)",
    color: "var(--pastel-pink)",
  },
  {
    href: "mailto:your.email@example.com",
    Icon: Mail,
    bg: "rgba(168, 216, 234, 0.15)",
    color: "var(--pastel-blue)",
  },
];

export const Home: FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--pastel-blue)" }}
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
        style={{ background: "var(--pastel-yellow)" }}
        animate={{ scale: [1, 1.3, 1], x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-72 h-72 rounded-full opacity-15 blur-3xl"
        style={{ background: "var(--pastel-pink)" }}
        animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-6xl w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile image with decorative shapes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 md:order-1"
          >
            {/* Decorative gradient layers */}
            <div
              className="absolute -inset-4 rounded-[3rem] opacity-30 blur-xl"
              style={{
                background: "linear-gradient(135deg, var(--pastel-blue), var(--pastel-pink))",
              }}
            />
            <div
              className="absolute -inset-8 rounded-[4rem] opacity-20"
              style={{ background: "var(--pastel-yellow)", transform: "rotate(-6deg)" }}
            />
            <div className="relative rounded-[3rem] overflow-hidden border-4 border-white/10 shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2Mzg4NTE1NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Profile"
                className="w-full h-auto"
              />
            </div>
          </motion.div>

          {/* Intro content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={fadeUpTransition}
            className="order-1 md:order-2 text-center md:text-left"
          >
            {/* Role Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-block mb-6 px-6 py-2 rounded-full border-2"
              style={{ borderColor: "var(--pastel-blue)", background: "rgba(168, 216, 234, 0.1)" }}
            >
              <span style={{ color: "var(--pastel-blue)" }}>Software Engineer • AI/ML</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-7xl mb-6 bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent"
            >
              Your Name
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl mb-10 text-white/70 max-w-lg mx-auto md:mx-0"
            >
              Building intelligent systems and innovative solutions at the intersection of software engineering and machine learning.
            </motion.p>

            {/* Contact Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 justify-center md:justify-start"
            >
              {contactLinks.map(({ href, Icon, bg, color }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl backdrop-blur-sm border border-white/10 transition-all"
                  style={{ background: bg }}
                >
                  <Icon className="w-6 h-6" style={{ color }} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
