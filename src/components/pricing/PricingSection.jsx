"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { packages } from "@/data/pricing";
import ContactForm from "@/components/contact/ContactForm";

// Package-এর তথ্যসহ modal খোলার জন্য form
function PackageModal({ pkg, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-background/70 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-2xl md:p-10"
      >
        {/* উপরের আলো */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-30" />

        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full border border-border p-2 text-muted-foreground transition hover:rotate-90 hover:text-foreground"
        >
          <X size={16} />
        </button>

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">Selected package</p>
          <h3 className="mt-2 text-2xl font-bold text-foreground">
            {pkg.name}
            {pkg.price !== "Custom" && (
              <span className="ml-2 text-lg font-semibold text-muted-foreground">
                {pkg.currency}
                {pkg.price}
              </span>
            )}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Share a few details and I will get back to you within a day.
          </p>

          <div className="mt-8">
            <ContactForm presetInquiry="collaboration" presetPackage={pkg.name} compact />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PricingSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative isolate px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Pricing</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Project-based{" "}
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              packages
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Clear scope, clear price, and clean code from the start. Pick a package to begin.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {packages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative flex flex-col overflow-hidden rounded-3xl border bg-card/60 p-8 backdrop-blur transition duration-500 hover:-translate-y-2 ${
                pkg.highlight
                  ? "border-primary/60 shadow-2xl shadow-primary/20"
                  : "border-border hover:border-primary/40"
              }`}
            >
              {pkg.highlight && (
                <span className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Most popular
                </span>
              )}

              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-fuchsia-500/30 opacity-0 transition duration-500 group-hover:opacity-100" />

              <div className="relative">
                <h3 className="text-xl font-bold text-foreground">{pkg.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pkg.tagline}</p>

                <div className="mt-8 flex items-end gap-2">
                  <span className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-5xl font-extrabold text-transparent">
                    {pkg.currency}
                    {pkg.price}
                  </span>
                  {pkg.unit && <span className="pb-2 text-sm text-muted-foreground">{pkg.unit}</span>}
                </div>

                <ul className="mt-8 space-y-3">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <Check size={12} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => setSelected(pkg)}
                className={`relative mt-10 w-full overflow-hidden rounded-full px-6 py-3 font-semibold transition hover:scale-[1.02] ${
                  pkg.highlight
                    ? "bg-gradient-to-r from-primary to-fuchsia-500 text-white shadow-lg shadow-primary/30"
                    : "border border-border text-foreground hover:border-primary/60 hover:bg-muted"
                }`}
              >
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <PackageModal pkg={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}