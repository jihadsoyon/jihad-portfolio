import BackToHome from "@/components/layout/BackToHome";
import PricingSection from "@/components/pricing/PricingSection";

export const metadata = {
  title: "Pricing",
  description: "Project-based pricing ও package-এর তথ্য।",
};

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pt-32">
      <BackToHome />
      <PricingSection />
    </div>
  );
}