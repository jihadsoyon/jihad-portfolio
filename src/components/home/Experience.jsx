import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Experience
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          আমার কর্মজীবন
        </h2>
      </div>

      <div className="relative mt-12 border-l-2 border-border pl-8">
        {experiences.map((exp, i) => (
          <div key={i} className="relative pb-12 last:pb-0">
            {/* timeline dot */}
            <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-4 ring-primary/30">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-fuchsia-500" />
            </span>

            <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
              <span className="inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {exp.period}
              </span>
              <h3 className="mt-3 text-xl font-semibold text-foreground">{exp.role}</h3>
              <p className="text-primary">{exp.company}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-muted-foreground">
                {exp.points.map((point, j) => (
                  <li key={j}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}