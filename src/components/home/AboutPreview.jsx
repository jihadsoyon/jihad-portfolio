"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Code2, MapPin, Rocket, Sparkles } from "lucide-react";
import AboutVideo from "@/components/home/AboutVideo";
import T from "@/components/i18n/T";
import { about } from "@/data/about";
import { resume } from "@/data/resume";

const ABOUT_THUMBNAIL = "/images/about-thumbnail.png";

const facts = [
  { icon: MapPin, en: "Based in", bn: "অবস্থান", value: resume.location },
  { icon: Rocket, en: "Availability", bn: "উপলব্ধতা", value: "Open to remote" },
  { icon: Code2, en: "Focus", bn: "মূল দক্ষতা", value: "MERN · Next.js" },
  { icon: Sparkles, en: "Experience", bn: "অভিজ্ঞতা", value: "1+ years" },
];

const techs = ["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind CSS", "Vercel"];

// একটা শব্দ, scroll অনুযায়ী আস্তে উজ্জ্বল হবে
function Word({ children, progress, index, total }) {
  const start = index / total;
  const end = start + 1 / total;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.3em] inline-block">
      {children}
    </motion.span>
  );
}

function ScrollText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 45%"],
  });

  const words = text.split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className="text-xl leading-relaxed text-foreground md:text-2xl md:leading-[1.7]">
      {words.map((w, i) => (
        <Word key={i} index={i} total={words.length} progress={scrollYProgress}>
          {w}
        </Word>
      ))}
    </p>
  );
}

function TechMarquee() {
  const items = [...techs, ...techs];
  return (
    <div className="relative mt-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        className="flex w-max gap-4"
      >
        {items.map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-border bg-card/60 px-5 py-2 text-sm font-semibold text-muted-foreground backdrop-blur"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function AboutPreview() {
  const fullText = about.paragraphs.join(" ");

  return (
    <section className="relative isolate overflow-hidden mx-auto max-w-6xl px-6 py-28">
      {/* পেছনের বড় outline শব্দ */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 select-none text-[7rem] font-black uppercase leading-none tracking-tighter text-transparent md:text-[11rem]"
        style={{ WebkitTextStroke: "1px var(--border)" }}
      >
        About
      </span>

      <div className="relative grid items-center gap-16 md:grid-cols-2">
        {/* বাম: video */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20 blur-xl" />
          <AboutVideo videoId={about.youtubeId} thumbnail={ABOUT_THUMBNAIL} title="About Jihad Soyon" />
        </motion.div>

        {/* ডান: heading, scroll text, facts */}
        <div>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary"
          >
            <span className="h-px w-10 bg-gradient-to-r from-primary to-fuchsia-500" />
            <T en="About" bn="পরিচয়" />
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            <span className="text-foreground">About </span>
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              Myself
            </span>
          </motion.h2>

          <div className="mt-8">
            <ScrollText text={fullText} />
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3">
            {facts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.en}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group rounded-2xl border border-border bg-card/60 p-4 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <Icon size={14} />
                    <T
                      as="span"
                      className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground"
                      en={f.en}
                      bn={f.bn}
                    />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-foreground">{f.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <TechMarquee />
    </section>
  );
}