"use client";

import Link from "next/link";
import { ArrowRight, ArrowUp, Mail, Phone } from "lucide-react";
import { Facebook, Github, Linkedin, WhatsApp } from "@/components/ui/BrandIcons";
import CurrentYear from "@/components/ui/CurrentYear";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

const quickLinks = [
  { href: "/about", en: "About", bn: "পরিচয়" },
  { href: "/skills", en: "Skills", bn: "দক্ষতা" },
  { href: "/projects", en: "Projects", bn: "প্রজেক্ট" },
  { href: "/services", en: "Services", bn: "সেবা" },
  { href: "/pricing", en: "Pricing", bn: "মূল্য" },
  { href: "/blog", en: "Blog", bn: "ব্লগ" },
  { href: "/contact", en: "Contact", bn: "যোগাযোগ" },
];

const socials = [
  { label: "GitHub", href: site.github, Icon: Github },
  { label: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { label: "Facebook", href: site.facebook, Icon: Facebook },
  { label: "WhatsApp", href: site.whatsappLink, Icon: WhatsApp },
];

const contactItems = [
  { href: `mailto:${site.email}`, value: site.email, Icon: Mail, hover: "group-hover:text-rose-400" },
  { href: site.whatsappLink, value: site.phoneDisplay, Icon: Phone, external: true, hover: "group-hover:text-emerald-400" },
];

export default function Footer() {
  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-border">
      <div className="pointer-events-none absolute -left-40 -top-40 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-10" />
      <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,#d946ef_0%,transparent_70%)] opacity-10" />

      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-start gap-12 md:grid-cols-12">
          {/* পরিচয় */}
          <div className="md:col-span-5">
            <T as="p" className="text-2xl font-extrabold tracking-tight text-foreground" en={site.name} bn={site.name_bn} />
            <T as="p" className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary" en={site.designation} bn={site.designation_bn} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building fast, accessible and deployable web applications with Next.js and the MERN stack.
            </p>

            <div className="mt-8 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:text-foreground"
                >
                  <Icon size={18} />
                  <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-semibold text-background opacity-0 transition group-hover:opacity-100">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              <T en="Explore" bn="এক্সপ্লোর" />
            </p>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground">
                    <span className="h-px w-0 bg-primary transition-all duration-300 group-hover:w-4" />
                    <T en={l.en} bn={l.bn} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* যোগাযোগ */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
              <T en="Get in touch" bn="যোগাযোগ" />
            </p>

            <ul className="mt-5 space-y-4">
              {contactItems.map(({ href, value, Icon, external, hover }) => (
                <li key={value}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 text-sm text-muted-foreground transition hover:text-foreground"
                  >
                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted transition duration-300 group-hover:scale-110 ${hover}`}>
                      <Icon size={16} />
                    </span>
                    <span className="truncate">{value}</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* একটি স্পষ্ট পরবর্তী ধাপ */}
            <Link
              href="/contact"
              className="group relative mt-8 flex items-center justify-between overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-fuchsia-500/10 px-5 py-4 transition duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/10"
            >
              <span>
                <span className="block text-sm font-semibold text-foreground">
                  <T en="Start a project" bn="প্রজেক্ট শুরু করুন" />
                </span>
                <span className="block text-xs text-muted-foreground">
                  <T en="Let's talk about your idea" bn="আপনার ধারণা নিয়ে কথা বলি" />
                </span>
              </span>
              <ArrowRight size={18} className="text-primary transition duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* নিচের অংশ */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © <CurrentYear /> <T en={site.name} bn={site.name_bn} />. <T en="All rights reserved." bn="সর্বস্বত্ব সংরক্ষিত।" />
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
          >
            <T en="Back to top" bn="উপরে যান" />
            <ArrowUp size={14} className="transition group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}