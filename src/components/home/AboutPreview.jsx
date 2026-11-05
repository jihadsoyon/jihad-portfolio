import { about } from "@/data/about";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* বাম পাশে video */}
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/40 via-transparent to-fuchsia-500/40 opacity-60 transition group-hover:opacity-100" />
          <div className="relative aspect-video">
            <iframe
              className="h-full w-full rounded-3xl"
              src={`https://www.youtube.com/embed/${about.youtubeId}`}
              title="About Jihad Soyon"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        {/* ডান পাশে text */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            About
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
            {about.paragraphs.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}