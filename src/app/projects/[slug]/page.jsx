import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ExternalLink, Github } from "lucide-react";
import BackToHome from "@/components/layout/BackToHome";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      <BackToHome />

      <header className="mt-8">
        <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tech?.map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-2.5 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-semibold text-foreground transition hover:bg-muted"
            >
              <Github size={16} /> GitHub
            </a>
          )}
        </div>
      </header>

      {project.video && (
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          <div className="aspect-video">
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${project.video}`}
              title={project.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      <div className="mt-12 space-y-4 text-lg leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_li]:ml-6 [&_li]:list-disc [&_a]:text-primary [&_a]:underline">
        <MDXRemote source={project.content} />
      </div>
    </article>
  );
}