import Hero from "@/components/Hero";
import FeatureGrid from "@/components/FeatureGrid";
import HoroscopePreview from "@/components/HoroscopePreview";
import PopularTopics from "@/components/PopularTopics";
import EducationalArticles from "@/components/EducationalArticles";
import WisdomBanner from "@/components/WisdomBanner";
import AboutSection from "@/components/AboutSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureGrid />
      <HoroscopePreview />
      <PopularTopics />
      <EducationalArticles />
      <section className="container-page py-8">
        <WisdomBanner category="results" />
      </section>
      <AboutSection />
    </>
  );
}
