import { getAllPosts } from "@/lib/blog";
import { getAllProjects } from "@/lib/projects";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap() {
  const staticRoutes = ["", "/about", "/skills", "/projects", "/services", "/blog", "/contact"].map(
    (route) => ({
      url: `${BASE_URL}${route}`,
      lastModified: new Date(),
    })
  );

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${BASE_URL}/projects/${project.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}