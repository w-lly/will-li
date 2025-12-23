import { motion } from "motion/react";
import { useState } from "react";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";

// -----------------------------
// Types
// -----------------------------
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo: string;
  stars: number;
  forks: number;
  color: string;
  image: string;
}

interface TechStackProps {
  tech: string[];
  color: string;
  maxVisible?: number; // Optional limit for card preview
}

// -----------------------------
// Reusable Tech Stack Component
// -----------------------------
const TechStack: React.FC<TechStackProps> = ({ tech, color, maxVisible }) => {
  const visibleTech = maxVisible ? tech.slice(0, maxVisible) : tech;
  const remaining = maxVisible && tech.length > maxVisible ? tech.length - maxVisible : 0;

  return (
    <div className="flex flex-wrap gap-2">
      {visibleTech.map((t) => (
        <span
          key={t}
          className="px-2 py-1 rounded-lg text-xs bg-white/5 text-white/60"
          style={maxVisible ? {} : { background: `${color}20`, color }}
        >
          {t}
        </span>
      ))}
      {remaining > 0 && (
        <span className="px-2 py-1 rounded-lg text-xs bg-white/5 text-white/60">+{remaining}</span>
      )}
    </div>
  );
};

// -----------------------------
// Project Data
// -----------------------------
const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Chatbot Platform",
    description:
      "Enterprise-grade conversational AI with natural language understanding and multi-turn context awareness.",
    longDescription:
      "Built a sophisticated chatbot platform using GPT-4 and custom fine-tuned models. Implemented context management, intent recognition, and multi-language support. Deployed on AWS with auto-scaling capabilities serving 100k+ users.",
    tech: ["Python", "OpenAI API", "React", "FastAPI", "Redis", "Docker"],
    github: "https://github.com",
    demo: "https://demo.com",
    stars: 234,
    forks: 45,
    color: "var(--pastel-blue)",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
  },
  {
    id: 2,
    title: "Real-Time Object Detection System",
    description:
      "Computer vision pipeline for real-time object detection and tracking with custom YOLO implementation.",
    longDescription:
      "Developed a high-performance object detection system achieving 60 FPS on edge devices. Implemented custom training pipeline, data augmentation, and model optimization techniques. Used in production for security surveillance.",
    tech: ["PyTorch", "OpenCV", "CUDA", "C++", "TensorRT"],
    github: "https://github.com",
    demo: "https://demo.com",
    stars: 189,
    forks: 32,
    color: "var(--pastel-yellow)",
    image: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800",
  },
  {
    id: 3,
    title: "ML Analytics Dashboard",
    description:
      "Full-stack platform for visualizing ML model performance with real-time metrics and predictions.",
    longDescription:
      "Created an interactive dashboard for monitoring ML models in production. Features include A/B testing, drift detection, and automated alerting. Integrated with MLflow for experiment tracking.",
    tech: ["React", "D3.js", "Node.js", "PostgreSQL", "MLflow"],
    github: "https://github.com",
    demo: "https://demo.com",
    stars: 156,
    forks: 28,
    color: "var(--pastel-pink)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    id: 4,
    title: "Sentiment Analysis API",
    description: "RESTful API for multi-language sentiment analysis using transformer models.",
    longDescription:
      "Built a production-ready sentiment analysis API supporting 20+ languages. Implemented custom BERT fine-tuning, batching for efficiency, and comprehensive API documentation. Handles 1M+ requests daily.",
    tech: ["BERT", "Hugging Face", "Flask", "MongoDB", "Docker"],
    github: "https://github.com",
    demo: "https://demo.com",
    stars: 312,
    forks: 67,
    color: "var(--pastel-blue)",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
  },
  {
    id: 5,
    title: "Recommendation Engine",
    description: "Collaborative filtering system with deep learning for personalized recommendations.",
    longDescription:
      "Designed and implemented a hybrid recommendation system combining collaborative filtering and content-based approaches. Achieved 35% improvement in click-through rates. Deployed on GCP with auto-scaling.",
    tech: ["TensorFlow", "Python", "Redis", "GCP", "Airflow"],
    github: "https://github.com",
    demo: "https://demo.com",
    stars: 278,
    forks: 53,
    color: "var(--pastel-yellow)",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
  },
  {
    id: 6,
    title: "MLOps Pipeline Automation",
    description:
      "End-to-end automated ML pipeline with training, testing, and deployment workflows.",
    longDescription:
      "Built a comprehensive MLOps platform for automating the entire ML lifecycle. Features include automated data validation, model training, testing, and deployment with rollback capabilities. Reduced deployment time by 80%.",
    tech: ["Kubernetes", "MLflow", "Airflow", "GCP", "Terraform"],
    github: "https://github.com",
    demo: "https://demo.com",
    stars: 421,
    forks: 89,
    color: "var(--pastel-pink)",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800",
  },
];

// -----------------------------
// Projects Component
// -----------------------------
export function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  // Find the currently selected project for modal display
  const selectedProject = projects.find((p) => p.id === selectedProjectId) || null;

  return (
    <div className="min-h-screen px-6 py-12 relative overflow-hidden">
      {/* Background blobs */}
      <div
        className="absolute top-40 left-10 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-blue)" }}
      />
      <div
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full opacity-10 blur-3xl"
        style={{ background: "var(--pastel-pink)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Star className="w-6 h-6" style={{ color: "var(--pastel-yellow)" }} />
            <span style={{ color: "var(--pastel-yellow)" }}>Featured Work</span>
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">Projects</h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            A showcase of my work in AI/ML, full-stack development, and cloud architecture
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedProjectId(project.id)}
              className="bg-card/40 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer group"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{ background: `linear-gradient(135deg, ${project.color}40, transparent)` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div
                  className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs backdrop-blur-sm"
                  style={{ background: `${project.color}30`, color: project.color }}
                >
                  Featured
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl mb-3 group-hover:text-white/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">{project.description}</p>

                {/* Tech Stack (limited preview for card) */}
                <TechStack tech={project.tech} color={project.color} maxVisible={3} />

                {/* Stats & Links */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {project.stars}
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="w-4 h-4" />
                      {project.forks}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProjectId(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-white/20 rounded-3xl max-w-3xl w-full max-h-[80vh] overflow-y-auto p-8"
          >
            <h2 className="text-3xl mb-4">{selectedProject.title}</h2>
            <p className="text-white/70 mb-6">{selectedProject.longDescription}</p>

            {/* Full Tech Stack */}
            <div className="mb-6">
              <h3 className="text-lg mb-3">Tech Stack</h3>
              <TechStack tech={selectedProject.tech} color={selectedProject.color} />
            </div>

            {/* Modal Links */}
            <div className="flex gap-4">
              <a
                href={selectedProject.github}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="w-5 h-5" />
                View Code
              </a>
              <a
                href={selectedProject.demo}
                className="flex items-center gap-2 px-6 py-3 rounded-full hover:bg-white/10 transition-colors"
                style={{ background: `${selectedProject.color}30` }}
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
