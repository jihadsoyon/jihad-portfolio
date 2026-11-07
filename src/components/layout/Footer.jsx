import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/BrandIcons";
import CurrentYear from "@/components/ui/CurrentYear";
import T from "@/components/i18n/T";
import { site } from "@/data/site";

const iconLink =
  "rounded-full border border-border p-2.5 text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 md:flex-row">
        <div className="text-center md:text-left">
          <T as="p" className="text-lg font-semibold text-foreground" en={site.name} bn={site.name_bn} />
          <T as="p" className="text-sm text-muted-foreground" en={site.designation} bn={site.designation_bn} />
        </div>

        <div className="flex items-center gap-3">
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={iconLink}>
            <Github size={18} />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={iconLink}>
            <Linkedin size={18} />
          </a>
          <a href={`mailto:${site.email}`} aria-label="Email" className={iconLink}>
            <Mail size={18} />
          </a>
          <a href={site.whatsappLink} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className={iconLink}>
            <Phone size={18} />
          </a>
        </div>

        <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground md:items-end">
          <nav className="flex gap-4">
            <Link href="/projects" className="hover:text-foreground">
              <T en="Projects" bn="প্রজেক্ট" />
            </Link>
            <Link href="/blog" className="hover:text-foreground">
              <T en="Blog" bn="ব্লগ" />
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              <T en="Contact" bn="যোগাযোগ" />
            </Link>
          </nav>
          <p>
            © <CurrentYear /> <T en={site.name} bn={site.name_bn} />.{" "}
            <T en="All rights reserved." bn="সর্বস্বত্ব সংরক্ষিত।" />
          </p>
        </div>
      </div>
    </footer>
  );
}