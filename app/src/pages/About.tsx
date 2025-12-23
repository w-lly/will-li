import React from "react";
import { motion } from "motion/react";
import { Code2, Brain, Database, Cloud, Sparkles, Zap } from "lucide-react";

// Define type for a skill
interface Skill {
  name: string;
  level: number;
  color: string;
}

// Define type for expertise area
interface Expertise {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
}

// Technical skills data
const skills: Skill[] = [
  { name: "Python", level: 95, color: "var(--pastel-blue)" },
  { name: "JavaScript/TypeScript", level: 90, color: "var(--pastel-yellow)" },
  { name: "TensorFlow/PyTorch", level: 88, color: "var(--pastel-pink)" },
  { name: "React/Node.js", level: 92, color: "var(--pastel-blue)" },
  { name: "AWS/GCP", level: 85, color: "var(--pastel-yellow)" },
  { name: "Docker/Kubernetes", level: 80, color: "var(--pastel-pink)" },
];

// Areas of expertise data
const expertise: Expertise[] = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Deep learning, NLP, computer vision, and recommendation systems",
    color: "var(--pastel-blue)",
  },
  {
    icon: Code2,
    title: "Full Stack Development",
    description: "React, Node.js, Python, and modern web technologies",
    color: "var(--pastel-yellow)",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "ETL pipelines, data warehousing, and big data processing",
    color: "var(--pastel-pink)",
  },
  {
    icon: Cloud,
    title: "Cloud Architecture",
    description: "Scalable solutions on AWS, GCP, and Azure",
    color: "var(--pastel-blue)",
  },
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      <div
        className="absolute top-40 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-pink)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-blue)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6" style={{ color: "var(--pastel-yellow)" }} />
            <span style={{ color: "var(--pastel-yellow)" }}>About Me</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">Crafting Digital Experiences</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            A passionate engineer dedicated to building innovative solutions that bridge the gap between technology and user experience.
          </p>
        </motion.div>

        {/* Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--pastel-blue)" }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl mb-6">My Journey</h2>
              <div className="space-y-4 text-lg text-white/70 leading-relaxed">
                <p>
                  With over 5 years of experience in software engineering and AI/ML, I've had the privilege of working on cutting-edge projects that push the boundaries of what's possible with technology.
                </p>
                <p>
                  My passion lies in creating intelligent systems that not only solve complex problems but also provide seamless user experiences. From building scalable web applications to training sophisticated machine learning models, I thrive on challenges that require both technical expertise and creative thinking.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring the latest research papers, contributing to open-source projects, or mentoring aspiring developers in the tech community.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Expertise Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl mb-10 text-center">Areas of Expertise</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden group"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: item.color }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${item.color}20` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: item.color }} />
                  </div>
                  <h3 className="text-xl mb-3">{item.title}</h3>
                  <p className="text-white/60">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-3xl mb-10 text-center">Technical Skills</h2>
          <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-12">
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg">{skill.name}</span>
                    <span className="text-sm text-white/50">{skill.level}%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: skill.color }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
