"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";

const initial = { name: "", email: "", message: "" };

function Field({ label, children }) {
  return (
    <label className="group relative block">
      <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition group-focus-within:text-primary">
        {label}
      </span>
      {children}
      {/* Focus-এ রেখা ছড়িয়ে যাবে */}
      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 transition duration-500 group-focus-within:scale-x-100" />
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/50";

export default function ContactForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [message, setMessage] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm(initial);
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            required
            placeholder="Your name"
            className={inputClass}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </Field>
      </div>

      <Field label="Message">
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          required
          rows={6}
          placeholder="Tell me about your project or opportunity..."
          className={`${inputClass} resize-none`}
        />
      </Field>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            key="ok"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 rounded-xl bg-emerald-500/10 px-4 py-3 text-sm text-emerald-500"
          >
            <Check size={16} /> Message sent. Thank you!
          </motion.p>
        )}
        {status === "error" && (
          <motion.p
            key="err"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-500"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} className="transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        )}
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}