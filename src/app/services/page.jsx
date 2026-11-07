import { Code2, Layout, Rocket, Server } from "lucide-react";
import BackToHome from "@/components/layout/BackToHome";
export const metadata = {
  title: "Services",
  description: "Jihad Soyon-এর web development সেবা।",
};
const services = [
  {
    icon: Layout,
    title: "Frontend Development",
    description:
      "Next.js ও React দিয়ে দ্রুত, responsive ও accessible user interface তৈরি।",
  },
  {
    icon: Server,
    title: "Backend & API",
    description:
      "Express.js ও MongoDB দিয়ে secure REST API ও authentication system তৈরি।",
  },
  {
    icon: Code2,
    title: "Full-stack Web App",
    description:
      "Idea থেকে production পর্যন্ত পুরো MERN stack web application বানানো।",
  },
  {
    icon: Rocket,
    title: "Deployment & Maintenance",
    description:
      "Vercel বা অন্য platform-এ deploy, performance tuning ও পরবর্তী maintenance।",
  },
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <BackToHome />

      <div className="mt-8 max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Services
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
          কী কী সেবা দিতে পারি
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Web development-এর প্রতিটি ধাপে সহায়তা করতে পারি, ছোট landing page থেকে
          পুরো full-stack application পর্যন্ত।
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {services.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="group rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-fuchsia-500 text-white">
              <Icon size={22} />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-foreground">{title}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}