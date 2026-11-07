
export const inquiryTypes = [
  {
    id: "collaboration",
    label: "Project Collaboration",
    description: "Build something together as partners.",
    heading: "Tell me about the project",
    placeholder: "What are you building, who is it for, and what do you need from me?",
    showBudget: true,
  },
  {
    id: "consultancy",
    label: "Dev Consultancy",
    description: "Code review, architecture or technical advice.",
    heading: "What do you need advice on?",
    placeholder: "Describe the problem, your current stack and what you have already tried.",
    showBudget: true,
  },
  {
    id: "new-project",
    label: "Start a New Project",
    description: "A new website, web app or product from scratch.",
    heading: "Tell me about your new project",
    placeholder: "Goals, features you need, and any reference websites you like.",
    showBudget: true,
  },
  {
    id: "remote-job",
    label: "Remote Job Opportunity",
    description: "A full-time or contract remote role.",
    heading: "Share the role details",
    placeholder: "Company, role, tech stack, and the timeline you are hiring for.",
    showBudget: false,
  },
  {
    id: "general",
    label: "General Question",
    description: "Anything else you would like to ask.",
    heading: "What would you like to ask?",
    placeholder: "Write your message here.",
    showBudget: false,
  },
];

export const budgetOptions = ["Under $500", "$500 – $2,000", "$2,000 – $5,000", "$5,000+", "Not sure yet"];
export const timelineOptions = ["Within 2 weeks", "1 – 2 months", "3+ months", "Flexible"];