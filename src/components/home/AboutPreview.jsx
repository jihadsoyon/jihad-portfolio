"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Sparkles } from "lucide-react";
import AboutVideo from "@/components/home/AboutVideo";
import T from "@/components/i18n/T";
import { about } from "@/data/about";

const ABOUT_THUMBNAIL = "/images/about-thumbnail.png";

const chapters = [
  { icon: Sparkles, en: "Who I am", bn: "আমি কে" },
  { icon: Code2, en: "What I build", bn: "আমি কী বানাই" },
  { icon: Rocket, en: "What's next", bn: "সামনে কী" },
];

const techChips = ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function AboutPreview() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-24">
      {/* পেছনের হালকা আলো */}
      <div className="pointer-events-none absolute -left-24 top-16 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20" />

      <div className="grid items-center gap-16 md:grid-cols-2">
        {/* বাম পাশে video */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <AboutVideo videoId={about.youtubeId} thumbnail={ABOUT_THUMBNAIL} title="About Jihad Soyon" />
        </motion.div>

        {/* ডান পাশে chapter cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span
            variants={rise}
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-primary"
          >
            <span className="h-px w-8 bg-gradient-to-r from-primary to-fuchsia-500" />
            <T en="About" bn="পরিচয়" />
          </motion.span>

          <motion.h2
            variants={rise}
            className="mt-4 text-4xl font-bold tracking-tight md:text-5xl"
          >
            <span className="bg-gradient-to-r from-foreground via-primary to-fuchsia-500 bg-clip-text text-transparent">
              {about.title}
            </span>
          </motion.h2>

          <ol className="mt-10 space-y-4">
            {chapters.map((c, i) => {
              const Icon = c.icon;
              const text = about.paragraphs[i];
              if (!text) return null;

              return (
                <motion.li
                  key={c.en}
                  variants={rise}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
                >
                  {/* বাঁ দিকের gradient bar, hover-এ জ্বলে */}
                  <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-fuchsia-500 opacity-0 transition duration-300 group-hover:opacity-100" />

                  <div className="flex gap-5">
                    <span
                      className="select-none font-mono text-3xl font-extrabold leading-none text-transparent"
                      style={{ WebkitTextStroke: "1px var(--primary)" }}
                    >
                      0{i + 1}
                    </span>

                    <div>
                      <div className="flex items-center gap-2 text-primary">
                        <Icon size={14} />
                        <T
                          as="span"
                          className="text-xs font-semibold uppercase tracking-widest"
                          en={c.en}
                          bn={c.bn}
                        />
                      </div>
                      <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>

          {/* প্রযুক্তির chip, এক এক করে আসবে */}
          <motion.ul variants={rise} className="mt-8 flex flex-wrap gap-2">
            {techChips.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
              >
                {tech}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>
    </section>
  );
}