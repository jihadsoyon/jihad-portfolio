"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import T from "@/components/i18n/T";

export default function AboutVideo({ videoId, thumbnail, title }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
      {/* Gradient border glow */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-transparent to-fuchsia-500/40 opacity-60 transition group-hover:opacity-100" />

      <div className="relative aspect-video overflow-hidden rounded-3xl">
        {playing ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setPlaying(true)}
            aria-label="Play about video"
            className="group/btn relative block h-full w-full cursor-pointer"
          >
            {/* আপনার thumbnail */}
            <img
              src={thumbnail}
              alt={title}
              className="h-full w-full object-cover transition duration-700 group-hover/btn:scale-105"
            />

            {/* নিচের দিকে gradient, যাতে লেখা পড়া যায় */}
            <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {/* Play button */}
            <span className="absolute inset-0 flex items-center justify-center">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-2xl shadow-primary/50 transition group-hover/btn:scale-110"
              >
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
                <Play size={30} className="relative translate-x-0.5 fill-white" />
              </motion.span>
            </span>

            {/* Label */}
            <span className="absolute bottom-4 left-4 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
              <T en="Watch my intro" bn="আমার পরিচয় দেখুন" />
            </span>
          </button>
        )}
      </div>
    </div>
  );
}