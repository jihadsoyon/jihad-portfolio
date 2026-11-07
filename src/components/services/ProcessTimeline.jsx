"use client";

import { motion } from "framer-motion";

const steps = [
  {
    no: "01",
    title: "Discover",
    text: "We define your goals, users and must-have features before any code is written.",
  },
  {
    no: "02",
    title: "Design",
    text: "A clear structure and layout plan that you can review and approve before building.",
  },
  {
    no: "03",
    title: "Build",
    text: "Clean, tested code delivered in visible milestones, so you see progress early.",
  },
  {
    no: "04",
    title: "Launch",
    text: "Deployment, performance and SEO checks, followed by handover and optional support.",
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative mt-12 grid gap-6 md:grid-cols-4">
      <div className="pointer-events-none absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

      {steps.map((s, i) => (
        <motion.div
          key={s.no}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: i * 0.12, duration: 0.5 }}
          className="relative rounded-3xl border border-border bg-card/60 p-6 backdrop-blur"
        >
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-background font-mono text-sm font-bold text-primary ring-1 ring-primary/40 shadow-[0_0_20px_rgba(129,140,248,0.25)]">
            {s.no}
          </span>
          <h3 className="mt-5 text-lg font-bold text-foreground">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
        </motion.div>
      ))}
    </div>
  );
}