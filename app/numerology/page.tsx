import NumerologyForm from "@/components/numerology/NumerologyForm";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Numerology Calculator",
  description:
    "Calculate your Life Path, Destiny, Soul Urge and Personality numbers using standard Pythagorean numerology — free, and calculated entirely in your browser.",
  path: "/numerology",
});

export default function NumerologyPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">
        Your Numerology Profile
      </h1>
      <p className="mt-3 text-textMuted">
        Enter your full name and date of birth for a traditional Pythagorean
        numerology reading. This uses standard letter-to-number mapping
        (A–Z as 1–9, repeating) and preserves master numbers 11, 22 and 33.
      </p>

      <div className="mt-8">
        <NumerologyForm />
      </div>

      <div className="mt-10">
        <WisdomBanner category="numerology" />
      </div>

      <div className="mt-10 text-sm text-textMuted space-y-2">
        <h2 className="text-textPrimary font-medium">About this reading</h2>
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
