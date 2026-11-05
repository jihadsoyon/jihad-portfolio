import BackToHome from "@/components/layout/BackToHome";
import ContactSection from "@/components/contact/ContactSection";

export default function ContactPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <BackToHome />
      </div>
      <ContactSection />
    </div>
  );
}