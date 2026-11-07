"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import PhotoStage from "@/components/home/PhotoStage";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

const roles = [
  { en: "MERN Stack Developer", bn: "MERN স্ট্যাক ডেভেলপার" },
  { en: "Next.js Engineer", bn: "Next.js ইঞ্জিনিয়ার" },
  { en: "Full-Stack Problem Solver", bn: "ফুল-স্ট্যাক সমস্যা সমাধানকারী" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

const reveal = (i) => ({
  variants: fadeUp,
  initial: "hidden",
  animate: "show",
  custom: i,
});

export default function Hero() {
  // Mouse spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(129,140,248,0.18), transparent 70%)`;

  // Role rotation
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(id);
  }, []);

  const onSectionMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section onMouseMove={onSectionMove} className="relative isolate overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[size:48px_48px] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <motion.div style={{ background: spotlight }} className="absolute inset-0" />
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 30, 0], y: [0, 40, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-24 top-1/3 h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/20 blur-3xl"
        />
      </div>

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        {/* Left: text */}
        <div>
          <motion.span
            {...reveal(0)}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <T en="Open to remote opportunities" bn="রিমোট কাজের জন্য উন্মুক্ত" />
          </motion.span>

          <motion.h1
            {...reveal(1)}
            className="mt-6 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
          >
            <T en="Hi, I'm" bn="আসসালামু আলাইকুম, আমি" />{" "}
            <T
              as="span"
              className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent"
              en={site.name}
              bn={site.name_bn}
            />
          </motion.h1>

          <motion.div {...reveal(2)} className="mt-4 h-8 overflow-hidden text-xl font-medium text-primary">
            <AnimatePresence mode="wait">
              <motion.div
                key={roleIndex}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <T en={roles[roleIndex].en} bn={roles[roleIndex].bn} />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.p {...reveal(3)} className="mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            <T en={site.tagline} bn={site.tagline_bn} />
          </motion.p>

          <motion.div {...reveal(4)} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              <T en="View Projects" bn="প্রজেক্ট দেখুন" />
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
            >
              <FileText size={18} className="transition group-hover:-translate-y-0.5" />
              <T en="Resume" bn="রিজিউমে" />
            </Link>
          </motion.div>

          <motion.div {...reveal(5)} className="mt-8 flex items-center gap-3">
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
            >
              <Github size={18} />
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
            >
              <Linkedin size={18} />
            </a>
          </motion.div>
        </div>

        {/* Right: photo stage */}
        <PhotoStage />
      </div>
    </section>
  );
}