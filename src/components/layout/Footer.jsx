import Link from "next/link";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-lg font-semibold text-foreground">{site.name}</p>
          <p className="text-sm text-muted-foreground">{site.designation}</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
          >
            <Github size={18} />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
          >
            <Mail size={18} />
          </a>
          <a
            href={site.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground"
          >
            <Phone size={18} />
          </a>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
          <nav className="flex gap-4">
            <Link href="/projects" className="hover:text-foreground">Projects</Link>
            <Link href="/blog" className="hover:text-foreground">Blog</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </nav>
          <p>© {year} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}