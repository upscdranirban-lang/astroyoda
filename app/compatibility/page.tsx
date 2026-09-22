import CompatibilityForm from "@/components/astrology/CompatibilityForm";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Compatibility",
  description:
    "Traditional Vedic compatibility indicators between two birth charts — Moon sign, Sun sign, Ascendant and Nakshatra — explained, never scored. Free, calculated entirely in your browser.",
  path: "/compatibility",
});

export default function CompatibilityPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-4xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Compatibility</h1>
      <p className="mt-3 text-textMuted">
        Enter both people&apos;s birth details to see traditional Vedic
        compatibility indicators between their charts — how their Moon,
        Sun, Ascendant and Nakshatra placements traditionally relate. This
        is a qualitative, reflective tool, not a match score.
      </p>

      <div className="mt-8">
        <CompatibilityForm />
      </div>

      <div className="mt-10">
        <WisdomBanner category="compatibility" />
      </div>

      <div className="mt-10 text-sm text-textMuted space-y-2">
        <h2 className="text-textPrimary font-medium">About this reading</h2>
        <p>
          These are traditional, symbolic interpretations for self-reflection
          — not scientific claims or guarantees about your relationship. This
          page deliberately doesn&apos;t do formal Guna Milan / Kundli
          matching or a Manglik (Mangal Dosha) check — those are more
          detailed, specialist analyses beyond what a quick free tool like
          this should claim to offer responsibly. See our{" "}
          <a href="/disclaimer" className="underline hover:text-textPrimary">
            Disclaimer
          </a>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
