import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ProcessTimeline from "@/components/services/ProcessTimeline";
import { getServiceBySlug, services } from "@/data/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return { title: service.title, description: service.short };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = services.filter((s) => s.slug !== slug).slice(0, 2);

  return (
    <article className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <Link
        href="/services"
        className="group inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition hover:border-primary/50 hover:bg-muted"
      >
        <ArrowLeft size={16} className="transition group-hover:-translate-x-1" />
        All services
      </Link>

      {/* Header */}
      <header className="mt-12 grid gap-10 md:grid-cols-5 md:items-end">
        <div className="md:col-span-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Service</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{service.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{service.short}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?service=${service.slug}`}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
            >
              Discuss this service
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-semibold text-foreground transition hover:border-primary/60 hover:bg-muted"
            >
              Explore all services
            </Link>
          </div>
        </div>

        <aside className="rounded-3xl border border-border bg-card/60 p-6 backdrop-blur md:col-span-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Best for</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{service.idealFor}</p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">You receive</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground">{service.deliverables}</p>
        </aside>
      </header>

      {/* Included + stack */}
      <section className="mt-20 grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground">What is included</h2>
          <ul className="mt-6 space-y-4">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-8 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground">Tools and stack</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.stack.map((t) => {
              const isBasic = service.basics.includes(t);
              return (
                <span
                  key={t}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    isBasic
                      ? "border border-dashed border-border text-muted-foreground"
                      : "border border-border bg-background text-foreground"
                  }`}
                >
                  {t}
                  {isBasic && <span className="ml-1 text-muted-foreground/70">· basic</span>}
                </span>
              );
            })}
          </div>
          {service.basics.length > 0 && (
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Dashed tags are areas I know at a basic level. I will be honest about scope if a project needs more depth.
            </p>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="mt-24">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">How we work together</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">A clear path, step by step</h2>
        <ProcessTimeline />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Related services</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex items-center justify-between rounded-3xl border border-border bg-card/60 p-6 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-primary/50"
              >
                <div>
                  <p className="text-lg font-bold text-foreground">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
                </div>
                <ArrowRight size={20} className="shrink-0 text-primary transition group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="relative mt-24 overflow-hidden rounded-[2rem] border border-border bg-card/60 p-10 backdrop-blur md:p-14">
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-[radial-gradient(circle,#d946ef_0%,transparent_70%)] opacity-15" />
        <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">Ready to talk about {service.title.toLowerCase()}?</h2>
            <p className="mt-3 text-muted-foreground">
              Share your goal and timeline. I will reply within a day with next steps.
            </p>
          </div>
          <Link
            href={`/contact?service=${service.slug}`}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
          >
            Discuss your project
            <ArrowRight size={18} className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </article>
  );
}