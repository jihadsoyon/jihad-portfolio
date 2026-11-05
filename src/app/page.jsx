import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import Experience from "@/components/home/Experience";
import SkillsPreview from "@/components/home/SkillsPreview";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ArticlesPreview from "@/components/home/ArticlesPreview";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Experience />
      <SkillsPreview />
      <FeaturedProjects />
      <ArticlesPreview />
    </>
  );
}