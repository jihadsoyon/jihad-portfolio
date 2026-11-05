import { skillGroups } from "@/data/skills";

export default function SkillsPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Skills
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          আমার দক্ষতা
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50"
          >
            <h3 className="text-lg font-semibold text-foreground">{group.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground transition hover:border-primary hover:text-primary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}