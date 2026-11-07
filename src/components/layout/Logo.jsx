"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* Avatar */}
      <span className="relative h-11 w-11 shrink-0">
        {/* ঘূর্ণায়মান gradient ring, hover-এ উজ্জ্বল হয় */}
        <motion.span
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[3px] rounded-full bg-[conic-gradient(from_0deg,var(--primary),#d946ef,#22d3ee,var(--primary))] opacity-60 blur-[2px] transition duration-500 group-hover:opacity-100 group-hover:blur-[4px]"
        />

        {/* Photo */}
        <span className="relative block h-full w-full overflow-hidden rounded-full bg-background p-[2px]">
          <img
            src="/images/jihad.png"
            alt={site.name}
            className="h-full w-full rounded-full object-cover object-top transition duration-500 group-hover:scale-110"
          />
        </span>

        {/* Active status dot */}
        <span className="absolute bottom-0 right-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-background">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          </span>
        </span>

        {/* Hover tag */}
        <span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full border border-border bg-card/90 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-500 opacity-0 shadow-lg backdrop-blur transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <T en="Available" bn="উপলব্ধ" />
        </span>
      </span>

      {/* Name & designation */}
      <span className="flex flex-col leading-none">
        <T
          as="span"
          className="bg-gradient-to-r from-foreground via-primary to-fuchsia-500 bg-clip-text text-base font-extrabold tracking-tight text-transparent transition-all duration-300 group-hover:tracking-wide sm:text-lg"
          en={site.name}
          bn={site.name_bn}
        />
        <span className="mt-1.5 flex items-center gap-2">
          <span className="relative h-px w-6 overflow-hidden rounded-full bg-border">
            <motion.span
              aria-hidden
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-primary to-fuchsia-500"
            />
          </span>
          <T
            as="span"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground transition group-hover:text-primary sm:text-[11px]"
            en={site.designation}
            bn={site.designation_bn}
          />
        </span>
      </span>
    </Link>
  );
}