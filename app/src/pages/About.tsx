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
  { name: "Machine Learning & Data Science", level: 90, color: "var(--pastel-yellow)" },
  { name: "PyTorch / CNNs / NLP", level: 88, color: "var(--pastel-pink)" },
  { name: "React / Next.js", level: 90, color: "var(--pastel-blue)" },
  { name: "FastAPI / Backend APIs", level: 85, color: "var(--pastel-yellow)" },
  { name: "RAG Systems & LLM Pipelines", level: 85, color: "var(--pastel-pink)" },
  { name: "OpenCV & 3D Data Processing", level: 80, color: "var(--pastel-blue)" },
];

// Areas of expertise data
const expertise: Expertise[] = [
  {
    icon: Brain,
    title: "Machine Learning & AI",
    description:
      "CNNs, NLP, Gradient Boosting, K-means, RAG pipelines, LLM fine-tuning, and rigorous model evaluation with emphasis on performance and generalization.",
    color: "var(--pastel-blue)",
  },
  {
    icon: Code2,
    title: "Software & Full Stack Engineering",
    description:
      "Designing and building scalable applications with React, Next.js, FastAPI, TailwindCSS, Zustand, and Dexie.js, focusing on clean architecture and user experience.",
    color: "var(--pastel-yellow)",
  },
  {
    icon: Database,
    title: "Data & ML Pipelines",
    description:
      "End-to-end data preprocessing, feature engineering, ETL workflows, computer vision pipelines, and integration of ML models into production systems.",
    color: "var(--pastel-pink)",
  },
  {
    icon: Cloud,
    title: "AI-Powered Systems & Tools",
    description:
      "Production-ready AI systems including RAG architectures, LangGraph workflows, embedding and PDF ingestion pipelines, and deployed ML demos.",
    color: "var(--pastel-blue)",
  },
];

export const About: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div
        className="absolute top-40 right-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-pink)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-blue)" }}
      /> */}

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
          <h1 className="text-5xl md:text-6xl mb-6">Building Intelligent Systems</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {/* A passionate engineer dedicated to building innovative solutions that bridge the gap between technology and user experience. */}
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
            {/* <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl"
              style={{ background: "var(--pastel-blue)" }}
            /> */}
            <div className="relative z-10">
              <h2 className="text-3xl mb-6">My Journey</h2>
              <div className="space-y-4 text-lg text-white/70 leading-relaxed">
                <p>
                  I’m a Computer Science and Applied Mathematics & Statistics student at Stony
                  Brook University (GPA 3.96), with a strong interest in building practical,
                  well-designed software and machine learning systems.
                </p>
                <p>
                  I’ve worked across academic research and industry internships, from computer
                  vision and 3D data pipelines to training CNN-based models and building
                  production-ready RAG systems for real-world use.
                </p>
                <p>
                  I’m currently a Fellow in the Break Through Tech AI program at Cornell Tech,
                  where I collaborate with engineers and mentors to design, evaluate, and
                  deploy end-to-end ML systems.
                </p>
                <p>
                  Outside of tech, I enjoy building productivity tools, staying involved in
                  tech communities, playing basketball, and rock climbing.
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
                  {/* <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.8 + index * 0.1, duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: skill.color }}
                    />
                  </div> */}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
