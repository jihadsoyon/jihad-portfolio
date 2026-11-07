import BackToHome from "@/components/layout/BackToHome";
import SkillsPreview from "@/components/home/SkillsPreview";
import Experience from "@/components/home/Experience";
export const metadata = {
  title: "Skills",
  description: "Jihad Soyon-এর প্রযুক্তিগত দক্ষতা।",
};
export default function SkillsPage() {
  return (
    <div>
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <BackToHome />
      </div>
      <SkillsPreview />
      <Experience />
    </div>
  );
}