"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X } from "lucide-react";
import { WhatsApp } from "@/components/ui/BrandIcons";
import { site } from "@/data/site";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");

  // Escape চাপলে chatbox বন্ধ
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    const text = message.trim();
    if (!text) return;

    const fullText = name.trim()
      ? `Hi Jihad, I am ${name.trim()}.\n\n${text}`
      : `Hi Jihad,\n\n${text}`;

    const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(fullText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 ">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-3xl border border-border bg-card/95 shadow-2xl backdrop-blur-xl "
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-4 text-white ">
              <div className="flex items-center gap-3">
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
                  <img
                    src="/images/jihad.png"
                    alt={site.name}
                    className="h-full w-full object-cover object-top"
                  />
                  <span/>
                </span>
                <div>
                  <p className="font-semibold">{site.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="h-2 w-2 rounded-full bg-emerald-300" />
                    Usually replies quickly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 transition hover:bg-white/20 "
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-4 p-5">
              <div className="rounded-2xl rounded-tl-sm bg-muted px-4 py-3 text-sm text-foreground">
                Hello! 👋 Write your message below and it will open in WhatsApp directly to me.
              </div>

              <form onSubmit={handleSend} className="space-y-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className={inputClass}
                />
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Your message..."
                  rows={3}
                  required
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-fuchsia-500 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  <Send size={16} />
                  Send via WhatsApp
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Chat with me"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-3.5 font-semibold text-white shadow-xl shadow-primary/40"
      >
        {open ? <X size={20} /> : <WhatsApp size={20} />}
        {!open && <span className="hidden sm:inline cursor-pointer">Chat with me</span>}
      </motion.button>
    </div>
  );
}