// ─────────────────────────────────────────────────────────────
// Single source of truth for every piece of copy on the site.
// Facts are drawn from the current CV and the supplied certificate
// evidence. Internal Mattel work is described at a sanitized, high
// level only. Keep it that way when editing.
// ─────────────────────────────────────────────────────────────

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-nizam-zgvx.vercel.app"
).replace(/\/$/, "");

export const profile = {
  name: "Nizamuddin Zahrani",
  legalName: "Nizamuddin Giffa Abdul Aziz Zahrani",
  positioning: ["Business Analyst", "Business Process Improvement", "Strategy & Operations"],
  headline: "Making sense of complex business problems.",
  intro:
    "I bridge business needs and practical solutions through structured analysis, stakeholder collaboration, and process improvement.",
  status:
    "Information Systems undergraduate at President University, currently a People & Culture HR Information Systems Intern at Mattel Indonesia.",
  location: "Cikarang, Indonesia",
  email: "nizamzahrani7@gmail.com",
  linkedin: "https://www.linkedin.com/in/nizamuddin-zahrani",
  linkedinHandle: "in/nizamuddin-zahrani",
  github: "https://github.com/nizam-desain",
  githubHandle: "nizam-desain",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Nizamuddin_Zahrani_CV.pdf",
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

// ── Section headings ─────────────────────────────────────────

export const sections = {
  about: {
    label: "About",
    title: "I start with the business, then the system.",
  },
  experience: {
    label: "Experience",
    title: "Inside a multinational's People & Culture team.",
    intro:
      "An HR Information Systems internship at Mattel Indonesia, and the earlier roles in partnerships, finance, communications and administration that came before it.",
  },
  work: {
    label: "Professional work",
    title: "Three internal initiatives at Mattel Indonesia.",
    intro:
      "Work I contributed to on the functional side during my internship, described at a high level. The diagrams are illustrative: they show the kind of analysis involved, never real screens, data or internal details.",
  },
  projects: {
    label: "Academic and competition projects",
    title: "Selected work from university and competitions.",
    intro: "Coursework, competition proposals and one technical build. These are academic projects, not commercial deployments.",
  },
  skills: {
    label: "Skills",
    title: "What I do, and where I have done it.",
    intro:
      "Each core business-analysis skill is marked against the work where I applied it, so the list can be checked against the case studies.",
  },
  credentials: {
    label: "Certifications and licenses",
    intro: "Open a certificate to view it full screen, zoom in, download the original image or verify it with the issuer.",
  },
  honors: {
    label: "Honors and achievements",
    title: "Recognition from case, pitch and negotiation competitions.",
    intro: "Team awards are credited to the team named on the certificate.",
  },
  education: {
    label: "Education",
  },
  contact: {
    label: "Contact",
    title: "Let's talk about the problem you're solving.",
    intro:
      "I'm open to internship and graduate opportunities in business analysis, strategy and operations, and consulting. Email and LinkedIn are the quickest ways to reach me.",
  },
};

// ── About ────────────────────────────────────────────────────

export const about = {
  lead:
    "I'm drawn to the space between how a business is supposed to work and how it actually works, and to the practical changes that close that gap.",
  paragraphs: [
    "I study Information Systems for Business and Management at President University, with a concentration in Enterprise Resource Planning. That background taught me how processes, data, and systems depend on one another, but what interests me most is the business problem underneath.",
    "At Mattel Indonesia's People & Culture Service Hub, I work on the functional side of internal workflow initiatives: sitting with stakeholders, observing day-to-day operations, mapping how work flows today, and turning what people need into requirements that technical colleagues can evaluate and build against.",
    "I'm building toward a career in business analysis, strategy and operations, and eventually management consulting: roles where structured thinking and clear communication matter as much as the answer.",
  ],
  approachTitle: "How I approach a problem",
  approach: [
    {
      title: "Understand the operation",
      detail: "Start with the people doing the work: what they do, where it slows down, and why.",
    },
    {
      title: "Map the current state",
      detail: "Document the AS-IS workflow, business rules, and constraints before proposing anything.",
    },
    {
      title: "Find the friction",
      detail: "Separate root causes from symptoms, and favor practical fixes over unnecessary complexity.",
    },
    {
      title: "Translate and validate",
      detail: "Turn needs into clear functional requirements, then test the outcome against the agreed rules.",
    },
  ],
  principle: "Understand the problem before designing the solution.",
  facts: [
    { label: "Currently", value: "HR Information Systems Intern, Mattel Indonesia" },
    { label: "Studying", value: "Information Systems for Business and Management, President University" },
    { label: "Scholarship", value: "Jababeka Scholarship, a 75% tuition grant" },
    { label: "Based in", value: "Cikarang, Indonesia" },
  ],
};

// ── Experience ───────────────────────────────────────────────

/** A month as [year, month]. `null` as an end date means "present". */
export type YearMonth = [number, number];

export type ExperienceItem = {
  id: string;
  organization: string;
  unit?: string;
  role: string;
  period: string;
  start: YearMonth;
  end: YearMonth | null;
  location: string;
  summary: string;
  highlights: string[];
  keyResult?: { value: string; label: string };
};

/** The experience chart's axis (inclusive years) and the month "present" refers to. */
export const timeline = {
  startYear: 2024,
  endYear: 2026,
  asOf: [2026, 11] as YearMonth,
};

export const featuredExperience: ExperienceItem & { note: string; highlightsTitle: string; workLink: string } = {
  id: "mattel",
  organization: "Mattel Indonesia",
  unit: "People & Culture (P&C) Service Hub",
  role: "HR Information Systems Intern",
  period: "Sep 2026 – Present",
  start: [2026, 9],
  end: null,
  location: "Indonesia",
  summary:
    "A functional, business-facing internship within the P&C Service Hub. I analyze workflows, requirements, system behavior, and operational constraints, and work alongside the technical colleagues who own implementation.",
  highlightsTitle: "What the role involves",
  highlights: [
    "Analyze business processes and information-system workflows to identify functional improvement opportunities.",
    "Facilitate stakeholder discussions to understand current operations, requirements, and constraints.",
    "Translate business needs into structured functional requirements and process documentation.",
    "Collaborate with technical colleagues to validate solution feasibility and clarify expected system behavior.",
    "Support scenario-based functional testing and validation against agreed business rules.",
    "Communicate findings and proposed improvements to the relevant stakeholders.",
  ],
  note: "This is an internship, not a permanent position. Project details on this site are summarized at a high level and leave out confidential company information.",
  workLink: "See the three case studies from this role",
};

export const otherExperience: ExperienceItem[] = [
  {
    id: "jakarta-mengabdi",
    organization: "Jakarta Mengabdi (Sapa Kampung 2026)",
    role: "Sponsorship PIC",
    period: "Feb 2026 – Present",
    start: [2026, 2],
    end: null,
    location: "Pulau Pramuka and Pulau Tidung",
    summary: "Led sponsorship acquisition for a community development program in the Thousand Islands.",
    keyResult: { value: "IDR 30 million", label: "in sponsorship secured from IKA Universitas Airlangga" },
    highlights: [
      "Secured IDR 30 million in sponsorship from IKA Universitas Airlangga (IKA UNAIR) through partnership development and stakeholder negotiation.",
      "Led the process end to end: market research, proposal development, presentation, negotiation, and partnership execution.",
      "Coordinated committees and external partners so sponsorship deliverables matched how the program ran on the ground.",
    ],
  },
  {
    id: "purd",
    organization: "President University Roblox Developer (PURD)",
    role: "Treasurer & PIC Public Relations",
    period: "Apr 2026 – May 2026",
    start: [2026, 4],
    end: [2026, 5],
    location: "Cikarang",
    summary: "Managed the organization's finances and external communications for its programs.",
    highlights: [
      "Managed budgeting, financial reporting, and operational cash flow.",
      "Prepared financial documentation to support organizational decisions.",
      "Coordinated external communications and partnership activities with internal committees.",
    ],
  },
  {
    id: "pu-content",
    organization: "President University",
    role: "Content Creator Intern",
    period: "Oct 2024 – Jan 2025",
    start: [2024, 10],
    end: [2025, 1],
    location: "Cikarang",
    summary: "Supported institutional communication campaigns involving multiple stakeholders.",
    highlights: [
      "Coordinated publication schedules, cross-functional workflows, and delivery timelines.",
      "Supported the planning and execution of multi-stakeholder communication campaigns.",
    ],
  },
  {
    id: "puskesmas",
    organization: "Puskesmas Manukan Kulon",
    role: "Administrative Intern",
    period: "May 2024 – Jun 2024",
    start: [2024, 5],
    end: [2024, 6],
    location: "Surabaya",
    summary: "Supported daily administrative workflows at a public community health center.",
    highlights: [
      "Managed patient records and administrative data entry in line with accuracy and compliance standards.",
      "Maintained the documentation that supports daily healthcare service workflows.",
    ],
  },
];

// ── Professional case studies (Mattel, sanitized) ────────────

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  organization: string;
  role: string;
  period: string;
  status: string;
  statusTone: "ongoing" | "complete";
  diagram: "process" | "approval" | "requisition";
  diagramCaption: string;
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
    title: "Click2Eat — Food Ordering & Operational Process Improvement",
    shortTitle: "Click2Eat",
    organization: "Mattel Indonesia",
    role: "Functional / Business Analysis Contribution",
    period: "2026 – Present",
    status: "Ongoing",
    statusTone: "ongoing",
    diagram: "process",
    diagramCaption: "How an order moves between the people involved, and where hand-offs are examined for friction.",
    context:
      "An internal food-ordering initiative where the ordering process, order-status updates, and the coordination between administrative and kitchen teams all need to work smoothly together, in practice and not only on paper.",
    objective:
      "Understand how the food-ordering operation really runs day to day, and identify practical improvements to coordination between operations and the supporting information system.",
    responsibilities: [
      "Conduct stakeholder discussions with the people involved in ordering and fulfillment.",
      "Observe administrative and kitchen activities to see how the process works in practice.",
      "Analyze the AS-IS ordering, fulfillment, and order-status workflow end to end.",
      "Support TO-BE workflow design and evaluate operational requirements and constraints.",
      "Work with technical colleagues to assess the feasibility of potential improvements.",
    ],
    approach: [
      "Observation first: watching the real operation before relying on documented procedure.",
      "Mapping each hand-off between ordering, preparation, and status updates to locate friction.",
      "Weighing improvement options by operational fit, favoring practical solutions that avoid unnecessary technical complexity.",
    ],
    deliverables: [
      "AS-IS workflow understanding",
      "Improvement opportunities",
      "TO-BE workflow input",
      "Functional requirements assessment",
    ],
    skills: [
      "Stakeholder interviews",
      "Process observation",
      "AS-IS / TO-BE mapping",
      "Requirements analysis",
      "Cross-functional collaboration",
    ],
    stage:
      "Analysis is ongoing. Recommendations are still under discussion, and nothing described here should be read as an implemented change.",
  },
  {
    slug: "request-approval-workflow",
    title: "Internal Request & Approval Workflow Optimization",
    shortTitle: "Request & Approval Workflow",
    organization: "Mattel Indonesia",
    role: "Functional Analyst Contribution",
    period: "2026",
    status: "Documentation and validation completed",
    statusTone: "complete",
    diagram: "approval",
    diagramCaption: "A request passing review and a rule check, with the exception path that scenario tests also cover.",
    context:
      "An internal request-management workflow in which requests pass through several approval steps. The aim was to make sure the workflow behaved exactly as the business intended, including when things don't go to plan.",
    objective:
      "Evaluate workflow conditions, business rules, and system behavior against the intended business requirements, and support improvement of the workflow.",
    responsibilities: [
      "AS-IS and TO-BE workflow analysis of the request and approval process.",
      "Assessment of the approval flow and clarification of business rules with stakeholders.",
      "Functional requirements analysis and exception-handling review.",
      "Scenario-based functional testing against the agreed business rules.",
      "Process documentation and user guidance, validated with stakeholders.",
    ],
    approach: [
      "Defining the rules first: what should happen, for whom, and under which conditions.",
      "Designing test scenarios around both the expected path and the exceptions.",
      "Comparing actual system behavior with intended behavior, then communicating gaps clearly to stakeholders and the technical team.",
    ],
    deliverables: ["Process maps", "System documentation", "Testing evidence", "User guidance"],
    skills: [
      "Business rules analysis",
      "Functional testing",
      "Exception handling",
      "Process documentation",
      "Stakeholder validation",
    ],
    stage:
      "Functional documentation and validation are complete. Production rollout is outside the scope of this summary.",
  },
  {
    slug: "hr-portal-requisition",
    title: "HR Portal — Requisition Workflow Analysis & Documentation",
    shortTitle: "HR Portal Requisitions",
    organization: "Mattel Indonesia",
    role: "Functional Analysis & Documentation",
    period: "2026",
    status: "Documentation completed",
    statusTone: "complete",
    diagram: "requisition",
    diagramCaption: "Two requisition types following one approval path, written up as guidance for the people who use it.",
    context:
      "Requisition workflows for on-the-job training (OJT) and internship placements within an HR portal, where clear documentation helps requesters and approvers use the process correctly.",
    objective:
      "Build a clear understanding of the requisition and approval workflows, and document them so they are easy for users to follow.",
    responsibilities: [
      "Understand the OJT and internship requisition workflows from the business side.",
      "Analyze the approval process and clarify functional behavior where it was unclear.",
      "Produce user documentation for the requisition process.",
      "Coordinate with business and technical colleagues to confirm details.",
    ],
    approach: [
      "Walking through each requisition type step by step with the relevant stakeholders.",
      "Writing for the end user: plain language, ordered steps, and clear expectations at each stage.",
    ],
    deliverables: ["Workflow understanding", "User documentation", "Functional clarifications"],
    skills: ["Workflow analysis", "User documentation", "Functional clarification", "Cross-functional coordination"],
    stage: "Documentation is complete.",
  },
];

export const workNotes = {
  titleBlock: [
    { label: "Organization", value: "Mattel Indonesia" },
    { label: "Unit", value: "People & Culture Service Hub" },
    { label: "My part", value: "Functional and business analysis" },
    { label: "Diagrams", value: "Illustrative only" },
  ],
  diagramNote: "Illustrative diagram, not a system screenshot.",
  disclaimer:
    "Summarized at a high level for a public portfolio. Confidential details, internal system information and company data are intentionally left out. This is a personal site and is not affiliated with or endorsed by Mattel.",
};

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
    kind: "Competition proposal, AI Open Innovation Challenge 2026",
    role: "Team lead",
    period: "Jan 2026 – May 2026",
    summary:
      "A proposed logistics monitoring concept aimed at improving supply-chain resilience and operational visibility for an e-commerce logistics network.",
    points: [
      "Led the team and designed the business architecture linking SLA-breach prediction, visual hub monitoring, and carbon-aware routing.",
      "Aligned the technical components with operational objectives such as on-time delivery and visibility across hubs.",
      "Prototype-level competition work, not a commercial deployment.",
    ],
    tags: ["Business architecture", "Logistics operations", "SLA prediction concepts", "Operational strategy"],
    link: { label: "Read the proposal (PDF)", href: "/proposal-ai-logistics.pdf" },
  },
  {
    slug: "amartha-proxyscore",
    title: "Amartha ProxyScore",
    kind: "Business proposal, AI-based credit scoring",
    role: "Business Marketing Lead",
    period: "Mar 2025 – Apr 2025",
    summary:
      "A business proposal and pitch for an AI-based credit-scoring framework intended to widen access to credit for unbanked MSMEs.",
    points: [
      "Co-developed the business proposal and pitch deck, and shaped the business narrative.",
      "Analyzed scalability against a market of 50 million entrepreneurs and assessed target users to justify product-market fit.",
    ],
    tags: ["Business analysis", "Market evaluation", "Financial inclusion", "Pitch development"],
  },
  {
    slug: "erp-business-process-analysis",
    title: "ERP Business Process Analysis",
    kind: "Coursework, Enterprise Resource Planning",
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
    kind: "Technical project, Android",
    role: "Full Stack Mobile Developer",
    period: "Oct 2025 – Dec 2025",
    summary:
      "An Android inventory-tracking application with a relational data model and a reporting dashboard to improve inventory visibility.",
    points: [
      "Designed the relational data structure and reporting dashboard.",
      "Built the app and its backend end to end as an academic project.",
    ],
    tags: ["Java", "Android", "PHP", "MySQL"],
  },
];

// ── Skills ───────────────────────────────────────────────────

// Where each core skill was actually applied. A skill is only marked
// against a piece of work when that work's description supports it.
export const evidenceColumns = [
  { key: "click2eat", label: "Click2Eat", short: "Click2Eat" },
  { key: "request-approval-workflow", label: "Request & approval workflow", short: "Request & approval" },
  { key: "hr-portal-requisition", label: "HR Portal requisitions", short: "HR Portal" },
  { key: "academic", label: "Academic projects", short: "Academic" },
] as const;

export type EvidenceKey = (typeof evidenceColumns)[number]["key"];

export const coreSkills: { skill: string; in: EvidenceKey[] }[] = [
  { skill: "Business Process Analysis", in: ["click2eat", "request-approval-workflow", "hr-portal-requisition", "academic"] },
  { skill: "Business Process Improvement", in: ["click2eat", "request-approval-workflow", "academic"] },
  { skill: "Requirements Elicitation", in: ["click2eat", "request-approval-workflow"] },
  { skill: "Functional Analysis", in: ["click2eat", "request-approval-workflow", "hr-portal-requisition"] },
  { skill: "AS-IS / TO-BE Mapping", in: ["click2eat", "request-approval-workflow"] },
  { skill: "Stakeholder Management", in: ["click2eat", "request-approval-workflow", "hr-portal-requisition"] },
  { skill: "Business Rules Analysis", in: ["request-approval-workflow"] },
  { skill: "Functional Testing", in: ["request-approval-workflow"] },
  { skill: "Process Documentation", in: ["request-approval-workflow", "hr-portal-requisition", "academic"] },
  { skill: "Cross-functional Collaboration", in: ["click2eat", "request-approval-workflow", "hr-portal-requisition", "academic"] },
];

export const skillsCopy = {
  matrixTitle: "Business analysis",
  matrixCaption: "Core business-analysis skills and the work each one was applied in",
  legend: "A filled point marks work where I applied the skill. Each column heading leads to that work.",
  applied: "Applied",
  notApplied: "Not applied",
};

export const skillGroups = [
  {
    title: "Business and operations",
    description: "Where analysis meets direction.",
    items: [
      "Strategic Problem Solving",
      "Business Research",
      "Project Coordination",
      "Digital Transformation",
      "Operational Analysis",
      "Business Workflow Optimization",
      "HRIS Workflow Analysis",
    ],
  },
  {
    title: "Tools and methods",
    description: "What I use to analyze and communicate.",
    items: ["Microsoft Excel", "Power BI", "SQL", "Power Automate", "Draw.io", "Figma", "DFD / ERD / Use Case Diagrams"],
  },
  {
    title: "Technical foundation",
    description: "Enough depth to work credibly with technical teams.",
    items: ["Epicor Kinetic", "Odoo", "Accurate", "Python", "Java", "Kotlin", "PHP / Laravel", "AWS"],
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
  /** id of the professional certificate this course belongs to */
  partOf?: string;
  /** A result printed on the certificate, shown with its name. */
  result?: string;
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
// Verification URLs are the ones printed on each certificate; the EF SET
// certificate prints none, so it has no verify link.
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
    note: "Professional certificate awarded for completing the seven Google AI courses shown with it.",
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
    partOf: "google-ai-professional",
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
    partOf: "google-ai-professional",
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
    partOf: "google-ai-professional",
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
    partOf: "google-ai-professional",
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
    partOf: "google-ai-professional",
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
    partOf: "google-ai-professional",
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
    partOf: "google-ai-professional",
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
    name: "EF SET English Certificate",
    issuer: "EF SET",
    category: "Language",
    issued: "Sep 2026",
    result: "C2 Proficient, 78/100",
    note: "An EF SET score of 78 out of 100, which EF SET places at CEFR level C2 Proficient. The test covers reading and listening.",
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
    organizer: "China Association of International Business Negotiation, China",
    date: "Dec 2025",
    scope: "International",
    attribution: "Awarded to Team “Doa Bapak” of President University. I competed as one of its three members.",
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
    attribution:
      "Reached as a member of Team President Consulting. The certificate itself is issued to the team as a certificate of participation.",
    description: "Case analysis and sustainable business-model recommendations, delivered as a team.",
    images: [{ ...cert("award-a4s-semifinalist", 801, 558), caption: "Certificate of participation" }],
  },
  {
    id: "city-u-seattle",
    title: "Certificate of Completion",
    event: "Social Business Pitch Competition",
    organizer: "City University of Seattle",
    date: "Mar 2026",
    scope: "International",
    attribution: "Issued to me individually. This certifies completion, not a placing.",
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
    attribution: "Issued to me individually.",
    description: "Strategic business problem-solving under tight deadlines.",
    images: [{ ...cert("award-bizionary-semifinalist", 801, 569), caption: "Certificate of Achievement" }],
  },
  {
    id: "gold-medal",
    title: "Gold Medal, Biology & Medicine",
    event: "National Science Competition",
    date: "Jan 2024",
    scope: "National",
    attribution: "Individual award. The certificate is not among the documents shown on this site.",
    description: "Recognized for excellence in biological sciences and medical knowledge.",
    images: [],
  },
];

// ── Education ────────────────────────────────────────────────

export const education = {
  school: "President University",
  location: "Cikarang, Indonesia",
  program: "Undergraduate Program in Information Systems for Business and Management",
  period: "Sep 2024 – Present",
  start: [2024, 9] as YearMonth,
  end: null as YearMonth | null,
  details: [
    { label: "Concentration", value: "Enterprise Resource Planning (ERP)" },
    { label: "Scholarship", value: "Jababeka Scholarship, a 75% tuition grant for outstanding academic merit" },
    {
      label: "Relevant coursework",
      value: "Database Management Systems, Business Process Management, Systems Analysis and Design",
    },
  ],
};

// ── Contact ──────────────────────────────────────────────────

export const contact = {
  formTitle: "Send a message",
  footnote:
    "Personal portfolio. Not affiliated with or endorsed by any organization mentioned. Case-study diagrams are illustrative.",
};
