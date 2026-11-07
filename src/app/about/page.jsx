import BackToHome from "@/components/layout/BackToHome";
import AboutPreview from "@/components/home/AboutPreview";
export const metadata = {
  title: "About",
  description: "Jihad Soyon সম্পর্কে জানুন।",
};
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