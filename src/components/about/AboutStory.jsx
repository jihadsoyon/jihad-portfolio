"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animate, motion, useInView, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Code2, ShieldCheck, Zap } from "lucide-react";
import AboutVideo from "@/components/home/AboutVideo";
import T from "@/components/i18n/T";
import { about } from "@/data/about";
import { aboutStory } from "@/data/aboutStory";

const ABOUT_THUMBNAIL = "/images/about-thumbnail.png";
const icons = { code: Code2, zap: Zap, shield: ShieldCheck };

// সংখ্যাটা দেখা দিলে 0 থেকে গুনতে শুরু করবে
function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

// Scroll অনুযায়ী একটা রঙিন রেখা নিচের দিকে এগোবে
function Journey({ items }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div ref={ref} className="relative">
      {/* ধূসর পথ */}
      <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-border md:left-1/2" />
      {/* রঙিন অগ্রগতি */}
      <motion.div
        style={{ scaleY: progress }}
        className="absolute left-4 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-primary via-fuchsia-500 to-cyan-400 md:left-1/2"
      />

      <ol className="space-y-16">
        {items.map((item, i) => {
          const leftSide = i % 2 === 0;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={`relative pl-12 md:w-1/2 ${
                leftSide ? "md:pr-14 md:text-right" : "md:ml-auto md:pl-14"
              }`}
            >
              {/* বিন্দু */}
              <span
                className={`absolute left-[9px] top-6 h-3.5 w-3.5 rounded-full bg-primary shadow-[0_0_14px_rgba(129,140,248,0.8)] ring-4 ring-primary/30 md:top-7 ${
                  leftSide ? "md:left-auto md:right-[-7px]" : "md:-left-[7px]"
                }`}
              />

              <div className="group rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
                <span className="inline-block rounded-full bg-muted px-3 py-1 font-mono text-xs font-semibold text-primary">
                  {item.period}
                </span>
                <T as="h3" className="mt-3 text-xl font-semibold text-foreground" en={item.title.en} bn={item.title.bn} />
                <T as="p" className="mt-2 leading-relaxed text-muted-foreground" en={item.text.en} bn={item.text.bn} />
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div className="text-center">
      <T as="p" className="text-xs font-semibold uppercase tracking-[0.3em] text-primary" en={label.en} bn={label.bn} />
      <T as="h2" className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl" en={title.en} bn={title.bn} />
    </div>
  );
}

export default function AboutStory() {
  return (
    <div className="space-y-32">
      {/* ১. পরিচয় */}
      <section className="grid items-center gap-16 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <AboutVideo videoId={about.youtubeId} thumbnail={ABOUT_THUMBNAIL} title="About Jihad Soyon" />
        </motion.div>

        <div>
          <T as="span" className="text-xs font-semibold uppercase tracking-[0.3em] text-primary" en="About" bn="পরিচয়" />
          <T
            as="h1"
            className="mt-4 text-5xl font-bold tracking-tight text-foreground md:text-6xl"
            en="About Myself"
            bn="আমার সম্পর্কে"
          />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ২. সংখ্যা */}
      <section className="grid gap-4 sm:grid-cols-3">
        {aboutStory.stats.map((s) => (
          <motion.div
            key={s.en}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-5xl font-extrabold text-transparent">
              <CountUp to={s.value} suffix={s.suffix} />
            </p>
            <T
              as="p"
              className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground"
              en={s.en}
              bn={s.bn}
            />
          </motion.div>
        ))}
      </section>

      {/* ৩. যাত্রাপথ */}
      <section>
        <SectionHeading
          label={{ en: "The journey", bn: "যাত্রাপথ" }}
          title={{ en: "How I got here", bn: "এখানে আসার গল্প" }}
        />
        <div className="mx-auto mt-16 max-w-4xl">
          <Journey items={aboutStory.journey} />
        </div>
      </section>

      {/* ৪. মূল্যবোধ */}
      <section>
        <SectionHeading
          label={{ en: "What drives me", bn: "যা আমাকে চালায়" }}
          title={{ en: "My principles", bn: "আমার নীতি" }}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {aboutStory.values.map((v, i) => {
            const Icon = icons[v.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="group rounded-3xl border border-border bg-card/60 p-8 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/30 transition group-hover:scale-110">
                  <Icon size={22} />
                </span>
                <T as="h3" className="mt-6 text-lg font-semibold text-foreground" en={v.title.en} bn={v.title.bn} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ৫. এখন কী করছি ও CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2rem] border border-border bg-card/60 p-10 backdrop-blur md:p-14"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-30" />

        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-500">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <T en="Currently" bn="এখন" />
            </span>
            <T
              as="p"
              className="mt-4 text-2xl font-bold leading-snug text-foreground md:text-3xl"
              en={aboutStory.currently.en}
              bn={aboutStory.currently.bn}
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              <T en="Let's talk" bn="কথা বলুন" />
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resume"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
            >
              <T en="View resume" bn="রিজিউমে দেখুন" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}