import BackToHome from "@/components/layout/BackToHome";
import AboutStory from "@/components/about/AboutStory";

export const metadata = {
  title: "About",
  description: "Jihad Soyon-এর পরিচয়, যাত্রাপথ ও কাজের নীতি।",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
      <BackToHome />
      <div className="mt-10">
        <AboutStory />
      </div>
    </div>
  );
}