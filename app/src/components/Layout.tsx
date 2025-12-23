import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Home, User, FileText, FolderOpen, Activity, BarChart3, Mail } from "lucide-react";
import type { RefObject, ReactNode } from "react";

type SectionKey =
  | "home"
  | "about"
  // | "resume"
  | "projects"
  // | "activities"
  // | "statistics"
  | "contact";

const navItems: { id: SectionKey; label: string; icon: React.ComponentType<any> }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  // { id: "resume", label: "Resume", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderOpen },
  // { id: "activities", label: "Activities", icon: Activity },
  // { id: "statistics", label: "Statistics", icon: BarChart3 },
  { id: "contact", label: "Contact", icon: Mail },
];

interface LayoutProps {
  children: ReactNode;
  scrollToSection: (ref: RefObject<HTMLDivElement>) => void;
  sectionRefs: Record<SectionKey, RefObject<HTMLDivElement>>;
}

export const Layout: React.FC<LayoutProps> = ({ children, scrollToSection, sectionRefs }) => {
  const [activeSection, setActiveSection] = useState<SectionKey>("home");

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const item of navItems) {
        const ref = sectionRefs[item.id];
        if (ref?.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionRefs]);

  const handleClick = (id: SectionKey) => {
    window.location.hash = id;
    scrollToSection(sectionRefs[id]);
  };

  return (
    <div className="min-h-screen relative">
      {/* Floating Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      >
        <nav className="bg-card/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-2xl">
          <ul className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <motion.div
                    onClick={() => handleClick(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative px-4 py-2 rounded-full flex items-center gap-2 transition-colors cursor-pointer ${
                      isActive ? "text-black" : "text-white hover:text-white/70"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--pastel-blue), var(--pastel-yellow))",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                    <span className="text-sm relative z-10 hidden md:inline">{item.label}</span>
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </nav>
      </motion.header>

      {/* Page Content */}
      <main className="pt-24">{children}</main>
    </div>
  );
};
