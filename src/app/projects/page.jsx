import BackToHome from "@/components/layout/BackToHome";
import ProjectCard from "@/components/projects/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description: "Jihad Soyon-এর সব project ও case study।",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <BackToHome />

      <div className="mt-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Projects
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          সব project
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          প্রতিটি project-এর উপর ক্লিক করলে video ও বিস্তারিত case study দেখতে পাবেন।
        </p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}