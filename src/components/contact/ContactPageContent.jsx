"use client";

import { useSearchParams } from "next/navigation";
import ContactSection from "@/components/contact/ContactSection";
import { getServiceBySlug } from "@/data/services";

// URL থেকে service পড়া হয় client-এ, তাই build-এ কোনো বাধা হয় না
export default function ContactPageContent() {
  const params = useSearchParams();
  const service = getServiceBySlug(params.get("service"));

  return (
    <ContactSection
      presetInquiry={service?.inquiry ?? ""}
      presetPackage={service?.title ?? ""}
    />
  );
}