"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import AboutVideo from "@/components/home/AboutVideo";
import T from "@/components/i18n/T";

// Camera viewfinder-এর চার কোণ
const corners = [
  "left-3 top-3 border-l-2 border-t-2 rounded-tl-lg",
  "right-3 top-3 border-r-2 border-t-2 rounded-tr-lg",
  "bottom-3 left-3 border-b-2 border-l-2 rounded-bl-lg",
  "bottom-3 right-3 border-b-2 border-r-2 rounded-br-lg",
];

export default function VideoShowcase({ videoId, thumbnail, title }) {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 120, damping: 14 });
  const tiltY = useSpring(ry, { stiffness: 120, damping: 14 });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 12);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="relative px-2 py-5" style={{ perspective: 1200 }}>
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative"
      >
        {/* পেছনে হেলানো দুটো স্তর */}
        <div className="absolute inset-0 -rotate-6 rounded-[1.75rem] border border-primary/40 bg-primary/5" />
        <div className="absolute inset-0 rotate-3 rounded-[1.75rem] border border-fuchsia-500/40 bg-fuchsia-500/5" />

        {/* ঘুরতে থাকা রঙিন বর্ডার */}
        <div className="relative overflow-hidden rounded-[1.75rem] p-[3px] shadow-2xl shadow-primary/30">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={reduce ? undefined : { rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="aspect-square w-[160%] shrink-0"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--primary), #d946ef, #22d3ee, var(--primary))",
              }}
            />
          </div>

          <div className="relative overflow-hidden rounded-[1.6rem] bg-background">
            <AboutVideo videoId={videoId} thumbnail={thumbnail} title={title} />

            {/* Viewfinder কোণ */}
            {corners.map((c) => (
              <span key={c} className={`pointer-events-none absolute z-10 h-6 w-6 border-white/80 ${c}`} />
            ))}
          </div>
        </div>

        {/* ভাসমান chip */}
        <motion.div
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-4 -top-4 z-20 flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-semibold text-foreground shadow-xl backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          <T en="Meet Jihad" bn="জিহাদের সাথে পরিচিত হোন" />
        </motion.div>

        <motion.div
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -right-4 z-20 rounded-2xl bg-gradient-to-r from-primary to-fuchsia-500 px-4 py-2 text-xs font-semibold text-white shadow-xl shadow-primary/40"
        >
          <T en="Press play" bn="প্লে করুন" />
        </motion.div>
      </motion.div>
    </div>
  );
}