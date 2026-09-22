import NakshatraFinder from "@/components/astrology/NakshatraFinder";
import WisdomBanner from "@/components/WisdomBanner";
import { NAKSHATRAS } from "@/data/nakshatras";
import { nakshatraThemes } from "@/data/interpretations/nakshatraThemes";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Find My Nakshatra",
  description:
    "Find your Vedic birth star (Nakshatra) and Pada — ruling planet, deity, symbol and traditional themes — free, calculated entirely in your browser.",
  path: "/nakshatra",
});

export default function NakshatraPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-3xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Find My Nakshatra</h1>
      <p className="mt-3 text-textMuted">
        Your Nakshatra (birth star) is the lunar mansion the Moon occupied at
        your birth — one of 27, each with its own ruling planet, deity,
        symbol and traditional themes. Enter your birth date, time and place
        below to find yours.
      </p>

      <div className="mt-8">
        <NakshatraFinder />
      </div>

      <div className="mt-10">
        <WisdomBanner category="nakshatra" />
      </div>

      <div className="mt-12">
        <h2 className="font-display text-2xl font-semibold">All 27 Nakshatras</h2>
        <p className="mt-2 text-sm text-textMuted">
          Browse the full traditional list, in order around the zodiac.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {NAKSHATRAS.map((n, i) => (
            <div key={n.name} className="card py-3">
              <div className="flex items-baseline justify-between gap-3">
                <p className="text-sm font-medium text-textPrimary">
                  {i + 1}. {n.name}
                </p>
                {nakshatraThemes[n.name] && (
                  <span className="text-xs text-gold/90">{nakshatraThemes[n.name].keyword}</span>
                )}
              </div>
              <p className="mt-1 text-xs text-textMuted">
                Ruled by {n.rulingPlanet} · {n.deity} · {n.gana}
              </p>
            </div>
          ))}
        </div>
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
