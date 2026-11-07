"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

export default function PhotoStage() {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const tiltX = useSpring(rx, { stiffness: 150, damping: 15 });
  const tiltY = useSpring(ry, { stiffness: 150, damping: 15 });

  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-md"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: tiltX, rotateY: tiltY }}
        className="relative"
      >
        {/* পেছনের offset outline (আগে লেখা হয়েছে, তাই ছবির নিচে থাকবে) */}
        <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border border-primary/30" />

        {/* Gradient border + ছবি */}
        <div className="relative rounded-[2rem] bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 p-[2px] shadow-2xl shadow-primary/25">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.9rem] bg-background">
            <img
              src="/images/jihad.png"
              alt={site.name}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/50 to-transparent" />
          </div>
        </div>

        {/* Experience badge */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-5 -left-5 rounded-2xl border border-border bg-card/90 px-5 py-3 shadow-xl backdrop-blur-xl"
        >
          <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-2xl font-extrabold text-transparent">
            1+
          </p>
          <T
            as="p"
            className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
            en="Years experience"
            bn="বছরের অভিজ্ঞতা"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}