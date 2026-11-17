import { Code2, Rocket, Users } from "lucide-react";
import T from "@/components/i18n/T";

const cards = [
  {
    icon: Code2,
    title: { en: "MERN Stack", bn: "MERN স্ট্যাক" },
    text: { en: "Modern, responsive, scalable apps", bn: "আধুনিক, রেসপন্সিভ ও স্কেলেবল অ্যাপ" },
  },
  {
    icon: Rocket,
    title: { en: "Full-Stack Delivery", bn: "ফুল-স্ট্যাক ডেলিভারি" },
    text: { en: "From database to deployment, end to end", bn: "ডাটাবেস থেকে ডিপ্লয়মেন্ট, শুরু থেকে শেষ" },
  },
  {
    icon: Users,
    title: { en: "Collaborative", bn: "টিমওয়ার্ক" },
    text: { en: "Async-friendly, owns every project", bn: "Async-friendly, প্রতিটা প্রজেক্ট নিজের মতো করে দেখি" },
  },
];

const skills = ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"];

export default function AboutHighlights() {
  return (
    <div>
      <T
        as="p"
        className="text-2xl font-bold leading-snug tracking-tight text-foreground md:text-3xl"
        en="I build web products that are fast, scalable and a pleasure to use."
        bn="আমি এমন ওয়েব প্রোডাক্ট বানাই যা দ্রুত, স্কেলেবল এবং ব্যবহার করে আরাম পাওয়া যায়।"
      />

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.title.en} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-white">
                <Icon size={18} />
              </span>
              <T as="h3" className="mt-3 text-sm font-semibold text-foreground" en={c.title.en} bn={c.title.bn} />
              <T as="p" className="mt-1 text-xs leading-relaxed text-muted-foreground" en={c.text.en} bn={c.text.bn} />
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}