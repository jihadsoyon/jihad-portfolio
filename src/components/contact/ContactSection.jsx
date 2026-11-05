import { Mail, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/data/site";

export default function ContactSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Contact
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            কাজের জন্য যোগাযোগ করুন
          </h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Project, job বা যেকোনো প্রশ্ন থাকলে message পাঠান। আমি সাধারণত দ্রুতই উত্তর দিই।
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 text-foreground transition hover:text-primary"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <Mail size={18} />
              </span>
              {site.email}
            </a>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-foreground transition hover:text-primary"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
                <MessageCircle size={18} />
              </span>
              WhatsApp-এ message করুন
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur md:col-span-3 md:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}