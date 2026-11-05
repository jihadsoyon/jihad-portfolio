import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");

export function getAllPosts() {
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
      const { data } = matter(raw);
      return { slug, ...data };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getFeaturedPosts(count = 3) {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, count);
}

export function getPostBySlug(slug) {
  const file = path.join(blogDir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { slug, ...data, content };
}