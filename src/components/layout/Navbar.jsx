"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import Logo from "@/components/layout/Logo";
import T from "@/components/i18n/T";

const links = [
  { href: "/", en: "Home", bn: "হোম" },
  { href: "/about", en: "About", bn: "পরিচয়" },
  { href: "/skills", en: "Skills", bn: "দক্ষতা" },
  { href: "/projects", en: "Projects", bn: "প্রজেক্ট" },
  { href: "/services", en: "Service", bn: "সেবা" },
  { href: "/blog", en: "Blog", bn: "ব্লগ" },
  { href: "/contact", en: "Contact", bn: "যোগাযোগ" },
];

const spring = { type: "spring", stiffness: 380, damping: 30 };

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // route বদলালে mobile menu বন্ধ
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl border px-3 transition-all duration-500 ${
          scrolled
            ? "h-14 border-border bg-background/80 shadow-2xl shadow-primary/10 backdrop-blur-2xl"
            : "h-16 border-border/60 bg-card/50 backdrop-blur-xl"
        }`}
      >
        <Logo />

        {/* Desktop menu with animated active pill */}
        <ul className="hidden items-center gap-1 xl:flex">
          {links.map((link) => {
            const active = isActive(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={spring}
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 shadow-lg shadow-primary/30"
                    />
                  )}
                  <span className="relative">
                    <T en={link.en} bn={link.bn} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />

          <Link
            href="/contact"
            className="group relative hidden overflow-hidden rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition hover:scale-105 md:inline-flex"
          >
            <motion.span
              aria-hidden
              animate={{ left: ["-40%", "140%"] }}
              transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
              className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/30"
            />
            <span className="relative">
              <T en="Hire me" bn="কাজের জন্য যোগাযোগ" />
            </span>
          </Link>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            className="rounded-full border border-border p-2 text-foreground xl:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-border bg-background/95 p-3 shadow-2xl backdrop-blur-xl xl:hidden"
          >
            <ul className="flex flex-col gap-1">
              {links.map((link, i) => {
                const active = isActive(link.href);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-gradient-to-r from-primary to-fuchsia-500 text-white"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <T en={link.en} bn={link.bn} />
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}