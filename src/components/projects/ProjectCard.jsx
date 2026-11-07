"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { Github } from "@/components/ui/BrandIcons";
import T from "@/components/i18n/T";

// MDX-এর accent নাম থেকে gradient। Tailwind এই class গুলো দেখতে পাবে কারণ এখানে লেখা আছে।
const accents = {
  amber: "from-amber-400 to-orange-500",
  rose: "from-red-400 to-rose-500",
  emerald: "from-emerald-400 to-teal-500",
  blue: "from-blue-400 to-orange-500",
};

export default function ProjectCard({ project, index = 0 }) {
  const ref = useRef(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [7, -7]), { stiffness: 180, damping: 20 });
  const ry = useSpring(useTransform(px, [0, 1], [-7, 7]), { stiffness: 180, damping: 20 });
  const [imgFailed, setImgFailed] = useState(false);

  const accent = accents[project.accent] ?? accents.blue;
  const number = String(index + 1).padStart(2, "0");
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
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur-xl transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/10"
    >
      {/* Hover-এ জ্বলা রঙিন আলো */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-16 -top-16 z-0 h-56 w-56 rounded-full bg-gradient-to-br ${accent} opacity-0 blur-3xl transition duration-500 group-hover:opacity-40`}
      />

      {/* Image বা fallback */}
      <div className="relative aspect-video overflow-hidden">
        {project.image && !imgFailed ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgFailed(true)}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
          />
        ) : (
          <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${accent}`}>
            <span className="text-6xl drop-shadow-lg">{project.emoji}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/10 to-transparent" />

        <span
          aria-hidden
          className="absolute left-5 top-3 select-none font-mono text-6xl font-black text-transparent"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}
        >
          {number}
        </span>
      </div>

      {/* বিষয়বস্তু */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-full border border-border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition group-hover:border-primary/30"
            >
              {t}
            </span>
          ))}
          {tech.length > 5 && (
            <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold text-primary">
              +{tech.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <Link
            href={`/projects/${project.slug}`}
            className="group/cs inline-flex items-center gap-2 text-sm font-semibold text-foreground"
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
                className="rounded-full border border-border p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
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
                className="rounded-full border border-border p-2 text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-foreground"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}