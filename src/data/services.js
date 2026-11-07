// Service-এর তথ্য। প্রতিটি service-এর inquiry মান contact form-এর inquiry id-র সাথে মিলে।
// basics তালিকার প্রযুক্তিগুলো "basic" হিসেবে দেখানো হবে, যাতে client-কে ভুল ধারণা না দেয়।
export const services = [
  {
    slug: "frontend-development",
    title: "Frontend Development",
    short: "Fast, responsive interfaces built with React and Next.js, with motion that feels intentional.",
    icon: "layout",
    inquiry: "new-project",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "shadcn/ui"],
    basics: [],
    includes: [
      "Responsive layouts that work across phones, tablets and desktops",
      "A reusable component system with consistent spacing and typography",
      "Purposeful animations that never block the content",
      "Accessible forms, navigation and focus states",
      "SEO-ready pages with metadata and social previews",
    ],
    idealFor: "Startups, product teams, personal brands and marketing sites that need a sharp, modern interface.",
    deliverables: "Production-ready pages, a component library and a short handover guide.",
  },
  {
    slug: "backend-api",
    title: "Backend & API Development",
    short: "Secure REST APIs with Node.js, Express and MongoDB, designed so the frontend can grow without friction.",
    icon: "server",
    inquiry: "collaboration",
    stack: ["Node.js", "Express.js", "MongoDB", "REST API", "API Integration"],
    basics: ["PostgreSQL", "Prisma"],
    includes: [
      "Clean REST API structure with consistent responses",
      "Input validation and centralised error handling",
      "Role-aware routes and protected endpoints",
      "Integration with third-party APIs and services",
      "MongoDB data modelling for your product's needs",
    ],
    idealFor: "Products that need a reliable data layer, or existing frontends that need a proper backend.",
    deliverables: "Documented API endpoints, environment setup and example requests.",
  },
  {
    slug: "full-stack-apps",
    title: "Full-stack Web Applications",
    short: "End-to-end MERN and Next.js applications, from database design to a deployed, usable product.",
    icon: "layers",
    inquiry: "new-project",
    stack: ["Next.js", "Express.js", "MongoDB", "Better Auth", "Stripe", "Tailwind CSS"],
    basics: [],
    includes: [
      "Architecture planned before the first line of code",
      "Frontend and backend built together, with shared data contracts",
      "Authentication, dashboards and user-specific data",
      "Testing of critical paths before every release",
      "Deployment and a clear path for future features",
    ],
    idealFor: "Founders and teams who want a complete product built by one developer who owns the whole stack.",
    deliverables: "A working application, source code in your repository and deployment notes.",
  },
  {
    slug: "auth-payments",
    title: "Authentication, Roles & Payments",
    short: "Sign-in, role-based access and payment flows that are secure by default and easy to extend.",
    icon: "shield",
    inquiry: "collaboration",
    stack: ["Better Auth", "Firebase", "Role-Based Access Control", "Stripe", "SSLCommerz"],
    basics: [],
    includes: [
      "Email and social sign-in with secure session handling",
      "Role-based access control for admins, writers and users",
      "Stripe or SSLCommerz checkout with webhook handling",
      "Protected routes on both frontend and backend",
      "Clear records of payments and access changes",
    ],
    idealFor: "Marketplaces, subscription products and platforms with multiple user roles.",
    deliverables: "Working auth and payment flows, tested with sandbox accounts.",
  },
  {
    slug: "ai-integration",
    title: "AI Feature Integration",
    short: "Practical AI features inside your web app, such as assistants, summaries and smart search.",
    icon: "sparkles",
    inquiry: "collaboration",
    stack: ["AI Integration", "API Integration", "Next.js", "Node.js"],
    basics: [],
    includes: [
      "Choosing the right AI API for your use case and budget",
      "Prompt design with clear, tested instructions",
      "Safe handling of responses, including fallbacks and limits",
      "A simple interface that makes AI output easy to review",
      "Guidance on cost, privacy and responsible use",
    ],
    idealFor: "Products that want AI to save users time, without turning the app into an experiment.",
    deliverables: "A working AI feature, the prompts used and notes on maintaining them.",
  },
  {
    slug: "deployment-support",
    title: "Deployment & Ongoing Support",
    short: "Reliable releases, version control, basic automated checks and steady support after launch.",
    icon: "rocket",
    inquiry: "consultancy",
    stack: ["Git & GitHub", "Jest", "CI/CD"],
    basics: ["Jest", "CI/CD"],
    includes: [
      "Git workflow with clear commits and branches",
      "Environment setup for development, staging and production",
      "Deployment to a hosting platform with environment variables",
      "Basic automated tests for important functions",
      "Updates, bug fixes and performance checks after launch",
    ],
    idealFor: "Projects that are ready to launch, or live products that need someone to keep them healthy.",
    deliverables: "A deployed site, deployment notes and an agreed support window.",
  },
];

export function getServiceBySlug(slug) {
  return services.find((s) => s.slug === slug) ?? null;
}

// Toolkit: প্রতিটি group-এর প্রযুক্তি। basic: true হলে "basic" চিহ্ন দেখাবে।
export const toolkit = [
  {
    title: "Foundation",
    items: [
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "JavaScript (ES6+)" },
      { name: "Git & GitHub" },
      { name: "AI Integration" },
    ],
  },
  {
    title: "Frontend",
    items: [{ name: "React.js" }, { name: "Next.js" }, { name: "TypeScript" }, { name: "Tailwind CSS" }],
  },
  {
    title: "Backend",
    items: [{ name: "Node.js" }, { name: "Express.js" }, { name: "API Integration" }],
  },
  {
    title: "Database",
    items: [{ name: "MongoDB" }, { name: "PostgreSQL", basic: true }, { name: "Prisma", basic: true }],
  },
  {
    title: "UI Libraries",
    items: [{ name: "shadcn/ui" }, { name: "Hero UI" }, { name: "Framer Motion" }, { name: "Lucide React" }],
  },
  {
    title: "Auth & Security",
    items: [{ name: "Better Auth" }, { name: "Firebase" }, { name: "Role-Based Access Control" }],
  },
  {
    title: "Payments",
    items: [{ name: "Stripe" }, { name: "SSLCommerz" }],
  },
  {
    title: "Testing & Deployment",
    items: [{ name: "Jest", basic: true }, { name: "CI/CD", basic: true }],
  },
];