import { Sparkles, Hash, Moon, Heart } from "lucide-react";
import CalculatorCard from "@/components/CalculatorCard";

export default function FeatureGrid() {
  return (
    <section className="container-page py-14">
      <h2 className="section-heading text-center">Start with what you&apos;re curious about</h2>
      <p className="mt-2 text-center text-sm text-textMuted max-w-md mx-auto">
        Each tool takes a couple of minutes and gives you a traditional,
        clearly explained reading — no account needed.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <CalculatorCard
          icon={Sparkles}
          title="Birth Chart"
          description="Your Lagna, Moon and Sun signs, planetary positions, and a plain-language reading of your chart."
          href="/astrology/birth-chart"
          cta="Explore My Chart"
        />
        <CalculatorCard
          icon={Hash}
          title="Numerology"
          description="Life Path, Destiny, Soul Urge and Personality numbers from your name and date of birth."
          href="/numerology"
          cta="Discover My Numbers"
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
    </section>
  );
}
