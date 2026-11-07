"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

export default function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* ঘূর্ণায়মান gradient ring সহ monogram */}
      <span className="relative flex h-11 w-11 items-center justify-center">
        <motion.span
          aria-hidden
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-xl"
          style={{
            background:
              "conic-gradient(from 0deg, var(--primary), #d946ef, #22d3ee, var(--primary))",
          }}
        />
        <span className="absolute inset-[2px] rounded-[10px] bg-background" />
        <span className="relative bg-gradient-to-br from-primary to-fuchsia-500 bg-clip-text text-base font-extrabold tracking-tight text-transparent transition group-hover:scale-110">
          JS
        </span>
      </span>

      {/* নাম ও designation, একটির নিচে আরেকটি */}
      <span className="hidden flex-col leading-none sm:flex">
        <T
          as="span"
          className="text-base font-bold tracking-tight text-foreground"
          en={site.name}
          bn={site.name_bn}
        />
        <T
          as="span"
          className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary"
          en={site.designation}
          bn={site.designation_bn}
        />
      </span>
    </Link>
  );
}