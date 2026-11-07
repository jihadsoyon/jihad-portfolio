"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WEEKS = 14;
const DAYS = 7;

// নির্দিষ্ট pattern, যাতে server ও client একই দেখায় (hydration error এড়াতে)
const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => ((i * 37) % 11) / 10);

function useDhakaTime() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Dhaka",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function CountUp({ to }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += 1;
      setN(v);
      if (v >= to) clearInterval(id);
    }, 180);
    return () => clearInterval(id);
  }, [to]);

  return n;
}

export default function LiveCard() {
  const time = useDhakaTime();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="relative mx-auto mt-6 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card/70 p-5 shadow-xl backdrop-blur-xl"
    >
      {/* উপরের সারি: live status ও সময় */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live · Dhaka
        </div>
        <span className="font-mono text-sm tabular-nums text-foreground">
          {time ?? "--:--:--"}
        </span>
      </div>

      {/* Contribution grid: প্রতিটি বর্গ আলাদা ভাবে pulse করবে */}
      <div className="mt-5 flex gap-1.5 overflow-hidden">
        {Array.from({ length: WEEKS }).map((_, w) => (
          <div key={w} className="flex flex-col gap-1.5">
            {Array.from({ length: DAYS }).map((_, d) => {
              const v = cells[w * DAYS + d];
              return (
                <motion.span
                  key={d}
                  animate={{ opacity: [v * 0.5 + 0.2, 1, v * 0.5 + 0.2] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: (w * DAYS + d) * 0.03,
                    ease: "easeInOut",
                  }}
                  className="block h-3 w-3 rounded-[3px] bg-primary"
                  style={{ opacity: v * 0.5 + 0.2 }}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* নিচের সারি: count ও বর্তমান কাজ */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-3xl font-extrabold text-transparent">
            <CountUp to={4} />+
          </p>
          <p className="text-xs text-muted-foreground">Projects shipped</p>
        </div>
        <p className="max-w-[12rem] text-right text-xs leading-relaxed text-muted-foreground">
          Currently building the next chapter
        </p>
      </div>

      {/* নিচের scan line */}
      <motion.span
        aria-hidden
        animate={{ x: ["-100%", "400%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-gradient-to-r from-transparent via-primary to-transparent"
      />
    </motion.div>
  );
}