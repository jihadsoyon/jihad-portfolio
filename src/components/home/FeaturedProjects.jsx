import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/projects/ProjectCard";
import T from "@/components/i18n/T";
import { getFeaturedProjects } from "@/lib/projects";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section className="relative isolate px-6 py-24">
      {/* আলো section-এর ভেতরেই থাকবে, কোনো কাটা প্রান্ত দেখাবে না */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 top-1/4 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_65%)] opacity-[0.07]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <T as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-primary" en="Projects" bn="প্রজেক্ট" />
            <T
              as="h2"
              className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              en="Featured work"
              bn="বাছাই করা কাজ"
            />
            <T
              as="p"
              className="mt-4 max-w-xl text-muted-foreground"
              en="Real products, built end to end."
              bn="বাস্তব product, শুরু থেকে শেষ পর্যন্ত তৈরি।"
            />
          </div>

          <Link
            href="/projects"
            className="group inline-flex w-fit items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
          >
            <T en="All projects" bn="সব project দেখুন" />
            <ArrowRight size={16} className="transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}