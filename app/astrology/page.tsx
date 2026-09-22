import { Sparkles, Moon, Heart } from "lucide-react";
import CalculatorCard from "@/components/CalculatorCard";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Vedic Astrology",
  description:
    "Explore Vedic (Jyotish) astrology on AstroYoda: birth charts, Nakshatra and compatibility, calculated free from real astronomical data.",
  path: "/astrology",
});

export default function AstrologyHubPage() {
  return (
    <section className="container-page py-14 sm:py-20">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold text-center">
        Vedic Astrology
      </h1>
      <p className="mt-3 text-textMuted text-center max-w-2xl mx-auto">
        Your Lagna (Ascendant), Moon and Sun signs, planetary positions, birth
        star and traditional compatibility indicators — calculated from real
        astronomical data with a classical Lahiri ayanamsa, entirely in your
        browser.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
        <CalculatorCard
          icon={Sparkles}
          title="Birth Chart"
          description="Your Lagna, Moon and Sun signs, the classical planets, and a plain-language reading of your chart."
          href="/astrology/birth-chart"
          cta="Explore My Chart"
        />
        <CalculatorCard
          icon={Moon}
          title="Nakshatra"
          description="Find your birth star, its ruling deity and symbol, and what it traditionally represents."
          href="/nakshatra"
          cta="Find My Nakshatra"
        />
        <CalculatorCard
          icon={Heart}
          title="Compatibility"
          description="Traditional compatibility indicators between two birth charts, explained — not scored."
          href="/compatibility"
          cta="Check Compatibility"
        />
      </div>

      <div className="mt-10 max-w-2xl mx-auto">
        <WisdomBanner category="astrology" />
      </div>

      <div className="mt-10 max-w-2xl mx-auto text-sm text-textMuted space-y-2">
        <h2 className="text-textPrimary font-medium">About these readings</h2>
        <p>
          These are traditional, symbolic interpretations for self-reflection
          — not scientific claims or guarantees about your future. See our{" "}
          <a href="/disclaimer" className="underline hover:text-textPrimary">
            Disclaimer
          </a>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
