"use client";

import { Printer } from "lucide-react";
import T from "@/components/i18n/T";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-full border border-border my-5 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted"
    >
      <Printer size={16} />
      <T en="Print" bn="প্রিন্ট" />
    </button>
  );
}