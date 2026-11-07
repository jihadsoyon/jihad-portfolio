"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import AboutVideo from "@/components/home/AboutVideo";
import T from "@/components/i18n/T";
import { about } from "@/data/about";

const ABOUT_THUMBNAIL = "/images/about-thumbnail.png";

export default function AboutPreview() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24">
      {/* Theme-এর সাথে মিলে যাওয়া হালকা আলো, light ও dark দুই mode-এই কাজ করে */}
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20" />
      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,#d946ef_0%,transparent_70%)] opacity-15" />

      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <AboutVideo videoId={about.youtubeId} thumbnail={ABOUT_THUMBNAIL} title="About Jihad Soyon" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <T as="span" className="text-xs font-semibold uppercase tracking-[0.3em] text-primary" en="About" bn="পরিচয়" />
            <T
              as="h2"
              className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl"
              en="About Myself"
              bn="আমার সম্পর্কে"
            />
            <p className="mt-6 line-clamp-4 text-lg leading-relaxed text-muted-foreground">
              {about.paragraphs[0]}
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              <T en="Read my full story" bn="পুরো গল্পটি পড়ুন" />
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}