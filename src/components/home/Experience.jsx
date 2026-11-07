"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Briefcase, Calendar, Check, ExternalLink, MapPin } from "lucide-react";
import { experiences, careerSnapshot } from "@/data/experience";

// Card-এর উপর mouse নিলে সে আলতো করে কাত হবে
function TiltCard({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    x.set(px - 0.5);
    y.set(py - 0.5);
    setGlow({ x: px * 100, y: py * 100 });
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-card/70 backdrop-blur-xl ${className}`}
    >
      {/* Mouse-এর নিচে আলো */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${glow.x}% ${glow.y}%, rgba(129,140,248,0.18), transparent 60%)`,
        }}
      />
      {children}
    </motion.div>
  );
}

function StatBox({ value, label }) {
  return (
    <div className="group rounded-2xl border border-border bg-card/60 p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
      <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-3xl font-extrabold text-transparent">
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export default function Experience() {
  const job = experiences[0];

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Experience</p>
        <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          Professional{" "}
          <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-transparent">
            journey
          </span>
        </h2>
        <p className="mt-4 text-muted-foreground">My professional journey so far.</p>
      </motion.div>

      <div className="mt-16 grid gap-6 lg:grid-cols-5">
        {/* বাম: career snapshot ও stats */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="space-y-4 lg:col-span-2"
        >
          <TiltCard className="p-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              <Briefcase size={14} /> Career snapshot
            </span>
            <h3 className="mt-3 text-xl font-bold text-foreground">{careerSnapshot.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{careerSnapshot.summary}</p>
          </TiltCard>

          <div className="grid grid-cols-2 gap-3">
            {careerSnapshot.stats.map((s) => (
              <StatBox key={s.label} value={s.value} label={s.label} />
            ))}
          </div>

          <TiltCard className="p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Tools I worked with
            </p>
            <div className="mt-5 space-y-4">
              {careerSnapshot.tools.map((g) => (
                <div key={g.group}>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary">{g.group}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TiltCard>
        </motion.div>

        {/* ডান: job card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-3"
        >
          <TiltCard className="h-full p-8 md:p-10">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                {job.type}
              </span>
              <span className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                {job.duration}
              </span>
            </div>

            <h3 className="mt-5 text-2xl font-bold text-foreground md:text-3xl">{job.role}</h3>
            <p className="mt-1 text-lg font-semibold text-primary">{job.company}</p>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Calendar size={14} /> {job.period}
              </span>
              <span className="flex items-center gap-2">
                <MapPin size={14} /> {job.location}
              </span>
            </div>

            <p className="mt-6 leading-relaxed text-muted-foreground">{job.summary}</p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Key responsibilities
              </p>
              <ul className="mt-4 space-y-3">
                {job.points.map((p, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check size={12} />
                    </span>
                    {p}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {job.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>

            <a
              href="/resume"
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              View in resume
              <ExternalLink size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}