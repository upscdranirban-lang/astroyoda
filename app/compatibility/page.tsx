import CompatibilityForm from "@/components/astrology/CompatibilityForm";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Compatibility",
  description:
    "Traditional Vedic compatibility indicators between two birth charts, plus the classical 36-point Guna Milan (Ashtakoot) score — Moon sign, Sun sign, Ascendant, Nakshatra and all 8 kootas, explained. Free, calculated entirely in your browser.",
  path: "/compatibility",
});

export default function CompatibilityPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-4xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Compatibility</h1>
      <p className="mt-3 text-textMuted">
        Enter both people&apos;s birth details to see traditional Vedic
        compatibility indicators between their charts — how their Moon,
        Sun, Ascendant and Nakshatra placements traditionally relate, plus
        the classical Guna Milan (Ashtakoot) score out of 36.
      </p>

      <div className="mt-8">
        <CompatibilityForm />
      </div>

      <div className="mt-10">
        <WisdomBanner category="compatibility" />
      </div>

      <div className="mt-10 text-sm text-textMuted space-y-2">
        <h2 className="text-textPrimary font-medium">About the Guna Milan score</h2>
        <p>
          The Guna Milan score follows the traditional eight-koota
          (Ashtakoot) system — Varna, Vashya, Tara, Yoni, Graha Maitri,
          Gana, Bhakoot and Nadi — cross-checked against multiple
          traditional references. Two of the eight factors (Yoni and
          Vashya) genuinely have contested exact point values across
          classical sources for their middle tiers, so those two use a
          simplified 3-tier scoring rather than asserting one contested
          version as definitive; every other factor follows the full
          traditional rule. This page doesn&apos;t include a Manglik
          (Mangal Dosha) check, which is a separate, more specialist
          analysis.
        </p>
        <p>
          These are traditional, symbolic interpretations for
          self-reflection — not scientific claims or guarantees about your
          relationship. See our{" "}
          <a href="/disclaimer" className="underline hover:text-textPrimary">
            Disclaimer
          </a>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
