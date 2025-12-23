import { motion } from "motion/react";
import { Code, Users, BookOpen, Award, MessageSquare, Rocket } from "lucide-react";
import type { ReactNode, ComponentType } from "react";

/** ------------------ Types ------------------ */
interface Activity {
  icon: ComponentType<any>;
  title: string;
  description: string;
  stats: string;
  color: string;
  items: string[];
}

/** ------------------ Reusable Components ------------------ */

// Background decorative blob
const BackgroundBlob: React.FC<{ className: string; color: string; styleOverrides?: React.CSSProperties }> = ({
  className,
  color,
  styleOverrides,
}) => (
  <div
    className={`${className} rounded-full opacity-10 blur-3xl`}
    style={{ background: color, ...styleOverrides }}
  />
);

// Individual activity card
const ActivityCard: React.FC<{ activity: Activity; index: number }> = ({ activity, index }) => {
  const Icon = activity.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden group"
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top right, ${activity.color}, transparent)` }}
      />

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: `${activity.color}20` }}
          >
            <Icon className="w-7 h-7" style={{ color: activity.color }} />
          </div>
          <div
            className="px-4 py-2 rounded-full text-sm"
            style={{ background: `${activity.color}20`, color: activity.color }}
          >
            {activity.stats}
          </div>
        </div>

        <h3 className="text-2xl mb-3">{activity.title}</h3>
        <p className="text-white/60 mb-6">{activity.description}</p>

        <ul className="space-y-3">
          {activity.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-white/70">
              <div
                className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                style={{ background: activity.color }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Decorative blob inside card */}
      <div
        className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-2xl"
        style={{ background: activity.color }}
      />
    </motion.div>
  );
};

// Call-to-action section
const CallToAction: React.FC<{ title: string; description: string; buttonText: string; buttonColor: string }> = ({
  title,
  description,
  buttonText,
  buttonColor,
}) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-16 text-center">
    <div className="bg-gradient-to-br from-card/60 to-card/30 backdrop-blur-sm border border-white/10 rounded-3xl p-12 relative overflow-hidden">
      <BackgroundBlob className="absolute top-0 right-0 w-64 h-64" color="var(--pastel-pink)" />
      <div className="relative z-10">
        <h2 className="text-3xl mb-4">{title}</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">{description}</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-4 rounded-full text-black"
          style={{ background: buttonColor }}
        >
          {buttonText}
        </motion.button>
      </div>
    </div>
  </motion.div>
);

/** ------------------ Activities Data ------------------ */
const activities: Activity[] = [
  {
    icon: Code,
    title: "Open Source Contributions",
    description: "Active contributor to TensorFlow, PyTorch, and React ecosystems",
    stats: "150+ Pull Requests",
    color: "var(--pastel-blue)",
    items: [
      "Core contributor to TensorFlow Model Optimization",
      "Maintained 3 popular NPM packages with 50k+ downloads",
      "Regular contributor to PyTorch documentation",
    ],
  },
  {
    icon: Users,
    title: "Community Leadership",
    description: "Organizing and leading tech communities and meetups",
    stats: "500+ Members",
    color: "var(--pastel-yellow)",
    items: [
      "Founded local AI/ML study group",
      "Organized 12+ tech meetups and workshops",
      "Mentor at Code for Good hackathon",
    ],
  },
  {
    icon: MessageSquare,
    title: "Speaking Engagements",
    description: "Sharing knowledge through talks and presentations",
    stats: "20+ Talks",
    color: "var(--pastel-pink)",
    items: [
      "Keynote speaker at AI Summit 2024",
      "Regular speaker at PyData conferences",
      "Guest lecturer at Stanford University",
    ],
  },
  {
    icon: BookOpen,
    title: "Technical Writing",
    description: "Publishing articles and tutorials on ML and software engineering",
    stats: "50+ Articles",
    color: "var(--pastel-blue)",
    items: [
      "Published on Towards Data Science and Medium",
      "Technical blog with 10k+ monthly readers",
      "Co-authored ML best practices guide",
    ],
  },
  {
    icon: Award,
    title: "Hackathons & Competitions",
    description: "Participating and winning various coding competitions",
    stats: "15 Awards",
    color: "var(--pastel-yellow)",
    items: [
      "1st place at Global AI Hackathon 2023",
      "Winner of Google Cloud Challenge",
      "Top 5% on Kaggle competitions",
    ],
  },
  {
    icon: Rocket,
    title: "Side Projects",
    description: "Building tools and applications for fun and learning",
    stats: "30+ Projects",
    color: "var(--pastel-pink)",
    items: [
      "Launched 3 SaaS products with 1k+ users",
      "Created educational ML tutorials on YouTube",
      "Built developer tools used by 5k+ developers",
    ],
  },
];

/** ------------------ Activities Section ------------------ */
export const Activities: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Background decorative blobs */}
      <BackgroundBlob className="absolute top-20 right-10 w-96 h-96" color="var(--pastel-yellow)" />
      <BackgroundBlob className="absolute bottom-40 left-10 w-80 h-80" color="var(--pastel-blue)" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Rocket className="w-6 h-6" style={{ color: "var(--pastel-pink)" }} />
            <span style={{ color: "var(--pastel-pink)" }}>Beyond Work</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">Activities & Involvement</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            Contributing to the tech community through various initiatives and projects
          </p>
        </motion.div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {activities.map((activity, index) => (
            <ActivityCard key={activity.title} activity={activity} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <CallToAction
          title="Let's Collaborate!"
          description="I'm always interested in connecting with fellow developers, speaking at events, or collaborating on open source projects. Feel free to reach out!"
          buttonText="Get in Touch"
          buttonColor="var(--pastel-yellow)"
        />
      </div>
    </div>
  );
};
