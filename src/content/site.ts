/**
 * ALL WRITABLE CONTENT LIVES IN THIS FILE.
 *
 * Change wording, add a job, reorder the nav — nothing here requires touching
 * a component. Each section of the page reads from one export below.
 *
 * Your photo is src/assets/images/profile-photo.jpeg — replace that file to change the picture.
 */

export const site = {
  name: "Will Li",
  logo: "WL",
  tagline: "Software · Ideas · Things I build",
  email: "will.li.1@stonybrook.edu",
  year: "2026",

  /** Hero links. Leave an `href` empty to hide that link. */
  links: {
    github: "https://github.com/w-lly",
    linkedin: "https://www.linkedin.com/in/will-li-e271828/",
    resume: "",
  },
} as const;

/** Top navigation. `id` must match the section's id further down this file. */
export const nav = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

/** 02 — About */
export const about = {
  id: "about",
  number: "02",
  label: "About",
  heading: "Engineer who likes building things end to end.",
  paragraphs: [
    "Computer Science student at Stony Brook University. I work across the stack, from backend services and data pipelines to clean, fast interfaces. Currently interested in AI/ML systems and developer tooling.",
  ],
  skillsLabel: "Languages & tools",
  skills: ["Python", "Java", "C", "JavaScript", "React", "FastAPI", "PyTorch", "Docker"],
};

/** 03 — Projects. Curation (order, hidden repos, one-line blurbs) is in projects.ts. */
export const projects = {
  id: "projects",
  number: "03",
  label: "Projects",
  heading: "My Work",
  note: "from GitHub",
};

/** 04 — Experience. Entries render top to bottom. Add each accomplishment to `points`. */
export const experience = {
  id: "experience",
  number: "04",
  label: "Experience",
  heading: "Where I've worked",
  entries: [
    {
      period: "August 2026 — Present",
      role: "Software Engineer Intern",
      company: "SRC Inc.",
      location: "Stony Brook, NY",
      points: [
        "Simplifying customer deployment to a one-command install with no manual dependency setup by packaging Redis, frontend, and backend with PyInstaller",
        "Expanding platform compatibility from Linux to Windows by rewriting Bash build, test, and utility scripts in Python and handling file permissions and paths",
        "Adding support for users to measure distances between tracked objects by building range rings and rulers into the frontend sensor map",
      ],
    },
    {
      period: "May 2026 — August 2026",
      role: "DevOps Engineer Intern",
      company: "SRC Inc.",
      location: "Syracuse, NY",
      points: [
        "Automated tracking of costly company equipment by designing and deploying a production RFID system that integrates hardware with Jira Service Management (JSM), built to scale from 2 initial readers to 100+ across all facility rooms",
        "Prevented duplicate JSM API calls caused by overlapping RFID reader scans by implementing a multithreaded FastAPI service with a shared state-tracking class",
        "Gave technicians faster access to asset records across facilities by building a React website that shows live JSM data when a QR code is scanned",
        "Streamlined deployment of a multi-service system by containerizing components with Docker and orchestrating them with Docker Compose",
        "Secured RFID reader access and removed the risk of shared admin credentials by configuring an MQTT broker with role-based access control",
        "Simplified upfront validation and error handling by modeling JSM API responses with Pydantic schemas",
      ],
    },
    {
      period: "February 2026 — May 2026",
      role: "Software Engineer Intern",
      company: "SRC Inc.",
      location: "Stony Brook, NY",
      points: [
        "Extended a sensor analytics web app to handle a new sensor type by building a modular plugin with live dashboard updates via Flask and Socket.IO",
        "Enabled nested panels and message-driven dynamic displays by migrating from unsupported Grafana v1 to v2 with compatible JSON object models",
        "Diagnosed and resolved build issues following a Linux-to-Windows migration by identifying OS-specific dependency and configuration conflicts",
        "Improved build clarity and maintainability by refactoring setup.cfg dependency configuration to separate environment-specific options",
        "Navigated a large legacy codebase and internal documentation to implement features aligned with existing system workflows",
      ],
    },
    {
      period: "August 2025 — December 2025",
      role: "ML Engineer Intern",
      company: "7-Eleven",
      location: "New York, NY · Break Through Tech AI Program",
      points: [
        "Built an agentic, multi-step RAG system that lets store employees quickly find troubleshooting and operational answers in large internal manuals",
        "Designed a hybrid retrieval stack (BM25 + FAISS) with scalable PDF ingestion and embedding pipelines (PyMuPDF, SentenceTransformers), enabling robust semantic search across thousands of document chunks and low-latency, production-ready retrieval",
        "Achieved >80% retrieval precision by implementing a LangGraph reasoning workflow (Planner → Retriever → Grader → Synthesizer) with a BGE reranker",
        "Delivered real-time natural-language queries over enterprise documentation by deploying a production demo via Streamlit and Hugging Face Spaces",
      ],
    },
    {
      period: "August 2025 — December 2025",
      role: "Machine Learning Intern",
      company: "IAMBIC",
      location: "Stony Brook, NY",
      points: [
        "Significantly increased usable training samples by building Python and OpenCV preprocessing pipelines that standardize multi-view foot scan data",
        "Improved model validation accuracy and robustness by designing and training a hybrid CNN + MLP regression model combining visual features with structured biometric metadata to support geometric prediction in downstream 3D reconstruction pipelines",
        "Generated high-fidelity 3D meshes adopted for model training in an NSF-funded R&D pipeline by implementing multi-view alignment and triangulation",
        "Accelerated dataset throughput and iteration cycles by integrating preprocessing, feature extraction, and model inference into production ML pipelines",
      ],
    },
  ],
};

/** 05 — Contact: the dark closing band. */
export const contact = {
  id: "contact",
  number: "05",
  label: "Contact",
  heading: "Let's connect.",
};
