"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { skillCategories, skillItems } from "@/data/skills";

const filters = ["All", ...skillCategories];
const marquee = [...skillItems, ...skillItems];

function SkillTile({ skill, index }) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(220px circle at ${mx}% ${my}%, rgba(129,140,248,0.14), transparent 70%)`;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, delay: index * 0.03 }}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      <motion.div
        aria-hidden
        style={{ background: spotlight }}
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
      />

      <div className="relative flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          {skill.group}
        </span>
        <span className="font-mono text-xs text-muted-foreground">{skill.level}%</span>
      </div>

      <p className="relative mt-3 font-semibold text-foreground">{skill.name}</p>

      <div className="relative mt-4 h-1 overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.03 + 0.2, ease: "easeOut" }}
          className="h-full rounded-full bg-primary"
        />
      </div>
    </motion.div>
  );
}

function TechMarquee() {
  return (
    <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-8"
      >
        {marquee.map((s, i) => (
          <span
            key={i}
            className="flex items-center gap-8 whitespace-nowrap text-3xl font-bold tracking-tight text-muted-foreground/50"
          >
            {s.name}
            <span className="text-primary">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function SkillsPreview() {
  const [active, setActive] = useState("All");
  const items =
    active === "All" ? skillItems : skillItems.filter((s) => s.group === active);

  return (
    <section className="relative isolate overflow-hidden mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Skills</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Technologies I{" "}
          <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
            build with
          </span>
        </h2>
      </motion.div>

      <TechMarquee />

      {/* Filter */}
      <div className="mt-12 flex flex-wrap justify-center gap-2">
        {filters.map((f) => {
          const isActive = active === f;
          return (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`relative rounded-full px-5 py-2 text-sm font-semibold transition ${
                isActive ? "text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="skill-pill"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/30"
                />
              )}
              <span className="relative">{f}</span>
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-center font-mono text-xs uppercase tracking-widest text-muted-foreground">
        Showing {items.length} technologies
      </p>

      <motion.div layout className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((s, i) => (
            <SkillTile key={s.name} skill={s} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}