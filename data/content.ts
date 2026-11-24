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
  focus: "Business · People · Technology · Design",
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
  lines: ["Think strategically.", "Build intelligently.", "Create"],
  accent: "differently.",
  statement:
    "I'm Nizam — an Information Systems student and HRIS intern at Mattel Indonesia. I work where business, people, technology and design meet: understanding how an organisation really runs, then shaping something clearer for the people in it.",
  disciplines: ["Business analysis", "People & Culture", "Digital product & UI", "Strategy"],
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

export type Motif = "lanes" | "gate" | "stepper" | "trace" | "network" | "funnel" | "modules" | "grid";

/** Keys of the purpose-built case-study visuals in components/work/visuals. */
export type VisualKey =
  | "food-hub"
  | "food-gaps"
  | "food-lifecycle"
  | "food-compare"
  | "food-tests"
  | "gtr-asis"
  | "gtr-tobe"
  | "gtr-rejections"
  | "gtr-pains"
  | "ojt-shift"
  | "ojt-journey"
  | "ojt-stages"
  | "ojt-manual"
  | "leave-trace"
  | "leave-paths"
  | "leave-evidence";

export type Work = {
  slug: string;
  index: string;
  title: string;
  /** One line, shown in the index and under the title. */
  line: string;
  kind: "Professional" | "Competition" | "Proposal" | "Coursework" | "Technical";
  organization: string;
  role: string;
  period: string;
  status: string;
  /** "confirmed": completed, with confirmed deliverables. "ongoing": in progress. "concept": a proposal, not implemented. */
  evidence: "confirmed" | "ongoing" | "concept";
  motif: Motif;
  /** Real figures only, taken from the project documents. */
  facts: { value: string; label: string }[];
  /** Visual-first story: one short sentence + one visual per chapter. */
  chapters?: { title: string; text: string; visual: VisualKey }[];
  /** Used when a project has no chapters (academic work). */
  did?: string[];
  outcomes: string[];
  proposed?: string[];
  limits: string;
  skills: string[];
  link?: { label: string; href: string };
  confidential?: boolean;
  /** Original artwork (3D renders and conceptual mockups made for this site). */
  cover: string;
  tint: "peach" | "lav" | "sage" | "mist";
  gallery?: { src: string; w: number; h: number; alt: string; caption: string; kind: "Original artwork" | "Conceptual mockup" }[];
  compare?: { before: string; after: string; beforeLabel: string; afterLabel: string };
  insight?: string;
};

const art = (n: string) => `/art/${n}.jpg`;

export const work: Work[] = [
  {
    slug: "corporate-food-ordering",
    index: "01",
    title: "Multi‑Vendor Food Ordering",
    line: "A canteen ordering app with payment gaps, rebuilt into one platform for several outlets.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional analyst",
    period: "Oct – Nov 2026",
    status: "Tested · not yet deployed",
    evidence: "confirmed",
    motif: "lanes",
    facts: [
      { value: "43/43", label: "agreed functional tests passed" },
      { value: "3", label: "AS-IS gaps reproduced in testing" },
      { value: "3", label: "role-based interfaces specified" },
      { value: "0", label: "code changes needed to add a vendor" },
    ],
    chapters: [
      {
        title: "Three gaps behind one complaint",
        text: "I separated the payment problem into distinct events, then reproduced each gap in AS-IS tests.",
        visual: "food-gaps",
      },
      {
        title: "One application, three interfaces",
        text: "The TO-BE serves customers, vendor kitchens and administrators from one configurable platform.",
        visual: "food-hub",
      },
      {
        title: "An order lifecycle with clear exits",
        text: "Every order now ends in a known state — including cancelled and expired ones, which are kept, not deleted.",
        visual: "food-lifecycle",
      },
      {
        title: "Before and after",
        text: "Six areas changed between the AS-IS and the tested TO-BE.",
        visual: "food-compare",
      },
      {
        title: "Tested against agreed rules",
        text: "Each requirement was traced to a functional test and checked with evidence.",
        visual: "food-tests",
      },
    ],
    cover: art("food-cover"),
    tint: "peach",
    gallery: [
      { src: art("food-suite"), w: 2400, h: 1500, alt: "Conceptual laptop and phone showing a vendor admin screen and a customer ordering app", caption: "Administrator and customer views, side by side", kind: "Conceptual mockup" },
      { src: art("mock-food-customer"), w: 780, h: 1688, alt: "Conceptual customer ordering screen with outlets, daily subsidy and an 'I have paid' button", caption: "Customer: order, pay, say 'I have paid'", kind: "Conceptual mockup" },
      { src: art("mock-food-vendor"), w: 2560, h: 1280, alt: "Conceptual vendor board with columns for verify payment, preparing, ready and completed", caption: "Vendor kitchen: verify payment before preparing", kind: "Conceptual mockup" },
    ],
    insight: "The complaint was 'payments are wrong'. The cause was three different events treated as one.",
    outcomes: [
      "AS-IS analysis with three gaps reproduced",
      "Functional specification for three interfaces",
      "Business rules confirmed by the business owner",
      "43 of 43 functional tests passed",
    ],
    proposed: ["Production deployment (owned by the development team)", "Outlet staff onboarding before go-live"],
    limits:
      "Tested in a local development environment. Payment is checked manually by vendors; there is no automatic bank settlement.",
    skills: ["Process analysis", "Requirements", "Business rules", "Functional testing", "Stakeholder validation"],
    confidential: true,
  },
  {
    slug: "request-approval-workflow",
    index: "02",
    title: "Item‑Level Approval Workflow",
    line: "From one decision per request to approvals routed item by item.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional analyst",
    period: "Sep – Nov 2026",
    status: "Documented & developer-tested",
    evidence: "confirmed",
    motif: "gate",
    facts: [
      { value: "10", label: "pain points confirmed with the owner" },
      { value: "15", label: "use cases modelled" },
      { value: "5", label: "approval scenarios tested" },
      { value: "4", label: "models: swimlane, use case, DFD, ERD" },
    ],
    chapters: [
      {
        title: "AS-IS: every reviewer decides everything",
        text: "Three reviewers in sequence, each approving or rejecting the whole request. One rejection ends it.",
        visual: "gtr-asis",
      },
      {
        title: "Ten pain points, confirmed",
        text: "Problems were listed before solutions and confirmed with the document owner.",
        visual: "gtr-pains",
      },
      {
        title: "TO-BE: route by item tier",
        text: "After a first review, the system sends each item to the approver who owns its tier.",
        visual: "gtr-tobe",
      },
      {
        title: "Two kinds of rejection",
        text: "A rejection can now stop the request, or remove only the items it applies to.",
        visual: "gtr-rejections",
      },
    ],
    cover: art("approval-cover"),
    tint: "lav",
    gallery: [
      { src: art("approval-mail"), w: 2000, h: 1500, alt: "Conceptual tablet showing an approval request with item tiers", caption: "Each approver sees only the items they own", kind: "Conceptual mockup" },
      { src: art("mock-approval-mail"), w: 1800, h: 2200, alt: "Conceptual approval message listing high-value and standard items with different actions", caption: "Standard items: decide. High-value items: view only, pending Director.", kind: "Conceptual mockup" },
    ],
    insight: "The fix wasn't more approvers. It was letting each approver decide only what they own.",
    outcomes: [
      "Business process & system documentation",
      "AS-IS and TO-BE swimlanes, use cases, DFD and ERD",
      "Five approval scenarios verified in developer testing",
      "Director-level AS-IS vs TO-BE presentation",
    ],
    proposed: ["User acceptance testing"],
    limits: "Developer testing only, not UAT. Item tiers and roles are shown generically.",
    skills: ["AS-IS / TO-BE", "Business rules", "Use case & DFD", "ERD", "Scenario testing"],
    confidential: true,
  },
  {
    slug: "requisition-workflow-documentation",
    index: "03",
    title: "Training Requisition: Paper to Digital",
    line: "A paper form passed around for signatures, replaced by one online flow — and a manual people can follow.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional analysis & user documentation",
    period: "Oct 2026",
    status: "User manual v1.2 completed",
    evidence: "confirmed",
    motif: "stepper",
    facts: [
      { value: "5", label: "approval stages documented" },
      { value: "10", label: "how-to sections" },
      { value: "8", label: "troubleshooting topics" },
      { value: "1", label: "form instead of a paper chain" },
    ],
    chapters: [
      {
        title: "From paper chain to online flow",
        text: "Requests used to travel on paper for signatures. Now they are submitted once and tracked online.",
        visual: "ojt-shift",
      },
      {
        title: "The requester's journey",
        text: "Six steps, written in the order a requester actually meets them.",
        visual: "ojt-journey",
      },
      {
        title: "Five approval stages",
        text: "Each approver is notified by e-mail; the requester sees the current stage at any time.",
        visual: "ojt-stages",
      },
      {
        title: "A manual built around questions",
        text: "How-to sections for the happy path, troubleshooting for everything else.",
        visual: "ojt-manual",
      },
    ],
    cover: art("paper-cover"),
    tint: "sage",
    gallery: [
      { src: art("paper-after"), w: 2000, h: 1400, alt: "Conceptual tablet with a digital requisition form and approval tracker", caption: "One form, one tracker", kind: "Conceptual mockup" },
    ],
    compare: { before: art("paper-before"), after: art("mock-req-form"), beforeLabel: "Paper, signed desk to desk", afterLabel: "Online form with live tracking" },
    insight: "A good manual is written in the order people meet the screen — not the order the system was built.",
    outcomes: ["User manual v1.2 for the training requisition", "Functional clarifications confirmed with business and technical colleagues"],
    limits: "Screens and system addresses from the manual are not reproduced here.",
    skills: ["Workflow analysis", "User documentation", "Functional clarification"],
    confidential: true,
  },
  {
    slug: "leave-management-assessment",
    index: "04",
    title: "Leave Module: AS‑IS Baseline",
    line: "Establishing what a leave system actually does before anyone proposes a change.",
    kind: "Professional",
    organization: "Mattel Indonesia",
    role: "Functional analyst",
    period: "Nov 2026",
    status: "Baseline delivered for technical review",
    evidence: "confirmed",
    motif: "trace",
    facts: [
      { value: "7", label: "process paths traced end to end" },
      { value: "20", label: "evidence extracts" },
      { value: "13", label: "questions for technical review" },
      { value: "0", label: "changes made — read-only" },
    ],
    chapters: [
      {
        title: "Trace every action to its data",
        text: "Each user action was followed from the screen, through the logic, to what gets written.",
        visual: "leave-trace",
      },
      {
        title: "Seven paths a request can take",
        text: "Submission, approvals at one and two levels, administrative approval, rejection, cancellation and deletion.",
        visual: "leave-paths",
      },
      {
        title: "Label what is known",
        text: "Every observation carries a label, so confirmed behaviour is never confused with a suspected gap.",
        visual: "leave-evidence",
      },
    ],
    cover: art("research-cover"),
    tint: "mist",
    gallery: [
      { src: art("mock-evidence-log"), w: 2560, h: 1640, alt: "Conceptual analysis workbook listing example analysis steps, where each piece of evidence comes from, and the label applied", caption: "Every observation carries a label — example entries, no real findings", kind: "Conceptual mockup" },
      { src: art("arches"), w: 2400, h: 1300, alt: "Abstract render of a row of arches in warm light", caption: "Structure first: what the system really does", kind: "Original artwork" },
    ],
    insight: "Before anyone fixes a system, someone has to agree on what it actually does today.",
    outcomes: ["AS-IS process & functional documentation", "Balance-change matrix per action", "Prioritised questions for technical review"],
    proposed: ["Business-rule decisions by the HR owner", "Any TO-BE design (out of scope)"],
    limits:
      "Testing environment only, read-only queries, no runtime tests. Specific findings stay internal.",
    skills: ["AS-IS analysis", "Evidence traceability", "Data investigation", "Functional documentation"],
    confidential: true,
  },
  {
    slug: "blibli-ai-logistics",
    index: "05",
    title: "Blibli AI Logistics",
    line: "Linking prediction, monitoring and routing to the operational goals they should serve.",
    kind: "Competition",
    organization: "AI Open Innovation Challenge 2026",
    role: "Team lead",
    period: "Jan – May 2026",
    status: "Competition proposal",
    evidence: "concept",
    motif: "network",
    facts: [
      { value: "3", label: "capabilities linked: prediction, monitoring, routing" },
      { value: "18", label: "page proposal" },
    ],
    did: [
      "Led the team through the proposal.",
      "Designed the business architecture linking SLA-breach prediction, hub monitoring and carbon-aware routing.",
    ],
    outcomes: ["A written competition proposal with a business architecture"],
    limits: "Prototype-level competition work — not a commercial deployment.",
    skills: ["Business architecture", "Logistics operations", "Operational strategy"],
    link: { label: "Read the proposal (PDF)", href: "/proposal-ai-logistics.pdf" },
    cover: art("logistics-cover"),
    tint: "mist",
  },
  {
    slug: "amartha-proxyscore",
    index: "06",
    title: "Amartha ProxyScore",
    line: "A business case for widening credit access to unbanked micro-businesses.",
    kind: "Proposal",
    organization: "Business proposal",
    role: "Business marketing lead",
    period: "Mar – Apr 2025",
    status: "Pitch & proposal",
    evidence: "concept",
    motif: "funnel",
    facts: [{ value: "50M", label: "entrepreneurs in the market analysed" }],
    did: ["Co-developed the business proposal and pitch deck.", "Analysed scalability and target users to justify product–market fit."],
    outcomes: ["A business proposal and pitch deck"],
    limits: "A proposal; the framework was not built or deployed.",
    skills: ["Business analysis", "Market evaluation", "Pitch development"],
    cover: art("credit-cover"),
    tint: "peach",
  },
  {
    slug: "erp-business-process-analysis",
    index: "07",
    title: "ERP Business Process Analysis",
    line: "Procurement to manufacturing, traced across three ERP environments.",
    kind: "Coursework",
    organization: "President University · ERP concentration",
    role: "Analyst",
    period: "May – Jun 2026",
    status: "Coursework",
    evidence: "confirmed",
    motif: "modules",
    facts: [
      { value: "3", label: "ERP environments" },
      { value: "4", label: "process areas" },
    ],
    did: ["Mapped cross-module workflows in Epicor Kinetic, Odoo and Accurate.", "Identified inefficiencies and proposed improvements."],
    outcomes: ["Process documentation across three ERP environments"],
    limits: "Academic simulation environments, not a live company system.",
    skills: ["Process mapping", "Epicor Kinetic", "Odoo", "Accurate"],
    link: { label: "Epicor documentation (PDF)", href: "/images/laporan-epicor.pdf" },
    cover: art("erp-cover"),
    tint: "sage",
  },
  {
    slug: "mobile-inventory",
    index: "08",
    title: "Mobile Inventory & Asset Management",
    line: "A supporting technical project: data model first, screens second.",
    kind: "Technical",
    organization: "Academic project",
    role: "Full-stack mobile developer",
    period: "Oct – Dec 2025",
    status: "Academic build",
    evidence: "confirmed",
    motif: "grid",
    facts: [{ value: "1", label: "Android app with reporting dashboard" }],
    did: ["Designed the relational data structure and reporting dashboard.", "Built the app and its backend end to end."],
    outcomes: ["A working academic Android application"],
    limits: "Academic project, not deployed in an organisation.",
    skills: ["Java", "Android", "PHP", "MySQL"],
    cover: art("inventory-cover"),
    tint: "lav",
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
    "A business-facing functional role, working alongside the technical colleagues who own implementation.",
  highlights: [
    "Map how business processes and system workflows really run.",
    "Run stakeholder discussions on operations, needs and constraints.",
    "Write functional requirements and process documentation.",
    "Validate feasibility and expected behaviour with technical colleagues.",
    "Test scenarios against agreed business rules.",
    "Report findings and proposed improvements.",
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
    "At Mattel Indonesia's People & Culture Service Hub I sit with the people who run a process, follow a request from start to finish, and write down what actually happens.",
    "My degree is in Information Systems for Business and Management, with an ERP concentration. I'm early in my career and building toward business analysis, strategy and operations, and management consulting.",
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
    body: "Who depends on this process, and what does a good outcome look like to them?",
    artefact: "Context & objectives",
  },
  {
    n: "02",
    title: "Investigate the current process",
    body: "Interviews, then observation — mapping the AS-IS as it is, not as the procedure says.",
    artefact: "AS-IS map",
  },
  {
    n: "03",
    title: "Identify gaps and requirements",
    body: "Separate causes from symptoms, and write requirements both sides can check.",
    artefact: "Gap list & functional requirements",
  },
  {
    n: "04",
    title: "Design practical improvements",
    body: "Favour the change people will actually adopt.",
    artefact: "TO-BE direction",
  },
  {
    n: "05",
    title: "Validate with stakeholders",
    body: "Walk it back through the people who do the work and the people who build it.",
    artefact: "Agreed rules",
  },
  {
    n: "06",
    title: "Support implementation and testing",
    body: "Test the expected path and the exceptions, then document it for users.",
    artefact: "Test evidence & user guidance",
  },
];

// ── Capabilities ─────────────────────────────────────────────

export type Basis = "Professional" | "Certified" | "Academic" | "Leadership" | "Practice";

export const capabilities = [
  {
    title: "Business & Strategy",
    tone: "mist" as const,
    body: "Process analysis, requirements and testing in a real organisation, plus strategy work sharpened in case competitions.",
    items: [
      { t: "Business process analysis (AS-IS / TO-BE)", b: "Professional" as Basis },
      { t: "Functional requirements & business rules", b: "Professional" as Basis },
      { t: "Scenario-based functional testing", b: "Professional" as Basis },
      { t: "Case analysis & business proposals", b: "Academic" as Basis },
    ],
    evidence: ["corporate-food-ordering", "request-approval-workflow"],
  },
  {
    title: "People & Organisation",
    tone: "peach" as const,
    body: "HR information systems at work, HR management and recruitment studied formally, and teams led outside the classroom.",
    items: [
      { t: "HR information systems & P&C workflows", b: "Professional" as Basis },
      { t: "Human resource management (Saylor BUS301)", b: "Certified" as Basis },
      { t: "Recruitment & selection (The Open University)", b: "Certified" as Basis },
      { t: "Sponsorship, budgeting & team coordination", b: "Leadership" as Basis },
    ],
    evidence: ["requisition-workflow-documentation", "leave-management-assessment"],
  },
  {
    title: "Technology & Systems",
    tone: "lav" as const,
    body: "Enough technical depth to work credibly with developers — ERP, data and the fundamentals of building software.",
    items: [
      { t: "ERP: Epicor Kinetic, Odoo, Accurate", b: "Academic" as Basis },
      { t: "Excel, Power BI, SQL, Power Automate", b: "Practice" as Basis },
      { t: "Cloud & generative AI fundamentals (AWS, Google)", b: "Certified" as Basis },
      { t: "Python, Java, Kotlin, PHP / Laravel", b: "Academic" as Basis },
    ],
    evidence: ["erp-business-process-analysis", "mobile-inventory"],
  },
  {
    title: "Design & Creative Technology",
    tone: "sage" as const,
    body: "Interfaces, visual communication and the web — explored through coursework, content work and personal projects like this site.",
    items: [
      { t: "UI & prototyping in Figma", b: "Practice" as Basis },
      { t: "Web fundamentals: HTML, CSS, JavaScript", b: "Certified" as Basis },
      { t: "Visual communication & content creation", b: "Professional" as Basis },
      { t: "Digital product thinking", b: "Practice" as Basis },
    ],
    evidence: ["corporate-food-ordering", "blibli-ai-logistics"],
  },
];

/** Supporting technical knowledge — listed, not ranked. */
export const toolkit = ["Draw.io", "Figma", "Python", "Java", "Kotlin", "PHP / Laravel", "AWS"];

// ── Certifications ───────────────────────────────────────────

export type CertCategory = "Human Resources" | "AI & Data" | "Technology & Development" | "Business & Finance" | "Language";

export type Certificate = {
  id: string;
  name: string;
  issuer: "Saylor University" | "The Open University" | "Google" | "Dicoding Indonesia" | "EF SET";
  platform?: string;
  category: CertCategory;
  issued: string;
  /** ISO year-month used for chronological sorting. */
  sort: string;
  type?: string;
  courseCode?: string;
  score?: string;
  hours?: string;
  topics?: string[];
  /** Label for verifyUrl when it is not a credential check (e.g. a course page). */
  linkLabel?: string;
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

// 18 unique credentials (16 earlier + 2 added Nov 2026). Duplicate copies in the source PDF (Google AI
// Professional Certificate, AI for App Building, Belajar Dasar
// Pengembangan Aplikasi Mobile) were removed by credential ID.
// Verification URLs are the ones printed on each certificate.
export const certificates: Certificate[] = [
  {
    id: "saylor-bus301",
    name: "BUS301: Human Resource Management",
    issuer: "Saylor University",
    type: "Certificate of Achievement",
    category: "Human Resources",
    issued: "Nov 2026",
    sort: "2026-11-09",
    courseCode: "BUS301",
    credentialId: "3274926057NZ",
    score: "88% final exam",
    hours: "24 hours",
    verifyUrl: "https://learn.saylor.org/admin/tool/certificate/index.php?code=3274926057NZ",
    topics: ["Human resource management", "Talent management", "People management", "Organisational management", "HR development"],
    note: "Certificate of Achievement, final examination score 88%.",
    image: cert("saylor-bus301-human-resource-management", 1648, 1276),
  },
  {
    id: "open-university-recruitment",
    name: "Human Resources: Recruitment and Selection",
    issuer: "The Open University",
    platform: "OpenLearn",
    type: "Statement of Participation",
    category: "Human Resources",
    issued: "Nov 2026",
    sort: "2026-11-09",
    courseCode: "B615_1",
    hours: "12 hours",
    verifyUrl: "https://www.open.edu/openlearn/money-business/human-resources/human-resources-recruitment-and-selection/content-section-0",
    linkLabel: "Course page",
    topics: ["Recruitment and selection", "Talent acquisition", "Job descriptions", "Candidate assessment"],
    note: "Free course completed including all mandatory tests.",
    image: cert("open-university-recruitment-and-selection", 1241, 1754),
  },
  {
    id: "google-ai-professional",
    name: "Google AI Professional Certificate",
    issuer: "Google",
    platform: "Coursera",
    category: "AI & Data",
    issued: "Jun 2026",
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-06",
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
    sort: "2026-01",
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
    sort: "2026-09",
    note: "EF SET score 78/100, mapped to CEFR C2 Proficient. Reading and listening.",
    image: cert("efset-english-c2", 700, 890),
  },
];

export const certCategories: CertCategory[] = ["Human Resources", "AI & Data", "Technology & Development", "Business & Finance", "Language"];

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
    title: "Gold Medal — Biology (9th, national level)",
    event: "National Science Olympiad #2 2023",
    organizer: "GYPEM · PT Digital Edu Indonesia · Jakarta",
    date: "Oct 2023",
    scope: "National",
    attribution: "Individual · predicate A+",
    description: "National-level biology olympiad, held 21–22 October 2023 in Jakarta.",
    images: [{ ...{ src: "/certificates/award-national-science-olympiad-biology.jpg", width: 1280, height: 905 }, caption: "Certificate of Achievement" }],
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
