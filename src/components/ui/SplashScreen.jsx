"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

const KEY = "splash-seen";
const DURATION = 2600; // ms, লোডিং শেষ হতে যতক্ষণ লাগবে

export default function SplashScreen({ children }) {
  // SSR ও প্রথম client render একই থাকে; আগে দেখা হলে layout script দিয়ে লুকানো হয়
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {}

    if (seen) {
      setShow(false);
      return;
    }

    document.body.style.overflow = "hidden";
    const start = Date.now();
    let exitTimer;

    const id = setInterval(() => {
      const p = Math.min(100, Math.round(((Date.now() - start) / DURATION) * 100));
      setProgress(p);

      if (p >= 100) {
        clearInterval(id);
        setExiting(true);
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {}
        exitTimer = setTimeout(() => {
          setShow(false);
          document.body.style.overflow = "";
        }, 900);
      }
    }, 30);

    return () => {
      clearInterval(id);
      clearTimeout(exitTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const name = site.name.split("");

  return (
    <>
      {show && (
        <motion.div
          className="splash-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          animate={
            exiting
              ? { clipPath: "inset(0% 0% 100% 0%)" }
              : { clipPath: "inset(0% 0% 0% 0%)" }
          }
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Background grid ও আলোর blob */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[size:44px_44px] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
            <motion.div
              animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary/25 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -50, 20, 0], y: [0, 30, -30, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl"
            />
            {/* উপর থেকে নিচে যাওয়া আলোর রেখা */}
            <motion.span
              animate={{ top: ["0%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>

          {/* ছবি ও তার চারপাশের orbit */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
            className="relative h-44 w-44 md:h-52 md:w-52"
          >
            <motion.span
              aria-hidden
              animate={{ rotate: -360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-10 rounded-full border border-dashed border-primary/40"
            >
              <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-fuchsia-500 shadow-[0_0_16px_4px_rgba(217,70,239,0.6)]" />
            </motion.span>
            <motion.span
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute -inset-5 rounded-full border border-dashed border-cyan-400/40"
            />

            {/* ঘূরন্ত gradient ring */}
            <div className="absolute -inset-[3px] overflow-hidden rounded-full">
              <motion.span
                aria-hidden
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-1/2 top-1/2 h-[250%] w-[250%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,var(--primary),#d946ef,#22d3ee,var(--primary))]"
              />
            </div>

            {/* ছবি */}
            <div className="absolute inset-0 overflow-hidden rounded-full bg-background">
              <img src="/images/jihad.png" alt={site.name} className="h-full w-full object-cover object-top" />
              {/* scanner */}
              <motion.span
                aria-hidden
                animate={{ top: ["-30%", "110%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }}
                className="pointer-events-none absolute inset-x-0 h-1/3 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
              />
            </div>
          </motion.div>

          {/* নাম, অক্ষরে অক্ষরে আসবে */}
          <div className="mt-10 flex flex-wrap justify-center bg-gradient-to-r from-foreground via-primary to-fuchsia-500 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent md:text-4xl">
            {name.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.9 + i * 0.05, duration: 0.5 }}
              >
                {ch === " " ? "\u00A0" : ch}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.6 }}
            className="mt-3"
          >
            <T
              as="p"
              className="text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground"
              en={site.designation}
              bn={site.designation_bn}
            />
          </motion.div>

          {/* Progress */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.5 }}
            className="mt-10 flex w-64 flex-col items-center gap-3"
          >
            <div className="h-[3px] w-full overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 shadow-[0_0_12px_rgba(129,140,248,0.8)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-xs tabular-nums text-muted-foreground">{progress}%</p>
          </motion.div>
        </motion.div>
      )}
      {children}
    </>
  );
}