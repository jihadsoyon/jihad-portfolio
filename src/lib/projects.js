import fs from "fs";
import path from "path";
import matter from "gray-matter";

const projectsDir = path.join(process.cwd(), "content", "projects");

export function getAllProjects() {
  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(projectsDir, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getFeaturedProjects() {
  return getAllProjects()
    .filter((project) => project.featured)
    .slice(0, 4);
}

export function getProjectBySlug(slug) {
  const file = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, ...data, content };
}