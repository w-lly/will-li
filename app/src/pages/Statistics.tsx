import { motion } from "motion/react";
import {
  TrendingUp,
  Code,
  GitBranch,
  Users,
  Award,
  Coffee,
} from "lucide-react";
import type { ReactNode } from "react";

// ---------- Types ----------
interface Stat {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  description: string;
  color: string;
  percentage: number;
}

interface Skill {
  name: string;
  value: number;
}

interface Quarter {
  label: string;
  projects: number;
  color: string;
}

// ---------- Data ----------
const stats: Stat[] = [
  {
    icon: Code,
    label: "Lines of Code",
    value: "500K+",
    description: "Written across multiple projects",
    color: "var(--pastel-blue)",
    percentage: 95,
  },
  {
    icon: GitBranch,
    label: "GitHub Contributions",
    value: "2.5K+",
    description: "Commits in the past year",
    color: "var(--pastel-yellow)",
    percentage: 88,
  },
  {
    icon: Users,
    label: "Users Impacted",
    value: "1M+",
    description: "Across all deployed applications",
    color: "var(--pastel-pink)",
    percentage: 100,
  },
  {
    icon: Award,
    label: "Projects Completed",
    value: "50+",
    description: "From concept to production",
    color: "var(--pastel-blue)",
    percentage: 75,
  },
  {
    icon: TrendingUp,
    label: "Performance Gains",
    value: "60%",
    description: "Average optimization improvement",
    color: "var(--pastel-yellow)",
    percentage: 60,
  },
  {
    icon: Coffee,
    label: "Cups of Coffee",
    value: "∞",
    description: "Fuel for productivity",
    color: "var(--pastel-pink)",
    percentage: 100,
  },
];

const skills: Skill[] = [
  { name: "Machine Learning", value: 95 },
  { name: "Full Stack Development", value: 92 },
  { name: "Cloud Architecture", value: 88 },
  { name: "DevOps", value: 85 },
  { name: "Data Engineering", value: 90 },
  { name: "System Design", value: 87 },
];

const quarters: Quarter[] = [
  { label: "Q1", projects: 12, color: "var(--pastel-blue)" },
  { label: "Q2", projects: 15, color: "var(--pastel-yellow)" },
  { label: "Q3", projects: 18, color: "var(--pastel-pink)" },
  { label: "Q4", projects: 20, color: "var(--pastel-blue)" },
];

// ---------- Reusable Components ----------
interface StatsCardProps {
  stat: Stat;
  index: number;
}

const StatsCard: React.FC<StatsCardProps> = ({ stat, index }) => {
  const Icon = stat.icon;
  return (
    <motion.div
      key={stat.label}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300"
        style={{ background: stat.color }}
      />

      <div className="relative z-10">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
          style={{ background: `${stat.color}20` }}
        >
          <Icon className="w-6 h-6" style={{ color: stat.color }} />
        </div>

        <div className="text-4xl mb-2" style={{ color: stat.color }}>
          {stat.value}
        </div>

        <h3 className="text-lg mb-2">{stat.label}</h3>
        <p className="text-sm text-white/50">{stat.description}</p>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stat.percentage}%` }}
            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
            className="h-full rounded-full"
            style={{ background: stat.color }}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface SkillBarProps {
  skill: Skill;
  index: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, index }) => {
  const colors = [
    "var(--pastel-blue)",
    "var(--pastel-yellow)",
    "var(--pastel-pink)",
  ];
  const color = colors[index % colors.length];

  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.9 + index * 0.1 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-lg">{skill.name}</span>
        <span className="text-sm text-white/50">{skill.value}%</span>
      </div>
      <div className="relative h-4 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.value}%` }}
          transition={{ delay: 1 + index * 0.1, duration: 1, ease: "easeOut" }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{ background: color }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: `linear-gradient(90deg, transparent, ${color})` }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

interface QuarterCardProps {
  quarter: Quarter;
  index: number;
}

const QuarterCard: React.FC<QuarterCardProps> = ({ quarter, index }) => (
  <motion.div
    key={quarter.label}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.3 + index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center"
  >
    <div className="text-sm text-white/50 mb-2">{quarter.label} 2024</div>
    <div className="text-3xl mb-2" style={{ color: quarter.color }}>
      {quarter.projects}
    </div>
    <div className="text-sm text-white/60">Projects</div>

    <div className="mt-4 h-20 flex items-end justify-center">
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${(quarter.projects / 20) * 100}%` }}
        transition={{ delay: 1.5 + index * 0.1, duration: 0.8 }}
        className="w-8 rounded-t-lg"
        style={{ background: quarter.color }}
      />
    </div>
  </motion.div>
);

// ---------- Main Component ----------
export const Statistics: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Background Circles */}
      <div
        className="absolute top-40 left-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-pink)" }}
      />
      <div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-blue)" }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6" style={{ color: "var(--pastel-blue)" }} />
            <span style={{ color: "var(--pastel-blue)" }}>By The Numbers</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">Statistics & Metrics</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            A quantitative look at my journey and impact in the tech industry
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <StatsCard key={stat.label} stat={stat} index={index} />
          ))}
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl mb-10 text-center">Skill Proficiency</h2>
          <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-10">
            <div className="space-y-8">
              {skills.map((skill, index) => (
                <SkillBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Year in Review */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-3xl mb-10 text-center">Year in Review</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {quarters.map((quarter, index) => (
              <QuarterCard key={quarter.label} quarter={quarter} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
