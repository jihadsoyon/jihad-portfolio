import BackToHome from "@/components/layout/BackToHome";
import ContactSection from "@/components/contact/ContactSection";
import { getServiceBySlug } from "@/data/services";

export const metadata = {
  title: "Contact",
  description: "Jihad Soyon-এর সাথে যোগাযোগ করুন।",
};

export default async function ContactPage({ searchParams }) {
  const { service: slug } = await searchParams;
  const service = getServiceBySlug(slug);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-32">
      <BackToHome />
      <ContactSection
        presetInquiry={service?.inquiry ?? ""}
        presetPackage={service?.title ?? ""}
      />
    </div>
  );
}