"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Layers, Layout, Rocket, Server, ShieldCheck, Sparkles } from "lucide-react";

const icons = {
  layout: Layout,
  server: Server,
  layers: Layers,
  shield: ShieldCheck,
  sparkles: Sparkles,
  rocket: Rocket,
};

export default function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(360px circle at ${mx}% ${my}%, rgba(129,140,248,0.16), transparent 70%)`;

  const Icon = icons[service.icon] ?? Layers;
  const number = String(index + 1).padStart(2, "0");

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="h-full"
    >
      <Link
        ref={ref}
        href={`/services/${service.slug}`}
        onMouseMove={onMove}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card/60 p-7 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10"
      >
        <motion.span
          aria-hidden
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
        />

        <div className="relative flex items-start justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/30 transition duration-500 group-hover:scale-110">
            <Icon size={20} />
          </span>
          <span className="font-mono text-xs text-muted-foreground">{number}</span>
        </div>

        <h3 className="relative mt-6 text-xl font-bold text-foreground">{service.title}</h3>
        <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{service.short}</p>

        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {service.stack.slice(0, 3).map((t) => (
            <span key={t} className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              {t}
            </span>
          ))}
          {service.stack.length > 3 && (
            <span className="px-1 py-1 text-[11px] font-semibold text-primary">+{service.stack.length - 3}</span>
          )}
        </div>

        <span className="relative mt-auto inline-flex items-center gap-2 pt-6 text-sm font-semibold text-primary">
          View details
          <ArrowUpRight size={16} className="transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </motion.div>
  );
}