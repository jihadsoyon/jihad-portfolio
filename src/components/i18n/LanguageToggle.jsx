"use client";

import { useEffect, useState } from "react";

export default function LanguageToggle() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(document.documentElement.classList.contains("lang-bn") ? "bn" : "en");
  }, []);

  const toggle = () => {
    const next = lang === "en" ? "bn" : "en";
    const html = document.documentElement;
    html.classList.remove("lang-en", "lang-bn");
    html.classList.add(`lang-${next}`);
    html.lang = next;
    localStorage.setItem("lang", next);
    setLang(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Change language"
      className="rounded-full border border-border px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
    >
      {lang === "en" ? "বাংলা" : "EN"}
    </button>
  );
}