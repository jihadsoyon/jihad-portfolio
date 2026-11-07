import { Suspense } from "react";
import BackToHome from "@/components/layout/BackToHome";
import ContactPageContent from "@/components/contact/ContactPageContent";

export const metadata = {
  title: "Contact",
  description: "Jihad Soyon-এর সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32">
      <BackToHome />
      <Suspense fallback={null}>
        <ContactPageContent />
      </Suspense>
    </div>
  );
}