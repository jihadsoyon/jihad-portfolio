import { Download, Mail, MapPin, Phone, ExternalLink } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import BackToHome from "@/components/layout/BackToHome";
import PrintButton from "@/components/resume/PrintButton";
import T from "@/components/i18n/T";
import { resume } from "@/data/resume";

export const metadata = {
  title: "Resume",
  description: "Jihad Soyon-এর resume। Print বা PDF download করুন।",
};

const SectionTitle = ({ en, bn }) => (
  <div className="mb-3 flex items-center gap-3">
    <T as="h2" className="text-sm font-extrabold uppercase tracking-[0.2em] text-foreground" en={en} bn={bn} />
    <span className="h-px flex-1 bg-gradient-to-r from-primary/60 to-transparent" />
  </div>
);

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24 pt-32">
      {/* Actions: print-এ এগুলো দেখাবে না */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <BackToHome />
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <a
            href="/resume/Resume-of-Jihad-Soyon.pdf"
            download="Resume-of-Jihad-Soyon.pdf"
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
          >
            <Download size={16} />
            <T en="Download PDF" bn="PDF ডাউনলোড" />
          </a>
        </div>
      </div>

      <article className="resume-sheet mt-8 overflow-hidden rounded-3xl border border-border bg-card/60 shadow-2xl backdrop-blur">
        {/* Header */}
        <header className="relative overflow-hidden border-b border-border p-8 md:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <h1 className="relative text-4xl font-black uppercase tracking-tight text-foreground md:text-5xl">
            {resume.name}
          </h1>
          <p className="relative mt-1 text-lg font-medium text-primary">{resume.role}</p>

          <div className="relative mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href={resume.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
              <Github size={14} /> GitHub
            </a>
            <a href={resume.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
              <ExternalLink size={14} /> Portfolio
            </a>
            <a href={`mailto:${resume.email}`} className="flex items-center gap-2 hover:text-foreground">
              <Mail size={14} /> Gmail
            </a>
            <a href={resume.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
              Facebook
            </a>
          </div>
        </header>

        <div className="grid gap-10 p-8 md:grid-cols-[1fr_1.6fr] md:p-10">
          {/* বাম কলাম */}
          <aside className="space-y-8 md:border-r md:border-border md:pr-8">
            <section>
              <SectionTitle en="Core strengths" bn="মূল শক্তি" />
              <ul className="space-y-2 text-sm text-muted-foreground">
                {resume.coreStrengths.map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="text-primary">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle en="Education" bn="শিক্ষা" />
              {resume.education.map((edu) => (
                <div key={edu.school}>
                  <p className="text-sm font-bold uppercase text-foreground">{edu.school}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                </div>
              ))}
            </section>

            <section>
              <SectionTitle en="Skills" bn="দক্ষতা" />
              <div className="space-y-3 text-sm text-muted-foreground">
                {resume.skills.map((s) => (
                  <p key={s.label}>
                    <span className="font-semibold text-foreground">{s.label}:</span> {s.items}
                  </p>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle en="Languages" bn="ভাষা" />
              <ul className="space-y-1 text-sm text-muted-foreground">
                {resume.languages.map((l) => (
                  <li key={l.language}>
                    {l.language}: {l.level}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <SectionTitle en="Location" bn="অবস্থান" />
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} /> {resume.location}
              </p>
              <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={14} /> {resume.phone}
              </p>
            </section>
          </aside>

          {/* ডান কলাম */}
          <div className="space-y-8">
            <section>
              <SectionTitle en="About me" bn="আমার সম্পর্কে" />
              <p className="text-sm leading-relaxed text-muted-foreground">{resume.about}</p>
            </section>

            <section>
              <SectionTitle en="Work experience" bn="কর্মজীবন" />
              {resume.experience.map((job) => (
                <div key={job.company}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-bold text-foreground">{job.company}</p>
                    <p className="text-sm font-semibold text-muted-foreground">{job.period}</p>
                  </div>
                  <p className="mt-1 text-sm font-semibold uppercase text-primary">{job.role}</p>
                  <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
                    {job.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>

            <section>
              <SectionTitle en="Projects" bn="প্রকল্প" />
              <div className="space-y-5">
                {resume.projects.map((p) => (
                  <div key={p.title}>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-bold uppercase text-foreground">{p.title}</p>
                      <a href={p.live} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                        Live link
                      </a>
                      <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-primary hover:underline">
                        Repo
                      </a>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <SectionTitle en="Interests" bn="আগ্রহ" />
              <p className="text-sm text-muted-foreground">{resume.interests.join(" • ")}</p>
            </section>
          </div>
        </div>
      </article>
    </section>
  );
}