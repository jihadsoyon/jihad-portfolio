import { Download, Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import BackToHome from "@/components/layout/BackToHome";
import PrintButton from "@/components/resume/PrintButton";
import T from "@/components/i18n/T";
import { resume } from "@/data/resume";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";

export const metadata = {
  title: "Resume",
  description: "Jihad Soyon-এর resume। Print বা PDF download করুন।",
};

function Section({ en, bn, children }) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <T as="h2" className="text-xs font-bold uppercase tracking-[0.25em] text-primary" en={en} bn={bn} />
        <span className="h-px flex-1 bg-border" />
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <section className="mx-auto max-w-4xl px-6 pb-24 pt-32">
      {/* Actions: print-এ এগুলো দেখাবে না */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4">
        <BackToHome />
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <a
            href="/resume/jihad-cv.pdf"
            download
            className="inline-flex items-center gap-2 my-5 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105"
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
          <h1 className="relative text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {resume.name}
          </h1>
          <p className="relative mt-2 text-lg font-medium text-primary">{resume.role}</p>

          <div className="relative mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin size={14} /> {resume.location}
            </span>
            <a href={`mailto:${resume.email}`} className="flex items-center gap-2 hover:text-foreground">
              <Mail size={14} /> {resume.email}
            </a>
            <a href={resume.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
              <Github size={14} /> github.com/jihadsoyon
            </a>
            <a href={resume.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground">
              <Linkedin size={14} /> linkedin.com/in/jihad-soyon
            </a>
          </div>
        </header>

        <div className="space-y-12 p-8 md:p-10">
          <Section en="Summary" bn="সারসংক্ষেপ">
            <p className="leading-relaxed text-muted-foreground">{resume.summary}</p>
          </Section>

          <Section en="Experience" bn="অভিজ্ঞতা">
            <div className="space-y-8">
              {experiences.map((exp, i) => (
                <div key={i} className="grid gap-2 md:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="font-semibold text-foreground">{exp.role}</h3>
                    <p className="text-sm text-primary">{exp.company}</p>
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                      {exp.points.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <span className="h-fit rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    {exp.period}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <Section en="Skills" bn="দক্ষতা">
            <div className="grid gap-5 md:grid-cols-3">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="text-sm font-semibold text-foreground">{group.title}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span key={s} className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section en="Education" bn="শিক্ষা">
            <div className="space-y-4">
              {resume.education.map((edu, i) => (
                <div key={i} className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{edu.period}</span>
                </div>
              ))}
            </div>
          </Section>
        </div>
      </article>
    </section>
  );
}