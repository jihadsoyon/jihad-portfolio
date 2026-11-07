"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export default function InquiryDropdown({ options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const selected = options.find((o) => o.id === value);

  // বাইরে click করলে বন্ধ
  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-foreground outline-none transition hover:border-primary/50 focus:border-primary/60"
      >
        <span className={selected ? "text-foreground" : "text-muted-foreground/60"}>
          {selected ? selected.label : "Choose what you need"}
        </span>
        <ChevronDown
          size={18}
          className={`text-muted-foreground transition duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {options.map((o, i) => {
              const isSelected = o.id === value;
              return (
                <motion.li
                  key={o.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onChange(o.id);
                      setOpen(false);
                    }}
                    className={`group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                      isSelected ? "bg-primary/10" : "hover:bg-muted"
                    }`}
                  >
                    <span
                      className={`mt-1 h-2 w-2 shrink-0 rounded-full transition ${
                        isSelected ? "bg-primary shadow-[0_0_10px_var(--primary)]" : "bg-border group-hover:bg-primary/60"
                      }`}
                    />
                    <span className="flex-1">
                      <span className="block text-sm font-semibold text-foreground">{o.label}</span>
                      <span className="block text-xs text-muted-foreground">{o.description}</span>
                    </span>
                    {isSelected && <Check size={16} className="mt-1 text-primary" />}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}