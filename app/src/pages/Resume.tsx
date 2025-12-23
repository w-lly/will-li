import { motion } from "motion/react";
import { Briefcase, GraduationCap, Award, Download } from "lucide-react";
import type { FC } from "react";

// ----------------------------
// Data Types
// ----------------------------
interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  color: string;
}

interface Education {
  degree: string;
  school: string;
  period: string;
  focus: string;
  color: string;
}

// ----------------------------
// Data
// ----------------------------
const experience: Experience[] = [
  {
    title: "Senior AI/ML Engineer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description:
      "Leading AI/ML initiatives and developing cutting-edge machine learning solutions for enterprise clients.",
    achievements: [
      "Architected and deployed 5+ production ML models serving 1M+ users",
      "Reduced model inference time by 60% through optimization techniques",
      "Led a team of 4 engineers in building a recommendation engine",
    ],
    color: "var(--pastel-blue)",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Co.",
    period: "2020 - 2022",
    description: "Built scalable web applications and implemented modern frontend architectures.",
    achievements: [
      "Developed 10+ full-stack applications using React and Node.js",
      "Improved application performance by 45% through code optimization",
      "Mentored 3 junior developers and conducted code reviews",
    ],
    color: "var(--pastel-yellow)",
  },
  {
    title: "Software Engineer",
    company: "Startup Ventures",
    period: "2019 - 2020",
    description: "Contributed to multiple projects across the full development lifecycle.",
    achievements: [
      "Implemented RESTful APIs serving 50k+ daily requests",
      "Built CI/CD pipelines reducing deployment time by 70%",
      "Collaborated with cross-functional teams on product features",
    ],
    color: "var(--pastel-pink)",
  },
];

const education: Education[] = [
  {
    degree: "M.S. Computer Science",
    school: "Stanford University",
    period: "2017 - 2019",
    focus: "Specialization in Artificial Intelligence and Machine Learning",
    color: "var(--pastel-blue)",
  },
  {
    degree: "B.S. Software Engineering",
    school: "MIT",
    period: "2013 - 2017",
    focus: "Graduated with Honors, GPA: 3.9/4.0",
    color: "var(--pastel-yellow)",
  },
];

const certifications: string[] = [
  "AWS Certified Solutions Architect",
  "Google Cloud Professional ML Engineer",
  "Deep Learning Specialization (Coursera)",
  "Kubernetes Administrator (CKA)",
];

// ----------------------------
// Reusable Components
// ----------------------------
interface TimelineItemProps {
  job: Experience;
  index: number;
}

const TimelineItem: FC<TimelineItemProps> = ({ job, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.3 + index * 0.1 }}
    className="relative pl-0 md:pl-20"
  >
    {/* Timeline node */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
      className="hidden md:block absolute left-5 top-6 w-6 h-6 rounded-full border-4 border-background"
      style={{ background: job.color }}
    />

    {/* Job card */}
    <div className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <div>
          <h3 className="text-2xl mb-1">{job.title}</h3>
          <div className="text-white/60">{job.company}</div>
        </div>
        <div
          className="mt-2 md:mt-0 px-4 py-2 rounded-full text-sm inline-block"
          style={{ background: `${job.color}20`, color: job.color }}
        >
          {job.period}
        </div>
      </div>
      <p className="text-white/70 mb-4">{job.description}</p>
      <ul className="space-y-2">
        {job.achievements.map((achievement, i) => (
          <li key={i} className="flex items-start gap-3 text-white/60">
            <div
              className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
              style={{ background: job.color }}
            />
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

interface EducationCardProps {
  edu: Education;
  index: number;
}

const EducationCard: FC<EducationCardProps> = ({ edu, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.6 + index * 0.1 }}
    whileHover={{ y: -5 }}
    className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
  >
    <div
      className="inline-block px-4 py-1 rounded-full text-sm mb-4"
      style={{ background: `${edu.color}20`, color: edu.color }}
    >
      {edu.period}
    </div>
    <h3 className="text-xl mb-2">{edu.degree}</h3>
    <div className="text-white/60 mb-3">{edu.school}</div>
    <p className="text-white/50 text-sm">{edu.focus}</p>
  </motion.div>
);

interface CertificationCardProps {
  cert: string;
  index: number;
}

const CertificationCard: FC<CertificationCardProps> = ({ cert, index }) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.8 + index * 0.05 }}
    whileHover={{ scale: 1.02, x: 5 }}
    className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex items-center gap-4"
  >
    <div
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ background: "var(--pastel-pink)" }}
    />
    <span className="text-white/80">{cert}</span>
  </motion.div>
);

// ----------------------------
// Main Resume Component
// ----------------------------
export const Resume: FC = () => (
  <div className="min-h-screen px-6 py-12 relative overflow-hidden">
    {/* Background element */}
    <div
      className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-10 blur-3xl"
      style={{ background: "var(--pastel-yellow)" }}
    />

    <div className="max-w-5xl mx-auto relative z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <Briefcase className="w-6 h-6" style={{ color: "var(--pastel-blue)" }} />
          <span style={{ color: "var(--pastel-blue)" }}>Resume</span>
        </div>
        <h1 className="text-5xl md:text-6xl mb-6">Professional Journey</h1>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/20 hover:border-white/40 transition-colors"
        >
          <Download className="w-5 h-5" />
          Download Resume
        </motion.button>
      </motion.div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-20"
      >
        <h2 className="text-3xl mb-10 flex items-center gap-3">
          <Briefcase className="w-8 h-8" style={{ color: "var(--pastel-blue)" }} />
          Work Experience
        </h2>

        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          <div className="space-y-12">
            {experience.map((job, idx) => (
              <TimelineItem key={idx} job={job} index={idx} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-20"
      >
        <h2 className="text-3xl mb-10 flex items-center gap-3">
          <GraduationCap className="w-8 h-8" style={{ color: "var(--pastel-yellow)" }} />
          Education
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, idx) => (
            <EducationCard key={idx} edu={edu} index={idx} />
          ))}
        </div>
      </motion.div>

      {/* Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <h2 className="text-3xl mb-10 flex items-center gap-3">
          <Award className="w-8 h-8" style={{ color: "var(--pastel-pink)" }} />
          Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert, idx) => (
            <CertificationCard key={idx} cert={cert} index={idx} />
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);
