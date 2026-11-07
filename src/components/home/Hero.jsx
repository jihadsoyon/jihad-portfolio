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
import { ArrowRight, FileText, Mail } from "lucide-react";
import { Facebook, Github, Linkedin, WhatsApp } from "@/components/ui/BrandIcons";
import PhotoStage from "@/components/home/PhotoStage";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

const roles = [
  { en: "MERN Stack Developer", bn: "MERN স্ট্যাক ডেভেলপার" },
  { en: "Next.js Engineer", bn: "Next.js ইঞ্জিনিয়ার" },
  { en: "Full-Stack Problem Solver", bn: "ফুল-স্ট্যাক সমস্যা সমাধানকারী" },
];

const socials = [
  {
    key: "whatsapp",
    href: site.whatsappLink,
    label: "WhatsApp",
    Icon: WhatsApp,
    external: true,
    color: "hover:bg-[#25D366] hover:border-[#25D366]",
  },
  {
    key: "facebook",
    href: site.facebook,
    label: "Facebook",
    Icon: Facebook,
    external: true,
    color: "hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  {
    key: "github",
    href: site.github,
    label: "GitHub",
    Icon: Github,
    external: true,
    color: "hover:bg-[#24292F] hover:border-[#24292F]",
  },
  {
    key: "linkedin",
    href: site.linkedin,
    label: "LinkedIn",
    Icon: Linkedin,
    external: true,
    color: "hover:bg-[#0A66C2] hover:border-[#0A66C2]",
  },
  {
    key: "email",
    href: `mailto:${site.email}`,
    label: "Email",
    Icon: Mail,
    external: false,
    color: "hover:bg-[#EA4335] hover:border-[#EA4335]",
  },
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 120, damping: 20 });
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX}px ${spotY}px, rgba(129,140,248,0.18), transparent 70%)`;

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

      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 px-6 py-24 md:grid-cols-2">
        {/* Left */}
        <div>
          {/* Eyebrow with rotating border */}
          <motion.span {...reveal(0)} className="relative inline-flex overflow-hidden rounded-full p-[1px]">
            <motion.span
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[300%] w-[300%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,var(--primary),#d946ef,#22d3ee,var(--primary))]"
            />
            <span className="relative inline-flex items-center gap-2 rounded-full bg-card px-4 py-1.5 text-sm text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <T en="Available for Work" bn="কাজের জন্য উন্মুক্ত" />
            </span>
          </motion.span>

          <motion.h1
            {...reveal(1)}
            className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl"
          >
            <T en="Hi, I'm" bn="আসসালামু আলাইকুম, আমি" />{" "}
            <T
              as="span"
              className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent"
              en={site.name}
              bn={site.name_bn}
            />
          </motion.h1>

          {/* Rotating role with caret */}
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
                <span className="ml-1 inline-block h-5 w-[2px] animate-pulse bg-primary align-middle" />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.p {...reveal(3)} className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            <T en={site.tagline} bn={site.tagline_bn} />
          </motion.p>

          {/* CTA */}
          <motion.div {...reveal(4)} className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              <motion.span
                aria-hidden
                animate={{ left: ["-40%", "140%"] }}
                transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/30"
              />
              <span className="relative">
                <T en="View Projects" bn="প্রজেক্ট দেখুন" />
              </span>
              <ArrowRight size={18} className="relative transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resume"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
            >
              <FileText size={18} className="transition group-hover:-translate-y-0.5" />
              <T en="Resume" bn="রিজিউমে" />
            </Link>
          </motion.div>

          {/* Contact grid */}
          <motion.ul {...reveal(5)} className="mt-10 flex flex-wrap items-center gap-3">
            {socials.map(({ key, href, label, Icon, external, color }) => (
              <li key={key}>
                <a
                  href={href}
                  aria-label={label}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card/60 text-muted-foreground backdrop-blur transition duration-300 hover:-translate-y-1 hover:scale-110 hover:text-white hover:shadow-xl ${color}`}
                >
                  <Icon size={20} />
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-semibold text-background opacity-0 transition duration-200 group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Right */}
        <PhotoStage />
      </div>
    </section>
  );
}