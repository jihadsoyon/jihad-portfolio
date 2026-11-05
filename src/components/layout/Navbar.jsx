"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import LanguageToggle from "@/components/i18n/LanguageToggle";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

const links = [
  { href: "/", en: "Home", bn: "হোম" },
  { href: "/about", en: "About", bn: "পরিচয়" },
  { href: "/skills", en: "Skills", bn: "দক্ষতা" },
  { href: "/projects", en: "Projects", bn: "প্রজেক্ট" },
  { href: "/services", en: "Service", bn: "সেবা" },
  { href: "/blog", en: "Blog", bn: "ব্লগ" },
  { href: "/contact", en: "Contact", bn: "যোগাযোগ" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 font-bold text-white shadow-lg shadow-primary/30 transition group-hover:scale-105">
            JS
          </span>
          <T as="span" className="hidden font-semibold text-foreground sm:block" en={site.name} bn={site.name_bn} />
        </Link>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 rounded-full border border-border bg-card/70 p-1 backdrop-blur xl:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(link.href)
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <T en={link.en} bn={link.bn} />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition hover:opacity-80 md:inline-block"
          >
            <T en="Hire me" bn="কাজের জন্য যোগাযোগ" />
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
      {open && (
        <div className="border-t border-border bg-background/95 backdrop-blur-xl xl:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 p-4">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <T en={link.en} bn={link.bn} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}