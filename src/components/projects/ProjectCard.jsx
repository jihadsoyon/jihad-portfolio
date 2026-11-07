"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import T from "@/components/i18n/T";

// MDX-এর accent নাম থেকে gradient। Tailwind এই class গুলো দেখতে পাবে কারণ এখানে লেখা আছে।
const accents = {
  amber: "from-amber-400 via-orange-500 to-rose-500",
  rose: "from-rose-400 via-red-500 to-pink-600",
  emerald: "from-emerald-400 via-teal-500 to-cyan-500",
  blue: "from-sky-400 via-blue-500 to-indigo-600",
};

export default function ProjectCard({ project, index = 0 }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 180, damping: 22 });
  const ry = useSpring(useTransform(px, [0, 1], [-5, 5]), { stiffness: 180, damping: 22 });
  const [imgFailed, setImgFailed] = useState(false);

  const accent = accents[project.accent] ?? accents.blue;
  const tech = project.tech ?? [];

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };

  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1100 }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.12, ease: "easeOut" }}
      className="group relative flex flex-col"
    >
      {/* Gradient border যা hover-এ ঘোরে */}
      <div className="relative overflow-hidden rounded-[1.75rem] p-[1.5px]">
        <span
          aria-hidden
          className={`absolute left-1/2 top-1/2 h-[260%] w-[260%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,var(--primary),#d946ef,#22d3ee,var(--primary))] opacity-0 transition duration-500 group-hover:opacity-100`}
          style={{ animation: "spin-slow 5s linear infinite" }}
        />
        <span aria-hidden className="absolute inset-0 rounded-[1.75rem] bg-border group-hover:opacity-0 transition duration-500" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-[1.7rem] bg-card">
          {/* ছবি */}
          <div className="relative aspect-[16/10] overflow-hidden">
            {project.image && !imgFailed ? (
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImgFailed(true)}
                className="h-full w-full object-cover transition duration-[900ms] group-hover:scale-110 group-hover:brightness-110"
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent}`}>
                <span className="text-7xl drop-shadow-2xl transition duration-500 group-hover:scale-110">
                  {project.emoji}
                </span>
              </div>
            )}

            {/* নিচে গাঢ় হয়ে মিশে যাওয়া */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

            {/* উপরের badge */}
            <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-background/70 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground backdrop-blur">
              {project.role ?? "Project"}
            </span>
          </div>

          {/* বিষয়বস্তু */}
          <div className="relative flex flex-1 flex-col p-7 -mt-10">
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {tech.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
              {tech.length > 5 && (
                <span className="rounded-md px-2 py-1 text-[11px] font-semibold text-primary">
                  +{tech.length - 5}
                </span>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between gap-3 pt-6">
              <Link
                href={`/projects/${project.slug}`}
                className="group/cs relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:scale-105"
              >
                <T en="Case study" bn="কেস স্টাডি" />
                <ArrowUpRight
                  size={16}
                  className="transition group-hover/cs:translate-x-0.5 group-hover/cs:-translate-y-0.5"
                />
              </Link>

              <div className="flex gap-2">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live demo"
                    className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                  >
                    <Globe size={16} />
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub repository"
                    className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
                  >
                    <Github size={16} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}