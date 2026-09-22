import BirthProfileForm from "@/components/astrology/BirthProfileForm";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Explore My Chart",
  description:
    "Calculate your Vedic (sidereal) birth chart — Lagna, Sun and Moon signs, planetary positions and Nakshatra — free, from real astronomical data, calculated entirely in your browser.",
  path: "/astrology/birth-chart",
});

export default function BirthChartPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Explore My Chart</h1>
      <p className="mt-3 text-textMuted">
        Enter your birth date, time and place for a Vedic (sidereal) birth
        chart: your Lagna (Ascendant), Sun and Moon signs, the classical
        planets, and your Moon&apos;s Nakshatra. Positions come from real
        astronomical calculations — never invented — with a traditional
        Lahiri ayanamsa applied to convert them to the sidereal zodiac.
      </p>

      <div className="mt-8">
        <BirthProfileForm />
      </div>

      <div className="mt-10">
        <WisdomBanner category="astrology" />
      </div>

      <div className="mt-10 text-sm text-textMuted space-y-2">
        <h2 className="text-textPrimary font-medium">About this reading</h2>
        <p>
          These are traditional, symbolic interpretations for self-reflection
          — not scientific claims or guarantees about your future. Exact
          birth time matters: the Ascendant changes roughly every two hours,
          so an approximate time gives an approximate Lagna. See our{" "}
          <a href="/disclaimer" className="underline hover:text-textPrimary">
            Disclaimer
          </a>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
