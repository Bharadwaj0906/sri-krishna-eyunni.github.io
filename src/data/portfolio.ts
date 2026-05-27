export const personal = {
  name: "Sri Krishna Bharadwaj Eyunni",
  shortName: "Bharadwaj",
  title: "AI/ML Engineer & Data Scientist",
  tagline: "Where most stop at LLMs, I go further: agents, RAG, LangGraph & agentic workflows.\nAlways experimenting. Always building.\nWork in progress. So am I.",
  email: "eskbharadwaj2210@gmail.com",
  phone: "(602) 833-9858",
  linkedin: "https://linkedin.com/in/bharadwaj-eyunni",
  github: "https://github.com/Bharadwaj0906",
  location: "Tempe, Arizona, US",
};

export const education = [
  {
    degree: "Master of Science in Data Science, Analytics and Engineering",
    school: "Arizona State University",
    location: "Tempe, Arizona, US",
    period: "Aug 2024 – May 2026",
  },
  {
    degree: "Bachelor's in Computer Science Engineering (AI & ML)",
    school: "Lovely Professional University",
    location: "Punjab, India",
    period: "Aug 2020 – May 2024",
  },
];

export const experience = [
  {
    role: "Machine Learning Research Intern",
    company: "UpGrad",
    period: "Jan 2024 – May 2024",
    bullets: [
      "Developed and validated a sequence-aware deep learning model (LRCN) for video-based human activity recognition, achieving 98.03% accuracy on temporal datasets.",
      "Published peer-reviewed findings at IEEE ICDABI 2024, validating model reproducibility and temporal classification methodology.",
    ],
  },
];

export const projects = [
  {
    id: 1,
    name: "Cruzo.ai",
    period: "Jan 2026 – Present",
    status: "ACTIVE",
    description:
      "Production-grade multi-tenant SaaS platform with async REST API microservices, AutoML forecasting, and generative AI integration.",
    bullets: [
      "Architected async REST API with FastAPI, asyncpg pooling (5-20 connections), asyncio.Semaphore(30) for LLM rate limiting — zero blocking I/O across a multi-tenant SaaS environment.",
      "Built end-to-end data pipeline ingesting Excel, CSV, PDF, images via Claude Vision with asyncio.gather() chunking — 280+ structured records per upload into PostgreSQL.",
      "Designed AutoML forecasting pipeline across 4 algorithms (Moving Average, SARIMA, XGBoost, Exp. Smoothing) via walk-forward CV — 181+ weekly forecasts per item.",
      "Integrated Gemini-powered image generation and a multi-turn Claude tool-use chatbot with dynamic SQL, prompt caching, and SQL injection protection.",
    ],
    tags: ["FastAPI", "PostgreSQL", "Claude AI", "Gemini", "AutoML", "asyncio"],
    github: null,
    featured: true,
  },
  {
    id: 2,
    name: "Intelligent Chat X-Ray Analysis",
    period: "2026",
    status: "COMPLETE",
    description:
      "AI assistant for faster, more accurate radiology triage using deep learning and retrieval-augmented clinical reasoning.",
    bullets: [
      "Building AI-powered radiology triage system combining deep learning with RAG for clinical decision support.",
      "Integrating medical imaging models with LLM-based reasoning for structured diagnostic outputs.",
    ],
    tags: ["Deep Learning", "RAG", "Medical AI", "Python"],
    github: "https://github.com/Bharadwaj0906/FP-Virtual_Healthcare_Assistant",
    featured: true,
  },
  {
    id: 3,
    name: "RAG Data Ingestion & Retrieval Pipeline",
    period: "Sep 2025 – Oct 2025",
    status: "COMPLETE",
    description:
      "Retrieval-Augmented Generation chatbot with automated data pipeline for semantic search across 5K+ records.",
    bullets: [
      "Engineered RAG chatbot integrating LLM APIs with ChromaDB vector database for context-aware responses.",
      "Built automated pipeline using Playwright for scraping and indexing 5K+ records into vector embeddings.",
      "Enabled cross-branch comparison logic across multiple restaurant entities for multi-source query handling.",
    ],
    tags: ["LangChain", "ChromaDB", "Playwright", "RAG", "LLM APIs"],
    github: null,
    featured: true,
  },
  {
    id: 4,
    name: "Edge-Cloud Face Recognition System",
    period: "Feb 2025 – May 2025",
    status: "COMPLETE",
    description:
      "Multi-tier cloud application for distributed real-time face detection using AWS and edge computing.",
    bullets: [
      "Developed cloud application using AWS EC2, SQS, and Lambda to process image uploads across 15 autoscaling instances.",
      "Implemented queue-based orchestration with serverless function chaining for scalable image inference.",
      "Deployed hybrid edge-cloud processing with AWS IoT Greengrass and MTCNN for real-time face detection.",
    ],
    tags: ["AWS EC2", "Lambda", "SQS", "PyTorch", "IoT Greengrass", "MTCNN"],
    github: "https://github.com/Bharadwaj0906/Cloud-and-Edge-Based-Inference-System-for-Real-Time-Face-Recognition.-",
    featured: true,
  },
  {
    id: 5,
    name: "Finance Trends Dashboard",
    period: "Aug 2025 – Dec 2025",
    status: "COMPLETE",
    description:
      "KPI-driven Tableau dashboard analyzing 12,000+ investor profiles for stakeholder reporting and portfolio insights.",
    bullets: [
      "Applied statistical modeling on 12,000+ investor profiles to classify behavior by risk tolerance and tenure.",
      "Surfaced business insights on asset allocation trends and engagement frequency across cohorts.",
      "Quantified portfolio concentration differences identifying stronger equity exposure in high-risk segments.",
    ],
    tags: ["Tableau", "Statistical Modeling", "Feature Engineering", "KPI"],
    github: null,
    featured: true,
  },
  {
    id: 6,
    name: "Airline Passenger Satisfaction",
    period: "2023",
    status: "COMPLETE",
    description:
      "ETL pipeline and predictive analysis on 103,904 airline survey records with hypothesis testing and A/B breakdowns.",
    bullets: [
      "Built ETL pipeline to clean 103,904 airline survey records, resolving 310 missing values.",
      "Conducted hypothesis testing across 14 service ratings confirming delay correlation (~0.97).",
      "Synthesized insights into prioritized business recommendations flagging high-risk dissatisfaction segments.",
    ],
    tags: ["Python", "Pandas", "NumPy", "Seaborn", "ETL", "A/B Testing"],
    github: "https://github.com/Bharadwaj0906/Airline-Passenger-Satisfaction-Project",
    featured: false,
  },
  {
    id: 7,
    name: "Human Activity Recognition",
    period: "2024",
    status: "PUBLISHED",
    description:
      "IEEE-published LRCN deep learning model achieving 98.03% accuracy on fight vs non-fight detection.",
    bullets: [
      "Deployed LRCN architecture for video-based HAR achieving 98.03% accuracy.",
      "Published at IEEE ICDABI 2024, DOI: 10.1109/ICDABI63787.2024.10800440.",
    ],
    tags: ["Deep Learning", "LRCN", "OpenCV", "TensorFlow", "Computer Vision"],
    github: "https://github.com/Bharadwaj0906/Human-Activity-Recognition-Fight-Detection",
    featured: false,
  },
  {
    id: 8,
    name: "NLP Algorithm Comparison",
    period: "2023",
    status: "COMPLETE",
    description: "Comparative study of NLP algorithms using machine learning benchmarks.",
    bullets: ["Compared multiple NLP algorithms across classification benchmarks using Scikit-learn."],
    tags: ["NLP", "Scikit-learn", "Python", "Jupyter"],
    github: "https://github.com/Bharadwaj0906/Nlp-algorithm-comparison-model-using-machine-learning",
    featured: false,
  },
];

export const skills = {
  languages: ["Python", "R", "SQL", "Java", "C++", "HTML", "CSS"],
  mlAi: [
    "TensorFlow", "PyTorch", "Scikit-Learn", "Keras", "OpenCV",
    "CNN", "NLP", "Deep Learning", "Reinforcement Learning",
    "Pandas", "NumPy", "Matplotlib", "Seaborn", "Tableau",
    "A/B Testing", "Hypothesis Testing",
  ],
  cloudTools: [
    "AWS", "Docker", "Kubernetes", "FastAPI", "PostgreSQL",
    "REST API", "Git", "GitHub", "ETL", "CI/CD", "MLflow",
    "MySQL", "Power BI", "Hadoop",
  ],
  genAi: [
    "Large Language Models (LLM)", "Prompt Engineering",
    "Retrieval-Augmented Generation (RAG)", "LangChain", "LangGraph",
    "AI Agents", "Agent Orchestration", "ChromaDB", "Vector Databases",
    "Semantic Embeddings", "LLM APIs",
  ],
};

export const publications = [
  {
    title: "Human Activity Recognition using Sequence-Aware LRCN Architecture",
    venue: "IEEE ICDABI 2024, Zallaq, Bahrain",
    doi: "10.1109/ICDABI63787.2024.10800440",
    highlight: "98.03% classification accuracy — 40% improvement in temporal feature extraction",
  },
];

export const leadership = [
  {
    role: "Volunteer",
    org: "National Service Scheme (Government of India)",
    period: "Aug 2022 – May 2024",
    bullets: [
      "Led mentorship initiative connecting 100+ students with local leaders in Khajurla.",
      "Earned 240-hour certification from the Government of India for impactful NSS contributions.",
    ],
  },
  {
    role: "President",
    org: "Cognizant Club",
    period: "Jan 2023 – Aug 2023",
    bullets: [
      "Directed a team of 15 members through 12 interactive events and workshops.",
      "Improved soft skills and team cohesion across the club.",
    ],
  },
];
