"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import InquiryDropdown from "@/components/contact/InquiryDropdown";
import { budgetOptions, inquiryTypes, timelineOptions } from "@/data/inquiry";

const initial = { name: "", email: "", whatsapp: "", inquiry: "", budget: "", timeline: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground/60 focus:border-primary/60";

function Field({ label, children, optional = false }) {
  return (
    <label className="group relative block">
      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition group-focus-within:text-primary">
        {label}
        {optional && <span className="normal-case tracking-normal text-muted-foreground/60">(optional)</span>}
      </span>
      {children}
      <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 transition duration-500 group-focus-within:scale-x-100" />
    </label>
  );
}

export default function ContactForm({ presetInquiry = "", presetPackage = "", compact = false }) {
  const [form, setForm] = useState({ ...initial, inquiry: presetInquiry });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const selected = inquiryTypes.find((t) => t.id === form.inquiry);
  const showExtras = selected?.showBudget ?? false;

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.inquiry) {
      setError("Please choose what you need.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          inquiryLabel: selected?.label,
          packageName: presetPackage || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");

      setStatus("success");
      setForm({ ...initial, inquiry: presetInquiry });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setError(err.message);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-5" : "space-y-6"}>
      {!presetInquiry && (
        <Field label="I'm reaching out about">
          <InquiryDropdown
            options={inquiryTypes}
            value={form.inquiry}
            onChange={(id) => setForm({ ...form, inquiry: id })}
          />
        </Field>
      )}

      <AnimatePresence mode="wait">
        {selected && (
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-primary/20 bg-primary/5 px-5 py-4"
          >
            <p className="text-sm font-semibold text-foreground">{selected.heading}</p>
            {presetPackage && (
              <p className="mt-1 text-xs text-muted-foreground">Package: {presetPackage}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Name">
          <input name="name" value={form.name} onChange={onChange} required placeholder="Your name" className={inputClass} />
        </Field>
        <Field label="Email">
          <input type="email" name="email" value={form.email} onChange={onChange} required placeholder="you@example.com" className={inputClass} />
        </Field>
      </div>

      <Field label="WhatsApp" optional>
        <input name="whatsapp" value={form.whatsapp} onChange={onChange} placeholder="+880 1XXX-XXXXXX" className={inputClass} />
      </Field>

      <AnimatePresence initial={false}>
        {showExtras && (
          <motion.div
            key="extras"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="grid gap-6 overflow-hidden md:grid-cols-2"
          >
            <Field label="Budget" optional>
              <select name="budget" value={form.budget} onChange={onChange} className={inputClass}>
                <option value="">Select a range</option>
                {budgetOptions.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </Field>
            <Field label="Timeline" optional>
              <select name="timeline" value={form.timeline} onChange={onChange} className={inputClass}>
                <option value="">Select a timeline</option>
                {timelineOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </motion.div>
        )}
      </AnimatePresence>

      <Field label="Message">
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          required
          rows={compact ? 4 : 6}
          placeholder={selected?.placeholder ?? "Choose an option above to see what to write."}
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
            <Check size={16} /> Request sent. I will reply within a day.
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
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
      >
        {status === "sending" ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Send size={18} className="transition duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
        )}
        {status === "sending" ? "Sending..." : presetPackage ? "Submit project request" : "Send message"}
      </button>
    </form>
  );
}