// ─────────────────────────────────────────────────────────────
// Single source of truth for every piece of copy on the site.
// Facts are drawn from the current CV and the supplied certificate
// evidence. Internal Mattel work is described at a sanitised,
// high-level only — keep it that way when editing.
// ─────────────────────────────────────────────────────────────

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-nizam-zgvx.vercel.app"
).replace(/\/$/, "");

export const profile = {
  name: "Nizamuddin Zahrani",
  legalName: "Nizamuddin Giffa Abdul Aziz Zahrani",
  initials: "NZ",
  positioning: ["Business Analyst", "Business Process Improvement", "Strategy & Operations"],
  headline: "Making sense of complex business problems.",
  intro:
    "I bridge business needs and practical solutions through structured analysis, stakeholder collaboration, and process improvement.",
  status:
    "Information Systems undergraduate at President University, currently interning in People & Culture HR Information Systems at Mattel Indonesia.",
  location: "Cikarang, Indonesia",
  email: "nizamzahrani7@gmail.com",
  linkedin: "https://www.linkedin.com/in/nizamuddin-zahrani",
  github: "https://github.com/nizam-desain",
  resumeUrl: "/resume.pdf",
  portrait: { src: "/images/portrait.jpg", width: 1638, height: 2048 },
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
];

// ── About ────────────────────────────────────────────────────

export const about = {
  lead:
    "I'm drawn to the space between how a business is supposed to work and how it actually works — and to the practical changes that close that gap.",
  paragraphs: [
    "I study Information Systems for Business and Management at President University, with a concentration in Enterprise Resource Planning. That background taught me how processes, data, and systems depend on one another — but what interests me most is the business problem underneath.",
    "At Mattel Indonesia's People & Culture Service Hub, I work on the functional side of internal workflow initiatives: sitting with stakeholders, observing day-to-day operations, mapping how work flows today, and turning what people need into requirements that technical colleagues can evaluate and build against.",
    "I'm building toward a career in business analysis, strategy and operations, and eventually management consulting — roles where structured thinking and clear communication matter as much as the answer.",
  ],
  approach: [
    {
      title: "Understand the operation",
      detail: "Start with the people doing the work — what they do, where it slows down, and why.",
    },
    {
      title: "Map the current state",
      detail: "Document the AS-IS workflow, business rules, and constraints before proposing anything.",
    },
    {
      title: "Find the friction",
      detail: "Separate root causes from symptoms; favour practical fixes over unnecessary complexity.",
    },
    {
      title: "Translate and validate",
      detail: "Turn needs into clear functional requirements, then test the outcome against agreed rules.",
    },
  ],
  facts: [
    { label: "Currently", value: "HR Information Systems Intern, Mattel Indonesia" },
    { label: "Studying", value: "Information Systems for Business & Management, President University" },
    { label: "Scholarship", value: "Jababeka Scholarship — 75% tuition grant" },
    { label: "Based in", value: "Cikarang, Indonesia" },
  ],
};

// ── Experience ───────────────────────────────────────────────

export type ExperienceItem = {
  id: string;
  organization: string;
  unit?: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  keyResult?: { value: string; label: string };
};

export const featuredExperience: ExperienceItem = {
  id: "mattel",
  organization: "Mattel Indonesia",
  unit: "People & Culture (P&C) Service Hub",
  role: "People & Culture — HR Information Systems Intern",
  period: "Sep 2026 – Present",
  location: "Indonesia",
  summary:
    "A functional, business-facing role within the P&C Service Hub. I analyse workflows, requirements, system behaviour, and operational constraints, and work alongside technical colleagues who own implementation.",
  highlights: [
    "Analyse business processes and information-system workflows to identify functional improvement opportunities.",
    "Facilitate stakeholder discussions to understand current operations, requirements, and constraints.",
    "Translate business needs into structured functional requirements and process documentation.",
    "Collaborate with technical colleagues to validate solution feasibility and clarify expected system behaviour.",
    "Support scenario-based functional testing and validation against agreed business rules.",
    "Communicate findings and proposed improvements to relevant stakeholders.",
  ],
};

export const otherExperience: ExperienceItem[] = [
  {
    id: "jakarta-mengabdi",
    organization: "Jakarta Mengabdi (Sapa Kampung 2026)",
    role: "Sponsorship PIC",
    period: "Feb 2026 – Present",
    location: "Pulau Pramuka & Pulau Tidung",
    summary:
      "Led sponsorship acquisition for a community development programme in the Thousand Islands.",
    keyResult: { value: "IDR 30M", label: "sponsorship secured from IKA Universitas Airlangga" },
    highlights: [
      "Secured IDR 30 million in sponsorship from IKA Universitas Airlangga (IKA UNAIR) through partnership development and stakeholder negotiation.",
      "Owned the process end to end — market research, proposal development, presentation, negotiation, and partnership execution.",
      "Coordinated committees and external partners so sponsorship deliverables matched programme operations.",
    ],
  },
  {
    id: "purd",
    organization: "President University Roblox Developer (PURD)",
    role: "Treasurer & PIC Public Relations",
    period: "Apr 2026 – May 2026",
    location: "Cikarang",
    summary: "Managed the organisation's finances and external communications for its programmes.",
    highlights: [
      "Managed budgeting, financial reporting, and operational cash flow.",
      "Prepared financial documentation to support organisational decision-making.",
      "Coordinated external communications and partnership activities with internal committees.",
    ],
  },
  {
    id: "pu-content",
    organization: "President University",
    role: "Content Creator Intern",
    period: "Oct 2024 – Jan 2025",
    location: "Cikarang",
    summary: "Supported institutional communication campaigns involving multiple stakeholders.",
    highlights: [
      "Coordinated publication schedules, cross-functional workflows, and delivery timelines.",
      "Supported planning and execution of multi-stakeholder communication campaigns.",
    ],
  },
  {
    id: "puskesmas",
    organization: "Puskesmas Manukan Kulon",
    role: "Administrative Intern",
    period: "May 2024 – Jun 2024",
    location: "Surabaya",
    summary: "Supported daily administrative workflows at a public community health centre.",
    highlights: [
      "Managed patient records and administrative data entry in line with accuracy and compliance standards.",
      "Maintained documentation supporting daily healthcare service workflows.",
    ],
  },
];

// ── Professional case studies (Mattel, sanitised) ────────────

export type CaseStudy = {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  organization: string;
  role: string;
  period: string;
  status: string;
  statusTone: "ongoing" | "complete";
  diagram: "process" | "approval" | "requisition";
  context: string;
  objective: string;
  responsibilities: string[];
  approach: string[];
  deliverables: string[];
  skills: string[];
  stage: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "click2eat",
    index: "01",
    title: "Click2Eat — Food Ordering & Operational Process Improvement",
    shortTitle: "Click2Eat",
    organization: "Mattel Indonesia",
    role: "Functional / Business Analysis Contribution",
    period: "2026 – Present",
    status: "Ongoing",
    statusTone: "ongoing",
    diagram: "process",
    context:
      "An internal food-ordering initiative where the ordering process, order-status updates, and the coordination between administrative and kitchen teams all needed to work smoothly together — in practice, not just on paper.",
    objective:
      "Understand how the food-ordering operation really runs day to day, and identify practical improvements to coordination between operations and the supporting information system.",
    responsibilities: [
      "Conduct stakeholder discussions with the people involved in ordering and fulfilment.",
      "Observe administrative and kitchen activities to see how the process works in practice.",
      "Analyse the AS-IS ordering, fulfilment, and order-status workflow end to end.",
      "Support TO-BE workflow design and evaluate operational requirements and constraints.",
      "Work with technical colleagues to assess the feasibility of potential improvements.",
    ],
    approach: [
      "Observation first — watching the real operation before relying on documented procedure.",
      "Mapping each hand-off between ordering, preparation, and status updates to locate friction.",
      "Weighing improvement options by operational fit, favouring practical solutions that avoid unnecessary technical complexity.",
    ],
    deliverables: [
      "AS-IS workflow understanding",
      "Improvement opportunities",
      "TO-BE workflow input",
      "Functional requirements assessment",
    ],
    skills: ["Stakeholder interviews", "Process observation", "AS-IS / TO-BE mapping", "Requirements analysis", "Cross-functional collaboration"],
    stage:
      "Analysis is ongoing. Recommendations are still under discussion; nothing described here should be read as an implemented change.",
  },
  {
    slug: "request-approval-workflow",
    index: "02",
    title: "Internal Request & Approval Workflow Optimization",
    shortTitle: "Request & Approval Workflow",
    organization: "Mattel Indonesia",
    role: "Functional Analyst Contribution",
    period: "2026",
    status: "Documentation & validation completed",
    statusTone: "complete",
    diagram: "approval",
    context:
      "An internal request-management workflow in which requests pass through several approval steps. The aim was to make sure the workflow behaved exactly as the business intended — including when things don't go to plan.",
    objective:
      "Evaluate workflow conditions, business rules, and system behaviour against intended business requirements, and support improvement of the workflow.",
    responsibilities: [
      "AS-IS and TO-BE workflow analysis of the request and approval process.",
      "Assessment of the approval flow and clarification of business rules with stakeholders.",
      "Functional requirements analysis and exception-handling review.",
      "Scenario-based functional testing against agreed business rules.",
      "Process documentation and user guidance, validated with stakeholders.",
    ],
    approach: [
      "Defining the rules first: what should happen, for whom, and in which conditions.",
      "Designing test scenarios around both the expected path and the exceptions.",
      "Comparing actual system behaviour with intended behaviour, then communicating gaps clearly to stakeholders and the technical team.",
    ],
    deliverables: ["Process maps", "System documentation", "Testing evidence", "User guidance"],
    skills: ["Business rules analysis", "Functional testing", "Exception handling", "Process documentation", "Stakeholder validation"],
    stage:
      "Functional documentation and validation completed. Production rollout is outside the scope of this summary.",
  },
  {
    slug: "hr-portal-requisition",
    index: "03",
    title: "HR Portal — Requisition Workflow Analysis & Documentation",
    shortTitle: "HR Portal Requisitions",
    organization: "Mattel Indonesia",
    role: "Functional Analysis & Documentation",
    period: "2026",
    status: "Documentation completed",
    statusTone: "complete",
    diagram: "requisition",
    context:
      "Requisition workflows for on-the-job training (OJT) and internship placements within an HR portal, where clear documentation helps requesters and approvers use the process correctly.",
    objective:
      "Build a clear understanding of the requisition and approval workflows and document them so they are easy for users to follow.",
    responsibilities: [
      "Understand the OJT and internship requisition workflows from the business side.",
      "Analyse the approval process and clarify functional behaviour where it was unclear.",
      "Produce user documentation for the requisition process.",
      "Coordinate with business and technical colleagues to confirm details.",
    ],
    approach: [
      "Walking through each requisition type step by step with the relevant stakeholders.",
      "Writing for the end user — plain language, ordered steps, and clear expectations at each stage.",
    ],
    deliverables: ["Workflow understanding", "User documentation", "Functional clarifications"],
    skills: ["Workflow analysis", "User documentation", "Functional clarification", "Cross-functional coordination"],
    stage: "Documentation completed.",
  },
];

// ── Academic & strategic projects ────────────────────────────

export type AcademicProject = {
  slug: string;
  title: string;
  kind: string;
  role: string;
  period: string;
  summary: string;
  points: string[];
  tags: string[];
  link?: { label: string; href: string };
};

export const academicProjects: AcademicProject[] = [
  {
    slug: "blibli-ai-logistics",
    title: "Blibli AI Logistics",
    kind: "Competition proposal · AI Open Innovation Challenge 2026",
    role: "Team lead",
    period: "Jan 2026 – May 2026",
    summary:
      "A proposed logistics monitoring concept aimed at improving supply-chain resilience and operational visibility for an e-commerce logistics network.",
    points: [
      "Led the team and designed the business architecture linking SLA-breach prediction, visual hub monitoring, and carbon-aware routing.",
      "Aligned the technical components with operational objectives such as on-time delivery and visibility across hubs.",
      "Prototype-level academic and competition work — not a commercial deployment.",
    ],
    tags: ["Business architecture", "Logistics operations", "SLA concepts", "Operational strategy"],
    link: { label: "Read the proposal (PDF)", href: "/proposal-ai-logistics.pdf" },
  },
  {
    slug: "amartha-proxyscore",
    title: "Amartha ProxyScore",
    kind: "Business proposal · AI-based credit scoring",
    role: "Business Marketing Lead",
    period: "Mar 2025 – Apr 2025",
    summary:
      "A business proposal and pitch for an AI-based credit-scoring framework to widen access to credit for unbanked MSMEs.",
    points: [
      "Co-developed the business proposal and pitch deck, and formulated the business narrative.",
      "Analysed scalability against a market of 50 million entrepreneurs and assessed target users to justify product–market fit.",
    ],
    tags: ["Business analysis", "Market evaluation", "Financial inclusion", "Pitch development"],
  },
  {
    slug: "erp-business-process-analysis",
    title: "ERP Business Process Analysis",
    kind: "Coursework · Enterprise Resource Planning",
    role: "Analyst",
    period: "May 2026 – Jun 2026",
    summary:
      "End-to-end process analysis across procurement, inventory, supplier management, and manufacturing in three ERP environments.",
    points: [
      "Mapped cross-module workflows and integration requirements in Epicor Kinetic, Odoo, and Accurate.",
      "Identified operational inefficiencies and proposed improvements aligned with ERP best practice.",
    ],
    tags: ["Process mapping", "Cross-functional processes", "Epicor Kinetic", "Odoo", "Accurate"],
    link: { label: "Epicor documentation (PDF)", href: "/images/laporan-epicor.pdf" },
  },
  {
    slug: "mobile-inventory",
    title: "Mobile Inventory & Asset Management System",
    kind: "Technical project · Android",
    role: "Full Stack Mobile Developer",
    period: "Oct 2025 – Dec 2025",
    summary:
      "An Android inventory-tracking application with a relational data model and reporting dashboard to improve inventory visibility.",
    points: [
      "Designed the relational data structure and reporting dashboard.",
      "Built the app and its backend end to end as an academic project.",
    ],
    tags: ["Java", "Android", "PHP", "MySQL"],
  },
];

// ── Skills ───────────────────────────────────────────────────

export const skillGroups = [
  {
    title: "Business Analysis",
    tier: "Primary",
    description: "The core of how I work.",
    items: [
      "Business Process Analysis",
      "Business Process Improvement",
      "Requirements Elicitation",
      "Functional Analysis",
      "AS-IS / TO-BE Mapping",
      "Stakeholder Management",
      "Business Rules Analysis",
      "Functional Testing",
      "Process Documentation",
      "Cross-functional Collaboration",
    ],
  },
  {
    title: "Business & Operations",
    tier: "Secondary",
    description: "Where analysis meets direction.",
    items: [
      "Strategic Problem Solving",
      "Business Research",
      "Project Coordination",
      "Digital Transformation",
      "Operational Analysis",
      "Workflow Optimization",
    ],
  },
  {
    title: "Tools & Methods",
    tier: "Toolkit",
    description: "What I use to analyse and communicate.",
    items: ["Microsoft Excel", "Power BI", "SQL", "Power Automate", "Draw.io", "Figma", "DFD / ERD / Use Case Diagrams"],
  },
  {
    title: "Technical Foundation",
    tier: "Supporting",
    description: "Enough depth to work credibly with technical teams.",
    items: ["HRIS workflows", "Epicor Kinetic", "Odoo", "Accurate", "Python", "Java", "Kotlin", "PHP / Laravel", "AWS"],
  },
];

// ── Certifications ───────────────────────────────────────────

export type CertCategory = "AI & Data" | "Technology & Development" | "Business & Finance" | "Language";

export type Certificate = {
  id: string;
  name: string;
  issuer: "Google" | "Dicoding Indonesia" | "EF SET";
  platform?: string;
  category: CertCategory;
  issued: string;
  validUntil?: string;
  credentialId?: string;
  verifyUrl?: string;
  note?: string;
  image: { src: string; width: number; height: number };
};

const cert = (slug: string, width: number, height: number) => ({
  src: `/certificates/${slug}.png`,
  width,
  height,
});

// 16 unique credentials. Duplicate copies in the source PDF (Google AI
// Professional Certificate, AI for App Building, Belajar Dasar
// Pengembangan Aplikasi Mobile) were removed by credential ID.
// Verification URLs are the ones printed on each certificate.
export const certificates: Certificate[] = [
  {
    id: "google-ai-professional",
    name: "Google AI Professional Certificate",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "TSP02JRA0FK6",
    verifyUrl: "https://coursera.org/verify/professional-cert/TSP02JRA0FK6",
    note: "Professional certificate covering the seven Google AI courses below.",
    image: cert("google-ai-professional-certificate", 670, 529),
  },
  {
    id: "google-ai-fundamentals",
    name: "AI Fundamentals",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "TZQFNWG1KAYG",
    verifyUrl: "https://coursera.org/verify/TZQFNWG1KAYG",
    note: "Course 1 of 7 · Google AI Professional Certificate",
    image: cert("google-ai-fundamentals", 697, 538),
  },
  {
    id: "google-ai-app-building",
    name: "AI for App Building",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "7G4Q2E9W2OY9",
    verifyUrl: "https://coursera.org/verify/7G4Q2E9W2OY9",
    note: "Course · Google AI Professional Certificate",
    image: cert("google-ai-for-app-building", 693, 534),
  },
  {
    id: "google-ai-data-analysis",
    name: "AI for Data Analysis",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "1IOF5LL4OOZ9",
    verifyUrl: "https://coursera.org/verify/1IOF5LL4OOZ9",
    note: "Course · Google AI Professional Certificate",
    image: cert("google-ai-for-data-analysis", 692, 530),
  },
  {
    id: "google-ai-content-creation",
    name: "AI for Content Creation",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "VGV9VH5XWF1P",
    verifyUrl: "https://coursera.org/verify/VGV9VH5XWF1P",
    note: "Course · Google AI Professional Certificate",
    image: cert("google-ai-for-content-creation", 695, 538),
  },
  {
    id: "google-ai-writing",
    name: "AI for Writing and Communicating",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "JB4FYHTQ7HJQ",
    verifyUrl: "https://coursera.org/verify/JB4FYHTQ7HJQ",
    note: "Course · Google AI Professional Certificate",
    image: cert("google-ai-for-writing-and-communicating", 689, 536),
  },
  {
    id: "google-ai-research",
    name: "AI for Research and Insights",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "P5XH3YAZLFR2",
    verifyUrl: "https://coursera.org/verify/P5XH3YAZLFR2",
    note: "Course · Google AI Professional Certificate",
    image: cert("google-ai-for-research-and-insights", 700, 533),
  },
  {
    id: "google-ai-brainstorming",
    name: "AI for Brainstorming and Planning",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    credentialId: "M1C5DDP78STZ",
    verifyUrl: "https://coursera.org/verify/M1C5DDP78STZ",
    note: "Course · Google AI Professional Certificate",
    image: cert("google-ai-for-brainstorming-and-planning", 698, 534),
  },
  {
    id: "dicoding-aws",
    name: "Belajar Dasar Cloud dan Gen AI di AWS",
    issuer: "Dicoding Indonesia",
    category: "Technology & Development",
    issued: "Jun 2026",
    validUntil: "Jun 2029",
    credentialId: "MRZMW3M4LPYQ",
    verifyUrl: "https://dicoding.com/certificates/MRZMW3M4LPYQ",
    image: cert("dicoding-cloud-gen-ai-aws", 1120, 793),
  },
  {
    id: "dicoding-mobile",
    name: "Belajar Dasar Pengembangan Aplikasi Mobile",
    issuer: "Dicoding Indonesia",
    category: "Technology & Development",
    issued: "Jun 2026",
    validUntil: "Jun 2029",
    credentialId: "53XE17GO9ZRN",
    verifyUrl: "https://dicoding.com/certificates/53XE17GO9ZRN",
    image: cert("dicoding-mobile-app-fundamentals", 1113, 792),
  },
  {
    id: "dicoding-kotlin",
    name: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding Indonesia",
    category: "Technology & Development",
    issued: "Jun 2026",
    validUntil: "Jun 2029",
    credentialId: "81P2OWE2QZOY",
    verifyUrl: "https://dicoding.com/certificates/81P2OWE2QZOY",
    image: cert("dicoding-kotlin", 1117, 759),
  },
  {
    id: "dicoding-web",
    name: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    category: "Technology & Development",
    issued: "Jun 2026",
    validUntil: "Jun 2029",
    credentialId: "EYX4QNLOWPDL",
    verifyUrl: "https://dicoding.com/certificates/EYX4QNLOWPDL",
    image: cert("dicoding-web-programming", 1115, 787),
  },
  {
    id: "dicoding-javascript",
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    category: "Technology & Development",
    issued: "Jun 2026",
    validUntil: "Jun 2029",
    credentialId: "JLX1VQ6KJZ72",
    verifyUrl: "https://dicoding.com/certificates/JLX1VQ6KJZ72",
    image: cert("dicoding-javascript", 1118, 791),
  },
  {
    id: "dicoding-kiro",
    name: "Spec-Driven Development dengan Kiro",
    issuer: "Dicoding Indonesia",
    category: "Technology & Development",
    issued: "Jun 2026",
    validUntil: "Jun 2029",
    credentialId: "4EXG1RLREPRL",
    verifyUrl: "https://dicoding.com/certificates/4EXG1RLREPRL",
    image: cert("dicoding-spec-driven-kiro", 1116, 796),
  },
  {
    id: "dicoding-financial-literacy",
    name: "Introduction to Financial Literacy",
    issuer: "Dicoding Indonesia",
    category: "Business & Finance",
    issued: "Jan 2026",
    validUntil: "Jan 2029",
    credentialId: "KEXL2R0LWZG2",
    verifyUrl: "https://dicoding.com/certificates/KEXL2R0LWZG2",
    image: cert("dicoding-financial-literacy", 577, 399),
  },
  {
    id: "efset",
    name: "EF SET English Certificate — C2 Proficient (78/100)",
    issuer: "EF SET",
    category: "Language",
    issued: "Sep 2026",
    note: "EF SET score 78/100, mapped to CEFR C2 Proficient. Reading and listening.",
    image: cert("efset-english-c2", 700, 890),
  },
];

export const certCategories: CertCategory[] = ["AI & Data", "Technology & Development", "Business & Finance", "Language"];

// ── Honors & achievements ────────────────────────────────────

export type Award = {
  id: string;
  title: string;
  event: string;
  organizer?: string;
  date: string;
  scope: "International" | "National";
  attribution: string;
  description: string;
  images: { src: string; width: number; height: number; caption: string }[];
};

export const awards: Award[] = [
  {
    id: "concord-cup",
    title: "Second Prize",
    event: "“CONCORD CUP” World University AI + International Business Negotiation Competition",
    organizer: "China Association of International Business Negotiation · China",
    date: "Dec 2025",
    scope: "International",
    attribution: "Awarded to Team “Doa Bapak”, President University — team member",
    description: "International business negotiation and AI-application strategy in competitive business simulations.",
    images: [
      { ...cert("award-concord-cup-second-prize", 841, 597), caption: "Certificate of Award (English)" },
      { ...cert("award-concord-cup-honorary-credential", 517, 725), caption: "Honorary Credential (Chinese)" },
    ],
  },
  {
    id: "a4s",
    title: "Semi-Finalist",
    event: "A4S International Case Competition 2026",
    organizer: "Accounting for Sustainability (A4S)",
    date: "Mar 2026",
    scope: "International",
    attribution: "Team President Consulting — team member. Certificate issued as a certificate of participation.",
    description: "Case analysis and sustainable business-model recommendations delivered as a team.",
    images: [{ ...cert("award-a4s-semifinalist", 801, 558), caption: "Certificate of participation" }],
  },
  {
    id: "city-u-seattle",
    title: "Certificate of Completion",
    event: "Social Business Pitch Competition",
    organizer: "City University of Seattle",
    date: "Mar 2026",
    scope: "International",
    attribution: "Individual",
    description: "Applied business principles to develop and pitch self-sustaining social solutions.",
    images: [{ ...cert("award-city-university-seattle", 735, 564), caption: "Certificate of Completion" }],
  },
  {
    id: "bizionary",
    title: "Semi-Finalist",
    event: "BIZIONARY Business Case Competition 2025",
    organizer: "HIMABI, Universitas Padjadjaran",
    date: "Nov 2025",
    scope: "National",
    attribution: "Individual certificate",
    description: "Strategic business problem-solving under tight deadlines.",
    images: [{ ...cert("award-bizionary-semifinalist", 801, 569), caption: "Certificate of Achievement" }],
  },
  {
    id: "gold-medal",
    title: "Gold Medal — Biology & Medicine",
    event: "National Science Competition",
    date: "Jan 2024",
    scope: "National",
    attribution: "Individual",
    description: "Recognised for excellence in biological sciences and medical knowledge.",
    images: [],
  },
];

// ── Education ────────────────────────────────────────────────

export const education = {
  school: "President University",
  location: "Cikarang, Indonesia",
  program: "Undergraduate Program in Information Systems for Business and Management",
  period: "Sep 2024 – Present",
  details: [
    { label: "Concentration", value: "Enterprise Resource Planning (ERP)" },
    { label: "Scholarship", value: "Jababeka Scholarship — 75% tuition grant for academic merit" },
    {
      label: "Relevant coursework",
      value: "Database Management Systems · Business Process Management · Systems Analysis and Design",
    },
  ],
};
