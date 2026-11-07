"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { site } from "@/data/site";

const lines = [
  "> whoami",
  "  Jihad Soyon",
  "> status",
  "  ● available for remote work",
  "> building next-chapter",
  "  ████████████░░  82%",
];

// লাইনগুলো একটা একটা করে type হবে, তারপর আবার শুরু
function Terminal() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => (c >= lines.length + 4 ? 0 : c + 1));
    }, 650);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-2xl border border-border bg-background/90 p-4 font-mono text-xs shadow-2xl backdrop-blur-xl">
      <div className="mb-3 flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      </div>
      <div className="min-h-[7.5rem] space-y-1.5">
        {lines.slice(0, count).map((line, i) => (
          <p
            key={i}
            className={line.startsWith(">") ? "text-primary" : "text-muted-foreground"}
          >
            {line}
          </p>
        ))}
        {count <= lines.length && (
          <span className="inline-block h-3.5 w-1.5 animate-pulse bg-primary align-middle" />
        )}
      </div>
    </div>
  );
}

export default function PhotoStage() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 150, damping: 15 });
  const tiltY = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 12);
    rx.set(-py * 12);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-md"
      style={{ perspective: 1000 }}
    >
      {/* ঘূরন্ত আলোর halo */}
      <motion.div
        aria-hidden
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -inset-10 rounded-full bg-[conic-gradient(from_0deg,transparent,var(--primary),transparent_30%,#d946ef,transparent_60%,#22d3ee,transparent)] opacity-40 blur-3xl"
      />

      {/* Dashed orbit ও তার উপর ঘূরতে থাকা আলোর বিন্দু */}
      <motion.div
        aria-hidden
        animate={{ rotate: -360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-primary/40"
      >
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-fuchsia-500 shadow-[0_0_16px_4px_rgba(217,70,239,0.6)]" />
      </motion.div>

      {/* Photo card, mouse অনুযায়ী 3D tilt */}
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative"
      >
        <div className="rounded-3xl bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 p-[2px] shadow-2xl shadow-primary/30">
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="/images/jihad.png"
              alt={site.name}
              className="aspect-[4/5] w-full object-cover"
            />

            {/* Scanner line */}
            <motion.span
              aria-hidden
              animate={{ top: ["-20%", "110%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
              className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            />

            {/* নিচের দিকে হালকা অন্ধকার */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* Terminal card */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-6 -left-6 z-10 w-64"
      >
        <Terminal />
      </motion.div>
    </motion.div>
  );
}