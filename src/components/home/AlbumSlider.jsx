"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import T from "@/components/i18n/T";
import { album } from "@/data/album";

// offset = কার্ডটা সামনে থেকে কত ধাপ পেছনে (0 = সামনে)
function pose(offset, n) {
  if (offset === 0) return { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 };
  if (offset === n - 1) return { x: -160, y: 10, scale: 0.9, rotate: -14, opacity: 0, zIndex: 40 }; // বেরিয়ে যাওয়া কার্ড
  if (offset === 1) return { x: 0, y: -16, scale: 0.94, rotate: 4, opacity: 1, zIndex: 20 };
  if (offset === 2) return { x: 0, y: -32, scale: 0.88, rotate: -4, opacity: 0.7, zIndex: 10 };
  return { x: 0, y: -40, scale: 0.84, rotate: 0, opacity: 0, zIndex: 0 };
}

export default function AlbumSlider() {
  const n = album.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () => setIndex((i) => (i + 1) % n);
  const prev = () => setIndex((i) => (i - 1 + n) % n);

  useEffect(() => {
    if (paused || n < 2) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, n]);

  const onDragEnd = (_, info) => {
    if (info.offset.x < -80 || info.velocity.x < -500) next();
    else if (info.offset.x > 80 || info.velocity.x > 500) prev();
  };

  return (
    <div
      className="relative mx-auto w-full max-w-sm pt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* পেছনের আলো */}
      <div className="pointer-events-none absolute inset-x-6 top-16 -z-10 h-3/4 rounded-full bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 opacity-25 blur-3xl" />

      <div className="relative aspect-[4/5]" style={{ perspective: 1000 }}>
        {album.map((p, i) => {
          const offset = (i - index + n) % n;
          const front = offset === 0;
          return (
            <motion.div
              key={i}
              animate={pose(offset, n)}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              drag={front ? "x" : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={front ? onDragEnd : undefined}
              whileDrag={{ scale: 1.03, rotate: 3, cursor: "grabbing" }}
              className="absolute inset-0 cursor-grab touch-pan-y rounded-[2rem] bg-gradient-to-br from-primary via-fuchsia-500 to-cyan-400 p-[2px] shadow-2xl shadow-primary/25"
              style={{ pointerEvents: front ? "auto" : "none" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-[1.9rem] bg-background">
                {/* ঝাপসা ব্যাকগ্রাউন্ড: ছবির আকার যা-ই হোক, ফাঁকা জায়গা ভরে দেয় */}
                <img src={p.src} alt="" aria-hidden draggable={false} className="absolute inset-0 h-full w-full scale-125 select-none object-cover opacity-60 blur-2xl" />
                {/* আসল ছবি: পুরোটা দেখা যাবে, কিছু কাটবে না */}
                <img src={p.src} alt={p.en} draggable={false} className="relative h-full w-full select-none object-contain" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                <T
                  as="span"
                  className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur"
                  en={p.en}
                  bn={p.bn}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary/60 hover:bg-muted"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {album.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1}`}
              className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
        <button
          onClick={next}
          aria-label="Next photo"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition hover:border-primary/60 hover:bg-muted"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}