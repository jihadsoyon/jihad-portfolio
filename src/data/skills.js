// Category ও skill-এর তালিকা। level-এর মানগুলো placeholder, আপনার আসল মান দিয়ে বদলান।
// যেসব tool আপনি ব্যবহার করেননি, সেগুলো মুছে দিন।
export const skillCategories = ["Frontend", "Backend", "Database", "Testing", "Tools"];

export const skillItems = [
  { name: "React", group: "Frontend", level: 90 },
  { name: "Next.js", group: "Frontend", level: 88 },
  { name: "JavaScript (ES6+)", group: "Frontend", level: 90 },
  { name: "TypeScript", group: "Frontend", level: 40 },
  { name: "Tailwind CSS", group: "Frontend", level: 88 },
  { name: "Framer Motion", group: "Frontend", level: 75 },
  { name: "HTML5", group: "Frontend", level: 92 },
  { name: "CSS3", group: "Frontend", level: 90 },

  { name: "Node.js", group: "Backend", level: 85 },
  { name: "Express.js", group: "Backend", level: 85 },
  { name: "REST API", group: "Backend", level: 88 },
  { name: "Better Auth", group: "Backend", level: 75 },
  { name: "Firebase", group: "Backend", level: 75 },

  { name: "MongoDB", group: "Database", level: 82 },

  { name: "Jest", group: "Testing", level: 60 },

  { name: "Git & GitHub", group: "Tools", level: 88 },
  { name: "VS Code", group: "Tools", level: 90 },
  { name: "Postman", group: "Tools", level: 85 },
  { name: "Vercel", group: "Tools", level: 85 },
  { name: "Railway", group: "Tools", level: 75 },
  { name: "npm", group: "Tools", level: 85 },
];

// Resume page-এর জন্য category অনুযায়ী তালিকা
export const skillGroups = skillCategories
  .map((c) => ({
    title: c,
    skills: skillItems.filter((s) => s.group === c).map((s) => s.name),
  }))
  .filter((g) => g.skills.length > 0);