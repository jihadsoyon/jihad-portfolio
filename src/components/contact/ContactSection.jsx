"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail } from "lucide-react";
import { Facebook, WhatsApp } from "@/components/ui/BrandIcons";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/data/site";

const channels = [
  {
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    Icon: Mail,
    hover: "hover:border-rose-400/60 hover:text-rose-400",
  },
  {
    label: "WhatsApp",
    value: site.phoneDisplay,
    href: site.whatsappLink,
    Icon: WhatsApp,
    external: true,
    hover: "hover:border-emerald-400/60 hover:text-emerald-400",
  },
  {
    label: "Facebook",
    value: "jihad.soyon",
    href: site.facebook,
    Icon: Facebook,
    external: true,
    hover: "hover:border-sky-400/60 hover:text-sky-400",
  },
];

function GlassPanel({ children, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(50);
  const y = useMotionValue(50);
  const gx = useSpring(x, { stiffness: 120, damping: 20 });
  const gy = useSpring(y, { stiffness: 120, damping: 20 });
  const bg = useTransform([gx, gy], ([a, b]) =>
    `radial-gradient(420px circle at ${a}% ${b}%, rgba(129,140,248,0.14), transparent 60%)`
  );

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-[2rem] border border-border bg-card/60 backdrop-blur-xl ${className}`}
    >
      <motion.div aria-hidden style={{ background: bg }} className="pointer-events-none absolute inset-0" />
      <div className="relative">{children}</div>
    </div>
  );
}

export default function ContactSection({ presetInquiry = "", presetPackage = "" }) {
  return (
    <section className="relative isolate overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute -left-40 top-1/3 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_65%)] opacity-10" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,#d946ef_0%,transparent_65%)] opacity-10" />

      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-2"
          >
            {presetPackage && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Discussing: {presetPackage}
              </p>
            )}

            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Available for work
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
              Let&apos;s build something{" "}
              <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
                together.
              </span>
            </h2>

            <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">
              Have a project, a remote role or a question? Send a message and I usually reply within a day.
            </p>

            <div className="mt-10 space-y-3">
              {channels.map(({ label, value, href, Icon, external, hover }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`group/ch flex items-center gap-4 rounded-2xl border border-border bg-card/60 px-4 py-3 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${hover}`}
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground transition duration-300 group-hover/ch:scale-110">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium text-foreground">{value}</span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-3"
          >
            <GlassPanel className="p-8 md:p-10">
              <ContactForm presetInquiry={presetInquiry} presetPackage={presetPackage} />
            </GlassPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}