// প্রতিটি skill-এর নাম, group, আনুমানিক দক্ষতা (%) ও brand রং।
// level-এর মানগুলো placeholder, আপনার নিজের মান দিয়ে বদলান।
export const skillItems = [
  { name: "React", group: "Frontend", level: 90, color: "#61DAFB" },
  { name: "Next.js", group: "Frontend", level: 88, color: "#e5e7eb" },
  { name: "JavaScript (ES6+)", group: "Frontend", level: 90, color: "#F7DF1E" },
  { name: "Tailwind CSS", group: "Frontend", level: 88, color: "#38BDF8" },
  { name: "Framer Motion", group: "Frontend", level: 75, color: "#a855f7" },
  { name: "HTML5", group: "Frontend", level: 92, color: "#E34F26" },
  { name: "CSS3", group: "Frontend", level: 90, color: "#1572B6" },
  { name: "Node.js", group: "Backend", level: 85, color: "#84cc16" },
  { name: "Express.js", group: "Backend", level: 85, color: "#a3a3a3" },
  { name: "MongoDB", group: "Backend", level: 82, color: "#22c55e" },
  { name: "Mongoose", group: "Backend", level: 80, color: "#dc2626" },
  { name: "Better Auth", group: "Backend", level: 75, color: "#818cf8" },
  { name: "REST API", group: "Backend", level: 88, color: "#f59e0b" },
  { name: "Git & GitHub", group: "Tools", level: 88, color: "#f97316" },
  { name: "Vercel", group: "Tools", level: 85, color: "#e5e7eb" },
  { name: "Railway", group: "Tools", level: 75, color: "#a78bfa" },
  { name: "VS Code", group: "Tools", level: 90, color: "#0ea5e9" },
  { name: "Postman", group: "Tools", level: 85, color: "#fb923c" },
  { name: "npm", group: "Tools", level: 85, color: "#ef4444" },
];

// Resume page-এর জন্য group আকারে তালিকা (আগের মতোই)
export const skillGroups = [
  { title: "Frontend", skills: skillItems.filter((s) => s.group === "Frontend").map((s) => s.name) },
  { title: "Backend", skills: skillItems.filter((s) => s.group === "Backend").map((s) => s.name) },
  { title: "Tools & Deployment", skills: skillItems.filter((s) => s.group === "Tools").map((s) => s.name) },
];