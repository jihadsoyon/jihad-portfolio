import ServiceCard from "@/components/services/ServiceCard";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import { services, toolkit } from "@/data/services";

export const metadata = {
  title: "Services",
  description: "Frontend, backend, full-stack, authentication, payments, AI and deployment services.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      {/* Header */}
      <header className="grid gap-10 md:grid-cols-5 md:items-end">
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Services</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Services shaped around{" "}
            <span className="bg-gradient-to-r from-primary via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
              what you are building.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            From a focused landing page to a full product with accounts and payments. Pick a service to see
            exactly what is included.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">At a glance</p>
          <div className="mt-5 grid grid-cols-2 gap-4">
            <div>
              <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-3xl font-extrabold text-transparent">
                {services.length}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Service areas</p>
            </div>
            <div>
              <p className="bg-gradient-to-r from-primary to-fuchsia-500 bg-clip-text text-3xl font-extrabold text-transparent">
                1
              </p>
              <p className="mt-1 text-xs text-muted-foreground">Clear plan per project</p>
            </div>
          </div>
          <p className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
            Remote-first delivery with regular, reviewable updates.
          </p>
        </div>
      </header>

      {/* Service cards */}
      <section className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <ServiceCard key={s.slug} service={s} index={i} />
        ))}
      </section>

      {/* Toolkit */}
      <section className="mt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Toolkit</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">The tools behind the work</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Dashed tags are areas I work in with a basic working knowledge.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {toolkit.map((group) => (
            <div key={group.title} className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{group.title}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item.name}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                      item.basic
                        ? "border border-dashed border-border text-muted-foreground"
                        : "border border-border bg-background text-foreground"
                    }`}
                  >
                    {item.name}
                    {item.basic && <span className="ml-1 text-muted-foreground/70">· basic</span>}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mt-28">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">How it works</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          From first message to launch
        </h2>
        <ProcessTimeline />
      </section>

      {/* CTA */}
      <section className="relative mt-28 overflow-hidden rounded-[2rem] border border-border bg-card/60 p-10 backdrop-blur md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--primary)_0%,transparent_70%)] opacity-20" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Not sure which service fits?</h2>
            <p className="mt-3 text-muted-foreground">
              Tell me your goal and what is getting in the way. I will suggest the right scope.
            </p>
          </div>
          <a
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
          >
            Discuss your project
            <span className="transition group-hover:translate-x-1">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}