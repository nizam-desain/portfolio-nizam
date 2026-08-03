// ─────────────────────────────────────────────────────────────
// EDIT ME: this file is the single source of truth for every
// piece of copy on the site. Replace the placeholder values
// with your real information — nothing elsewhere needs to change.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Nizam Zahrani",
  title: "Management Information Systems Student",
  tagline:
    "I connect business strategy to the systems that run it — ERP, AI, and data, wired together to optimize workflows.",
  location: "Cikarang, Indonesia",
  availability: "Open to Internships",
  email: "nizamzahrani7@gmail.com",
  linkedin: "https://www.linkedin.com/in/nizamuddin-zahrani",
  github: "https://github.com/nizam-desain", 
  instagram: "https://instagram.com/nniz4m", 
  whatsapp: "https://wa.me/6285706203608",
  resumeUrl: "/resume.pdf", 
  portraitUrl: "/images/portrait.jpg", 
};

export const roleWords = [
  "Business Process Optimization",
  "ERP Systems",
  "Data Analytics",
  "Digital Transformation",
  "AI & IoT Architecture",
];

export const stats = [
  { label: "Major Projects", value: 4, suffix: "+" },
  { label: "Case Competitions", value: 4, suffix: "+" },
  { label: "Leadership Roles", value: 2, suffix: "+" },
  { label: "Internships", value: 2, suffix: "+" },
  { label: "Certifications", value: 4, suffix: "+" },
  { label: "Years Experience", value: 2, suffix: "+" },
];

export const aboutTimeline = [
  {
    year: "2024",
    title: "Started B.S. in Management Information Systems",
    detail: "President University. Scholarship Awardee. Specialization: ERP.",
  },
  {
    year: "2025",
    title: "2nd Prize, CONCORD CUP",
    detail: "World University AI + International Business Negotiation Competition in China.",
  },
  {
    year: "2026",
    title: "Treasurer & PIC PR, PURD",
    detail: "Managed financial administration and public relations for President University Roblox Developer.",
  },
  {
    year: "2026",
    title: "Semi-finalist, A4S International Case Competition",
    detail: "Analyzed complex cases and delivered data-driven insights with Team President Consulting.",
  },
];

export const education = {
  degree: "B.S. Management Information Systems",
  specialization: "Enterprise Resource Planning (ERP)",
  school: "President University",
  gpa: "N/A", // Ganti dengan IPK kamu jika ingin ditampilkan
  graduation: "Expected 2027",
  languages: ["Indonesian (native)", "English (fluent)"],
};

export const coreValues = [
  { title: "Systems thinking", detail: "I analyze the end-to-end business process before recommending a technical solution." },
  { title: "Data-Driven Strategy", detail: "Every decision is backed by analytics and structured logic." },
  { title: "Cross-functional Collaboration", detail: "Bridging the gap between technical teams and business stakeholders." },
  { title: "Continuous Optimization", detail: "Focusing on scalability, resilience, and operational efficiency." },
];

export type Skill = {
  name: string;
  level: number; // 0-100
  category: "Business" | "Technology" | "Analytics" | "ERP" | "Programming" | "Design" | "Project Management" | "Leadership";
};

export const skills: Skill[] = [
  { name: "Business Process Analysis", level: 90, category: "Business" },
  { name: "Financial Literacy", level: 85, category: "Business" },
  { name: "Process Mapping (BPMN)", level: 88, category: "Business" },
  { name: "Epicor Kinetic", level: 85, category: "ERP" },
  { name: "Odoo", level: 80, category: "ERP" },
  { name: "Accurate", level: 80, category: "ERP" },
  { name: "Microsoft Excel (Advanced)", level: 90, category: "Analytics" },
  { name: "Power BI", level: 85, category: "Analytics" },
  { name: "SQL & MySQL", level: 85, category: "Analytics" },
  { name: "AWS IoT Core", level: 75, category: "Analytics" },
  { name: "Java", level: 82, category: "Programming" },
  { name: "Kotlin (Android)", level: 80, category: "Programming" },
  { name: "PHP / Laravel", level: 75, category: "Programming" },
  { name: "Python (Flask)", level: 78, category: "Programming" },
  { name: "Figma", level: 75, category: "Design" },
  { name: "Draw.io", level: 80, category: "Design" },
  { name: "Stakeholder Management", level: 85, category: "Project Management" },
  { name: "Sponsorship Acquisition", level: 88, category: "Leadership" },
  { name: "Event Management", level: 85, category: "Leadership" },
];

export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  timeline: string;
  problem: string;
  solution: string;
  impact: string[];
  tools: string[];
  challenges: string;
  lessons: string;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "3-otak-ai",
    title: "3 Otak AI - Logistics Network",
    category: "AI & Backend Engineering",
    summary: "AI-Powered Green & Resilient Logistics Network for 'Blibli Logistics Agentic Control Tower'.",
    role: "Lead AI & Backend Engineer",
    timeline: "May 2026 – Jun 2026",
    problem:
      "Logistics networks struggle with real-time supply chain resilience and environmental sustainability tracking.",
    solution:
      "Architected the core '3 Otak AI' system: SLA Prediction Agent (XGBoost), Visual Agent (YOLOv8 for CCTV), and Carbon Agent (GLEC v3 route optimization).",
    impact: ["Optimized supply chain resilience", "Improved environmental sustainability", "Enabled real-time streaming monitoring"],
    tools: ["Python", "XGBoost", "YOLOv8", "SQLite", "WebSocket"],
    challenges:
      "Integrating separated offline/online pipelines into a single robust backend while maintaining lightweight database schema.",
    lessons:
      "Designing for scale requires a deep understanding of data flow and real-time processing constraints.",
    links: [{ label: "Case Study", href: "#" }],
  },
  {
    slug: "erp-practicum",
    title: "Multi-Platform ERP Practicum",
    category: "ERP Analysis",
    summary: "End-to-end business process analysis across multiple ERP environments.",
    role: "ERP System Analyst",
    timeline: "Jan 2026 – May 2026",
    problem: "Inefficiencies and disconnected data across procurement, inventory, and supplier management workflows.",
    solution:
      "Performed detailed analysis and mapping utilizing Epicor Kinetic, Accurate, and Odoo ERP platforms to optimize workflows.",
    impact: ["Optimized data integration", "Streamlined operational workflows", "Identified key process improvements"],
    tools: ["Epicor Kinetic", "Odoo", "Accurate", "BPMN"],
    challenges: "Adapting to the unique architecture and logic of three distinct ERP systems simultaneously.",
    lessons: "Core business processes remain similar, but the technical execution varies greatly across different ERP tools.",
    links: [{ label: "Case Study", href: "#" }],
  },
  {
    slug: "mobile-inventory",
    title: "Mobile Inventory Management System",
    category: "Full Stack Development",
    summary: "Comprehensive inventory tracking application built natively for Android.",
    role: "Full Stack Mobile Developer (Android)",
    timeline: "Oct 2025 – Dec 2025",
    problem: "Lack of real-time, mobile-accessible tracking for inventory and assets.",
    solution:
      "Developed an Android app (Java/XML) connected to a robust PHP/MySQL backend with custom API endpoints for seamless database communication.",
    impact: ["Enabled secure user authentication", "Provided real-time dashboard monitoring", "Delivered full CRUD capabilities"],
    tools: ["Java", "Android Studio", "PHP", "MySQL", "XML"],
    challenges: "Ensuring secure and efficient data transfer between the mobile client and the backend server.",
    lessons: "Robust API design is crucial for a smooth and responsive mobile application experience.",
    links: [{ label: "Case Study", href: "#" }],
  },
  {
    slug: "amartha-proxyscore",
    title: "Amartha-ProxyScore (AI Credit Scoring)",
    category: "Business Strategy",
    summary: "AI-Based Credit Scoring Solution proposal for unbanked MSMEs.",
    role: "Business Marketing Lead",
    timeline: "Jun 2025 – Jul 2025",
    problem: "Millions of unbanked MSMEs lack access to credit due to traditional scoring limitations.",
    solution: "Co-developed a comprehensive business proposal and pitch deck for a multi-modal AI framework to assess credit risk.",
    impact: ["Formulated a compelling business narrative", "Analyzed scalability for 50 million entrepreneurs", "Justified product-market fit"],
    tools: ["Business Strategy", "Market Analysis", "Pitch Deck Creation"],
    challenges: "Translating complex AI capabilities into clear, compelling business value for stakeholders.",
    lessons: "A strong technical solution must be paired with a solid business model to achieve real-world adoption.",
    links: [{ label: "Case Study", href: "#" }],
  },
];

export type Experience = {
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  technologies: string[];
};

export const experience: Experience[] = [
  {
    company: "Jakarta Mengabdi (Sapa Kampung 2026)",
    role: "Sponsorship PIC & Field Volunteer",
    duration: "Feb 2026 – Present",
    description: "Led partnership and sponsorship acquisition initiatives for community development programs in Pulau Pramuka and Pulau Tidung.",
    achievements: [
      "Prepared strategic sponsorship proposals",
      "Managed communication with external partners",
      "Supported program logistics and funding",
    ],
    technologies: ["Public Relations", "Sponsorship Strategy"],
  },
  {
    company: "President University Roblox Developer (PURD)",
    role: "Treasurer & PIC Public Relations",
    duration: "April 2026 – May 2026",
    description: "Managed financial administration, cash flow tracking, and budget formulation for large-scale organizational events.",
    achievements: [
      "Maintained accurate financial records",
      "Prepared comprehensive reports for management decision-making",
    ],
    technologies: ["Financial Management", "Public Relations"],
  },
  {
    company: "President University",
    role: "Content Creator Intern",
    duration: "Oct 2024 – Jan 2025",
    description: "Assisted in planning and managing digital communication strategies.",
    achievements: [
      "Coordinated content schedules and publication workflows",
      "Collaborated with multiple teams to ensure timely project execution",
    ],
    technologies: ["Digital Marketing", "Content Strategy"],
  },
  {
    company: "Puskesmas Manukan Kulon",
    role: "Administrative Intern",
    duration: "May 2024 – Jun 2024",
    description: "Managed patient records and administrative data entry with high accuracy and compliance standards.",
    achievements: [
      "Supported operational workflows",
      "Maintained documentation for daily healthcare services",
    ],
    technologies: ["Data Entry", "Administration"],
  },
];

export const leadership = [
  {
    org: "Jakarta Mengabdi",
    role: "Sponsorship PIC & Field Volunteer",
    period: "2026",
    detail: "Led partnership acquisition for community development programs in Kepulauan Seribu.",
  },
  {
    org: "President University Roblox Developer (PURD)",
    role: "Treasurer & PIC Public Relations",
    period: "2026",
    detail: "Managed event budgets and external communications for a major campus organization.",
  },
];

export const certifications = [
  // Google AI Professional Certificates
  { name: "Sertifikat Profesional Google AI", provider: "Google", date: "2026", skills: ["Artificial Intelligence"], credentialUrl: "/images/cert-google-pro.pdf" },
  { name: "AI+Fundamentals", provider: "Google", date: "2026", skills: ["AI Fundamentals"], credentialUrl: "/images/cert-google-fundamentals.pdf" },
  { name: "AI for App Building", provider: "Google", date: "2026", skills: ["App Development"], credentialUrl: "/images/cert-google-app.pdf" },
  { name: "AI for Data Analysis", provider: "Google", date: "2026", skills: ["Data Analysis"], credentialUrl: "/images/cert-google-data.pdf" },
  { name: "AI for Content Creation", provider: "Google", date: "2026", skills: ["Content Creation"], credentialUrl: "/images/cert-google-content.pdf" },
  { name: "AI for Writing and Communicating", provider: "Google", date: "2026", skills: ["Communication"], credentialUrl: "/images/cert-google-writing.pdf" },
  { name: "AI for Research and Insights", provider: "Google", date: "2026", skills: ["Research"], credentialUrl: "/images/cert-google-research.pdf" },
  { name: "AI for Brainstorming and Planning", provider: "Google", date: "2026", skills: ["Planning"], credentialUrl: "/images/cert-google-brainstorming.pdf" },
  
  // Dicoding Indonesia Certificates
  { name: "Memulai Pemrograman dengan Kotlin", provider: "Dicoding Indonesia", date: "2026", skills: ["Kotlin"], credentialUrl: "/images/cert-dicoding-kotlin.pdf" },
  { name: "Belajar Dasar Pengembangan Aplikasi Mobile", provider: "Dicoding Indonesia", date: "2026", skills: ["Mobile Development"], credentialUrl: "/images/cert-dicoding-mobile.pdf" },
  { name: "Belajar Dasar Cloud dan Gen AI di AWS", provider: "Dicoding Indonesia", date: "2026", skills: ["AWS", "Gen AI"], credentialUrl: "/images/cert-dicoding-aws.pdf" },
  { name: "Spec-Driven Development dengan Kiro", provider: "Dicoding Indonesia", date: "2026", skills: ["API Design"], credentialUrl: "/images/cert-dicoding-kiro.pdf" },
  { name: "Belajar Dasar Pemrograman Web", provider: "Dicoding Indonesia", date: "2026", skills: ["Web Fundamentals"], credentialUrl: "/images/cert-dicoding-web.pdf" },
  { name: "Belajar Dasar Pemrograman JavaScript", provider: "Dicoding Indonesia", date: "2026", skills: ["JavaScript"], credentialUrl: "/images/cert-dicoding-js.pdf" },
  { name: "Introduction to Financial Literacy", provider: "Dicoding Indonesia", date: "2026", skills: ["Financial Planning"], credentialUrl: "/images/cert-dicoding-finance.pdf" },
];

export const achievements = [
  { title: "Certificate of Completion", org: "Social Business Pitch Competition, City University of Seattle", year: "2026", link: "/images/city-university-cert.jpg" }, 
  { title: "Semi-finalist", org: "A4S International Case Competition", year: "2026", link: "/images/a4s-certificate.jpg" },
  { title: "2nd Prize", org: "CONCORD CUP World University AI", year: "2025", link: "/images/concord-cup-cert.jpg" },
  { title: "Semi-Finalist", org: "BIZIONARY Business Case Competition", year: "2025", link: "/images/bizionary-cert.jpg" },
  { title: "Gold Medal in Biology & Medicine", org: "National Science Competition", year: "2024", link: "/images/gold-medal-cert.jpg" },
];

export const tools = [
  "Excel", "Power BI", "Power Automate", "Epicor Kinetic", "Odoo", "Accurate", "SQL",
  "MySQL", "AWS IoT Core", "Figma", "Draw.io", "BPMN", "PHP", "Laravel", "Java", "Kotlin", "Android Studio", "Python"
];

// Biarkan kosong dulu sesuai saran agar lebih profesional sebelum ada testimonial asli
export const testimonials = [
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];