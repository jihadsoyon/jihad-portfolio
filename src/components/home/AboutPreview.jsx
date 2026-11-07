import AboutVideo from "@/components/home/AboutVideo";
import { about } from "@/data/about";

const ABOUT_THUMBNAIL = "/images/about-thumbnail.png";

export default function AboutPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid items-center gap-12 md:grid-cols-2">
        {/* বাম পাশে thumbnail, click করলে video */}
        <AboutVideo
          videoId={about.youtubeId}
          thumbnail={ABOUT_THUMBNAIL}
          title="About Jihad Soyon"
        />

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