"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const initialState = { name: "", email: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "idle", text: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStatus({ type: "success", text: "আপনার message পাঠানো হয়েছে। ধন্যবাদ!" });
      setForm(initialState);
    } catch (err) {
      setStatus({ type: "error", text: err.message || "কিছু একটা সমস্যা হয়েছে।" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="আপনার নাম"
          className={inputClass}
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="আপনার email"
          className={inputClass}
          required
        />
      </div>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="আপনার message"
        rows={6}
        className={inputClass}
        required
      />

      {status.text && (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {status.text}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-7 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={16} />
        {loading ? "পাঠানো হচ্ছে..." : "Message পাঠান"}
      </button>
    </form>
  );
}