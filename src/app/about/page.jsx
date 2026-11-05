import BackToHome from "@/components/layout/BackToHome";
import AboutPreview from "@/components/home/AboutPreview";

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <BackToHome />
      </div>
      <AboutPreview />
    </div>
  );
}