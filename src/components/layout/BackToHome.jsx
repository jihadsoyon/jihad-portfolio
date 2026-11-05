import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BackToHome() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition hover:-translate-x-1 hover:bg-muted"
    >
      <ArrowLeft size={16} />
      Back to home
    </Link>
  );
}