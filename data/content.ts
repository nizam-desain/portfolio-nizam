// ─────────────────────────────────────────────────────────────
// Single source of truth for every piece of copy on the site.
// Facts come from the current CV and the supplied certificate
// evidence. Nothing here is invented: when a value is unknown it is
// left out rather than estimated.
//
// CONFIDENTIALITY: Mattel Indonesia work is described at a sanitised,
// high level. Internal system names, people, rules, screenshots and
// data never appear. Project names below are descriptive, not the
// internal names. Keep it that way when editing.
// ─────────────────────────────────────────────────────────────

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-nizam-zgvx.vercel.app"
).replace(/\/$/, "");

export const profile = {
  name: "Nizam Zahrani",
  fullName: "Nizamuddin Zahrani",
  legalName: "Nizamuddin Giffa Abdul Aziz Zahrani",
  initials: "NZ",
  role: "People & Culture — HR Information Systems Intern",
  roleShort: "HRIS Intern, Mattel Indonesia",
  focus: "Business & functional analysis",
  location: "Cikarang, Indonesia",
  timezone: "Asia/Jakarta",
  email: "nizamzahrani7@gmail.com",
  linkedin: "https://www.linkedin.com/in/nizamuddin-zahrani",
  linkedinHandle: "in/nizamuddin-zahrani",
  github: "https://github.com/nizam-desain",
  githubHandle: "nizam-desain",
  resumeUrl: "/resume.pdf",
  portrait: { src: "/images/portrait.jpg", width: 1638, height: 2048 },
};

export const hero = {
  words: ["Business.", "Systems.", "Perspective."],
  statement:
    "I study how work actually moves through an organisation — the hand-offs, the rules, the places it stalls — and turn what I find into requirements and process changes people can act on.",
};

export const sections = [
  { id: "work", ref: "01", label: "Selected work" },
  { id: "experience", ref: "02", label: "Experience" },
  { id: "about", ref: "03", label: "About" },
  { id: "method", ref: "04", label: "How I work" },
  { id: "capabilities", ref: "05", label: "Capabilities" },
  { id: "recognition", ref: "06", label: "Leadership & recognition" },
  { id: "credentials", ref: "07", label: "Credentials" },
  { id: "contact", ref: "08", label: "Contact" },
] as const;

// ── Work ─────────────────────────────────────────────────────

export type Motif = "lanes" | "gate" | "stepper" | "network" | "funnel" | "modules" | "grid";

export type Work = {
  slug: string;
  index: string;
  title: string;
  /** One line, shown in the index. */
  line: string;
  kind: "Professional" | "Competition" | "Proposal" | "Coursework" | "Technical";
  organization: string;
  role: string;
  period: string;
  status: string;
  /** "confirmed": completed work with confirmed deliverables. "ongoing": analysis in progress. "concept": a proposal, not implemented. */
  evidence: "confirmed" | "ongoing" | "concept";
  motif: Motif;
  context: string;
  problem: string;
  responsibilities: string[];
  approach: string[];
  /** What was actually produced or confirmed. */
  outcomes: string[];
  /** Proposed or open items that are NOT confirmed outcomes. */
  proposed?: string[];
  limitations: string[];
  skills: string[];
  flow?: Flow;
  link?: { label: string; href: string };
  confidential?: boolean;
};

/** A conceptual AS-IS / TO-BE flow. Generic by design: not a system screenshot. */
export type Flow = {
  caption: string;
  lanes: string[];
  steps: { lane: number; label: string; kind?: "step" | "decision" | "doc" | "friction" }[];
};

const sanitised =
  "Internal project at Mattel Indonesia, described at a high level. System names, people, data, business rules and screenshots are intentionally withheld.";

export const work: Work[] = [
  {
    slug: "corporate-food-ordering",
    index: "01",
    title: "Corporate Food Ordering Process",
    line: "Watching an ordering operation run before deciding what to change.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional / business analysis contribution",
    period: "2026 – present",
    status: "Ongoing",
    evidence: "ongoing",
    motif: "lanes",
    context:
      "An internal food-ordering initiative. Ordering, payment, order-status updates and the coordination between administrative and kitchen teams all had to work together — in practice, not only on paper.",
    problem:
      "How does the ordering operation really run day to day, and where could coordination between the people involved and the supporting information system be improved?",
    responsibilities: [
      "Conduct stakeholder discussions with the people involved in ordering and fulfilment.",
      "Observe administrative and kitchen activities to see how the process works in practice.",
      "Analyse the AS-IS ordering, payment and order-status workflow end to end.",
      "Support TO-BE workflow design and evaluate operational requirements and constraints.",
      "Work with technical colleagues to assess the feasibility of potential improvements.",
    ],
    approach: [
      "Observation first — watching the real operation before relying on documented procedure.",
      "Mapping each hand-off between ordering, preparation and status updates to locate friction.",
      "Weighing improvement options by operational fit, favouring practical solutions that avoid unnecessary technical complexity.",
    ],
    outcomes: ["An AS-IS understanding of the ordering and fulfilment workflow, built from interviews and observation."],
    proposed: [
      "Improvement opportunities at the hand-offs between ordering, preparation and status updates.",
      "Input to a TO-BE workflow.",
      "An assessment of functional requirements against operational constraints.",
    ],
    limitations: [
      sanitised,
      "Analysis is ongoing. Recommendations are still under discussion; nothing here should be read as an implemented change.",
    ],
    skills: ["Stakeholder interviews", "Process observation", "AS-IS / TO-BE mapping", "Requirements analysis"],
    flow: {
      caption: "Conceptual service blueprint. Generic roles and steps; friction points are where hand-offs were examined.",
      lanes: ["Requester", "Administration", "Kitchen"],
      steps: [
        { lane: 0, label: "Place order" },
        { lane: 1, label: "Confirm & record", kind: "doc" },
        { lane: 1, label: "Payment", kind: "decision" },
        { lane: 2, label: "Prepare" },
        { lane: 1, label: "Status update", kind: "friction" },
        { lane: 0, label: "Collect" },
      ],
    },
    confidential: true,
  },
  {
    slug: "request-approval-workflow",
    index: "02",
    title: "Internal Request & Approval Workflow",
    line: "Testing whether a workflow behaves the way the business intends — including when it shouldn't.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional analyst contribution",
    period: "2026",
    status: "Documentation & validation completed",
    evidence: "confirmed",
    motif: "gate",
    context:
      "An internal request-management workflow in which requests pass through several approval steps. The aim was to make sure the workflow behaved exactly as the business intended, including the cases that don't go to plan.",
    problem:
      "Do workflow conditions, business rules and system behaviour match the intended business requirements — and where they don't, what exactly differs?",
    responsibilities: [
      "AS-IS and TO-BE analysis of the request and approval process.",
      "Assessment of the approval flow and clarification of business rules with stakeholders.",
      "Functional requirements analysis and exception-handling review.",
      "Scenario-based functional testing against agreed business rules.",
      "Process documentation and user guidance, validated with stakeholders.",
    ],
    approach: [
      "Defining the rules first: what should happen, for whom, and under which conditions.",
      "Designing test scenarios around both the expected path and the exceptions.",
      "Comparing actual behaviour with intended behaviour, then communicating gaps clearly to stakeholders and the technical team.",
    ],
    outcomes: [
      "Process maps of the request and approval workflow.",
      "System documentation and user guidance.",
      "Testing evidence from scenario-based functional validation.",
      "Findings communicated to the relevant stakeholders and technical team.",
    ],
    limitations: [sanitised, "Production rollout is outside the scope of this summary; no performance figures are claimed."],
    skills: ["Business rules analysis", "Functional testing", "Exception handling", "Process documentation", "Stakeholder validation"],
    flow: {
      caption: "Conceptual approval flow with an exception path. Steps are generic; the real rules are not shown.",
      lanes: ["Requester", "Approvers", "Validation"],
      steps: [
        { lane: 0, label: "Submit request" },
        { lane: 1, label: "Review" },
        { lane: 1, label: "Rule check", kind: "decision" },
        { lane: 0, label: "Return / revise", kind: "friction" },
        { lane: 2, label: "Test scenarios", kind: "doc" },
        { lane: 1, label: "Complete" },
      ],
    },
    confidential: true,
  },
  {
    slug: "requisition-workflow-documentation",
    index: "03",
    title: "Requisition Workflow Documentation",
    line: "Writing a process down so the people who use it can follow it without asking.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional analysis & documentation",
    period: "2026",
    status: "Documentation completed",
    evidence: "confirmed",
    motif: "stepper",
    context:
      "Requisition workflows for on-the-job training and internship placements inside an HR self-service portal, where clear documentation helps requesters and approvers use the process correctly.",
    problem:
      "Requesters and approvers needed one clear, correct description of how each requisition type moves from request to approval.",
    responsibilities: [
      "Understand the on-the-job training and internship requisition workflows from the business side.",
      "Analyse the approval process and clarify functional behaviour where it was unclear.",
      "Produce user documentation for the requisition process.",
      "Coordinate with business and technical colleagues to confirm details.",
    ],
    approach: [
      "Walking through each requisition type step by step with the relevant stakeholders.",
      "Writing for the end user — plain language, ordered steps, and clear expectations at each stage.",
    ],
    outcomes: ["User documentation for the requisition process.", "Functional clarifications confirmed with business and technical colleagues."],
    limitations: [sanitised],
    skills: ["Workflow analysis", "User documentation", "Functional clarification", "Cross-functional coordination"],
    flow: {
      caption: "Conceptual requisition path documented for users. Generic stages only.",
      lanes: ["Requester", "Approver", "Guide"],
      steps: [
        { lane: 0, label: "Choose type", kind: "decision" },
        { lane: 0, label: "Complete request" },
        { lane: 1, label: "Approve" },
        { lane: 2, label: "User guide", kind: "doc" },
      ],
    },
    confidential: true,
  },
  {
    slug: "blibli-ai-logistics",
    index: "04",
    title: "Blibli AI Logistics",
    line: "Linking prediction, monitoring and routing to the operational goals they should serve.",
    kind: "Competition",
    organization: "AI Open Innovation Challenge 2026",
    role: "Team lead",
    period: "Jan – May 2026",
    status: "Competition proposal",
    evidence: "concept",
    motif: "network",
    context:
      "A competition brief: improve supply-chain resilience and operational visibility for an e-commerce logistics network.",
    problem:
      "Which combination of capabilities would give operators earlier warning of late deliveries and a clearer view across hubs — and how should they connect?",
    responsibilities: [
      "Led the team through the proposal.",
      "Designed the business architecture linking SLA-breach prediction, visual hub monitoring and carbon-aware routing.",
      "Aligned the technical components with operational objectives such as on-time delivery and visibility across hubs.",
    ],
    approach: [
      "Starting from operational objectives, then choosing capabilities that serve them.",
      "Describing how each component hands information to the next, rather than listing features.",
    ],
    outcomes: ["A written competition proposal with a business architecture."],
    limitations: ["Prototype-level academic and competition work — not a commercial deployment."],
    skills: ["Business architecture", "Logistics operations", "SLA concepts", "Operational strategy"],
    link: { label: "Read the proposal (PDF)", href: "/proposal-ai-logistics.pdf" },
  },
  {
    slug: "amartha-proxyscore",
    index: "05",
    title: "Amartha ProxyScore",
    line: "A business case for widening credit access to unbanked micro-businesses.",
    kind: "Proposal",
    organization: "Business proposal",
    role: "Business marketing lead",
    period: "Mar – Apr 2025",
    status: "Pitch & proposal",
    evidence: "concept",
    motif: "funnel",
    context: "A business proposal and pitch for an AI-based credit-scoring framework aimed at unbanked MSMEs.",
    problem: "Is there a credible product–market fit, and how should the case be told to the people who would fund it?",
    responsibilities: [
      "Co-developed the business proposal and pitch deck.",
      "Formulated the business narrative.",
      "Analysed scalability against a market of 50 million entrepreneurs and assessed target users.",
    ],
    approach: ["Sizing the opportunity before describing the product.", "Shaping the narrative around the user, not the model."],
    outcomes: ["A business proposal and pitch deck."],
    limitations: ["A proposal; the framework was not built or deployed."],
    skills: ["Business analysis", "Market evaluation", "Financial inclusion", "Pitch development"],
  },
  {
    slug: "erp-business-process-analysis",
    index: "06",
    title: "ERP Business Process Analysis",
    line: "Procurement to manufacturing, traced across three ERP environments.",
    kind: "Coursework",
    organization: "President University · ERP concentration",
    role: "Analyst",
    period: "May – Jun 2026",
    status: "Coursework",
    evidence: "confirmed",
    motif: "modules",
    context:
      "Coursework covering end-to-end processes across procurement, inventory, supplier management and manufacturing in Epicor Kinetic, Odoo and Accurate.",
    problem: "How do these processes cross module boundaries, and where do they lose efficiency?",
    responsibilities: [
      "Mapped cross-module workflows and integration requirements.",
      "Identified operational inefficiencies and proposed improvements aligned with ERP best practice.",
    ],
    approach: ["Following one business transaction through every module it touches."],
    outcomes: ["Process documentation across three ERP environments."],
    proposed: ["Improvements aligned with ERP best practice (coursework recommendations)."],
    limitations: ["Academic simulation environments, not a live company system."],
    skills: ["Process mapping", "Cross-functional processes", "Epicor Kinetic", "Odoo", "Accurate"],
    link: { label: "Epicor documentation (PDF)", href: "/images/laporan-epicor.pdf" },
  },
  {
    slug: "mobile-inventory",
    index: "07",
    title: "Mobile Inventory & Asset Management",
    line: "A supporting technical project: data model first, screens second.",
    kind: "Technical",
    organization: "Academic project",
    role: "Full-stack mobile developer",
    period: "Oct – Dec 2025",
    status: "Academic build",
    evidence: "confirmed",
    motif: "grid",
    context: "An Android application for tracking inventory, built as an academic project to improve inventory visibility.",
    problem: "What structure does the data need so that the reporting people want is straightforward to produce?",
    responsibilities: ["Designed the relational data structure and reporting dashboard.", "Built the app and its backend end to end."],
    approach: ["Designing the relational model around the reports it had to support."],
    outcomes: ["A working academic Android application with a reporting dashboard."],
    limitations: ["Academic project, not deployed in an organisation."],
    skills: ["Java", "Android", "PHP", "MySQL"],
  },
];

// ── Experience ───────────────────────────────────────────────

export type Role = {
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

export const mattel: Role & { practice: { label: string; text: string }[] } = {
  id: "mattel",
  organization: "Mattel Indonesia",
  unit: "People & Culture (P&C) Service Hub",
  role: "People & Culture — HR Information Systems Intern",
  period: "Sep 2026 – present",
  location: "Indonesia",
  summary:
    "A functional, business-facing role. I analyse workflows, requirements, system behaviour and operational constraints, and work alongside the technical colleagues who own implementation.",
  highlights: [
    "Analyse business processes and information-system workflows to identify functional improvement opportunities.",
    "Facilitate stakeholder discussions to understand current operations, requirements and constraints.",
    "Translate business needs into structured functional requirements and process documentation.",
    "Collaborate with technical colleagues to validate solution feasibility and clarify expected system behaviour.",
    "Support scenario-based functional testing and validation against agreed business rules.",
    "Communicate findings and proposed improvements to relevant stakeholders.",
  ],
  practice: [
    { label: "Process analysis", text: "AS-IS and TO-BE workflows, hand-offs, exceptions." },
    { label: "Requirements", text: "Business needs written so they can be built and tested." },
    { label: "Validation", text: "Scenario-based functional testing against agreed rules." },
    { label: "Documentation", text: "Process maps, system documentation, user guidance." },
  ],
};

export const earlierRoles: Role[] = [
  {
    id: "pu-content",
    organization: "President University",
    role: "Content Creator Intern",
    period: "Oct 2024 – Jan 2025",
    location: "Cikarang",
    summary: "Supported institutional communication campaigns involving multiple stakeholders.",
    highlights: [
      "Coordinated publication schedules, cross-functional workflows and delivery timelines.",
      "Supported planning and execution of multi-stakeholder communication campaigns.",
    ],
  },
  {
    id: "puskesmas",
    organization: "Puskesmas Manukan Kulon",
    role: "Administrative Intern",
    period: "May – Jun 2024",
    location: "Surabaya",
    summary: "Supported daily administrative workflows at a public community health centre.",
    highlights: [
      "Managed patient records and administrative data entry in line with accuracy and compliance standards.",
      "Maintained documentation supporting daily healthcare service workflows.",
    ],
  },
];

export const leadership: Role[] = [
  {
    id: "jakarta-mengabdi",
    organization: "Jakarta Mengabdi — Sapa Kampung 2026",
    role: "Sponsorship PIC",
    period: "Feb 2026 – present",
    location: "Pulau Pramuka & Pulau Tidung",
    summary: "Led sponsorship acquisition for a community development programme in the Thousand Islands.",
    keyResult: { value: "IDR 30M", label: "sponsorship secured from IKA Universitas Airlangga" },
    highlights: [
      "Secured IDR 30 million in sponsorship from IKA Universitas Airlangga (IKA UNAIR) through partnership development and negotiation.",
      "Owned the process end to end — research, proposal, presentation, negotiation and partnership execution.",
      "Coordinated committees and external partners so sponsorship deliverables matched programme operations.",
    ],
  },
  {
    id: "purd",
    organization: "President University Roblox Developer (PURD)",
    role: "Treasurer & PIC Public Relations",
    period: "Apr – May 2026",
    location: "Cikarang",
    summary: "Managed the organisation's finances and external communications for its programmes.",
    highlights: [
      "Managed budgeting, financial reporting and operational cash flow.",
      "Prepared financial documentation to support organisational decisions.",
      "Coordinated external communications and partnership activities with internal committees.",
    ],
  },
];

// ── About ────────────────────────────────────────────────────

export const about = {
  lead: "I'm interested in the distance between how a process is supposed to work and how it actually works.",
  paragraphs: [
    "Most of what I've learned about that distance came from watching it. At Mattel Indonesia's People & Culture Service Hub I sit with the people who run a process, follow a request from start to finish, and write down what actually happens, not only what the procedure says.",
    "My degree is in Information Systems for Business and Management, with a concentration in ERP. It taught me how processes, data and systems depend on one another. What keeps me interested is the business question underneath: who needs what, under which rules, and what it costs when the hand-off fails.",
    "I'm early in my career and I'm building toward business analysis, strategy and operations, and eventually management consulting — work where structured thinking and clear communication matter as much as the answer.",
  ],
  principle: "Understand the problem before designing the solution.",
  facts: [
    { label: "Currently", value: "HRIS Intern, People & Culture, Mattel Indonesia" },
    { label: "Studying", value: "Information Systems for Business & Management, President University" },
    { label: "Concentration", value: "Enterprise Resource Planning" },
    { label: "Scholarship", value: "Jababeka Scholarship — 75% tuition grant" },
    { label: "Based in", value: "Cikarang, Indonesia" },
  ],
};

// ── Method ───────────────────────────────────────────────────

export const method = [
  {
    n: "01",
    title: "Understand the business",
    body: "What is this process for, who depends on it, and what does a good outcome look like to them? I start here so the analysis answers a business question, not a system one.",
    artefact: "Context & objectives",
  },
  {
    n: "02",
    title: "Investigate the current process",
    body: "Interviews, then observation. I follow real requests through the real operation and map the AS-IS as it is, not as the procedure describes it.",
    artefact: "AS-IS map",
  },
  {
    n: "03",
    title: "Identify gaps and requirements",
    body: "Separate root causes from symptoms. Where the process and the intended rules diverge, I write the requirement that would close the gap, in language both sides can check.",
    artefact: "Gap list & functional requirements",
  },
  {
    n: "04",
    title: "Design practical improvements",
    body: "Options are weighed by operational fit. I favour the change people will actually adopt over the one that only looks complete on a diagram.",
    artefact: "TO-BE direction",
  },
  {
    n: "05",
    title: "Validate with stakeholders",
    body: "Walk the proposal back through the people who do the work and the people who build it. Disagreement here is cheap; after build, it isn't.",
    artefact: "Agreed rules",
  },
  {
    n: "06",
    title: "Support implementation and testing",
    body: "Scenario-based tests against the agreed rules — the expected path and the exceptions — plus documentation so the process can be used without me in the room.",
    artefact: "Test evidence & user guidance",
  },
];

// ── Capabilities ─────────────────────────────────────────────

export const capabilities = [
  {
    title: "Business & Process Analysis",
    body: "Mapping AS-IS and TO-BE workflows, hand-offs and exceptions from interviews and direct observation.",
    items: ["Business process analysis", "AS-IS / TO-BE mapping", "Process observation", "Workflow optimisation"],
    evidence: ["corporate-food-ordering", "erp-business-process-analysis"],
  },
  {
    title: "Strategy & Problem Solving",
    body: "Structuring an ambiguous brief into a question, then into options that can be compared on their merits.",
    items: ["Strategic problem solving", "Business research", "Market evaluation", "Case competitions"],
    evidence: ["blibli-ai-logistics", "amartha-proxyscore"],
  },
  {
    title: "Functional Requirements",
    body: "Turning what people need into requirements that technical colleagues can evaluate, build against and test.",
    items: ["Requirements elicitation", "Functional analysis", "Business rules analysis", "Use case, DFD & ERD diagrams"],
    evidence: ["request-approval-workflow"],
  },
  {
    title: "Stakeholder Collaboration",
    body: "Running the conversations a process change depends on, and carrying findings between business and technical teams.",
    items: ["Stakeholder management", "Facilitation", "Cross-functional collaboration", "Negotiation"],
    evidence: ["corporate-food-ordering", "requisition-workflow-documentation"],
  },
  {
    title: "Data & Decision Support",
    body: "Enough analysis and modelling to ground a recommendation in what the data shows.",
    items: ["Microsoft Excel", "Power BI", "SQL", "Relational data modelling"],
    evidence: ["mobile-inventory"],
  },
  {
    title: "Functional Testing & Validation",
    body: "Designing scenarios around the expected path and the exceptions, and recording evidence against agreed rules.",
    items: ["Scenario-based functional testing", "Exception handling", "Test evidence"],
    evidence: ["request-approval-workflow"],
  },
  {
    title: "Systems & Digital Transformation",
    body: "A working knowledge of enterprise systems, so conversations with technical teams start from shared ground.",
    items: ["HRIS workflows", "Epicor Kinetic", "Odoo", "Accurate", "Power Automate"],
    evidence: ["erp-business-process-analysis"],
  },
];

/** Supporting technical knowledge — listed, not ranked. */
export const toolkit = ["Draw.io", "Figma", "Python", "Java", "Kotlin", "PHP / Laravel", "AWS"];

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

// ── Recognition ──────────────────────────────────────────────

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
