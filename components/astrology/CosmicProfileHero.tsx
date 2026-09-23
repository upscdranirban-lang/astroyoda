import type { BirthChartResult } from "@/types/astrology";

interface CosmicProfileHeroProps {
  result: BirthChartResult;
}

/**
 * The "aha" moment at the top of the Birth Chart result: a big, stacked
 * headline reveal (Lagna / Moon / Nakshatra) followed by the Sun-Moon-Lagna
 * "cosmic triad" — the three placements a Vedic reading centers on — before
 * the more technical chart wheel and planetary-position grid further down
 * the page. Every value here is read straight off the already-calculated
 * BirthChartResult; nothing here is invented or re-derived.
 */
export default function CosmicProfileHero({ result }: CosmicProfileHeroProps) {
  const sun = result.planets.find((p) => p.planet === "Sun")!;
  const moon = result.planets.find((p) => p.planet === "Moon")!;
  const { attributes, pada } = result.moonNakshatra;

  return (
    <div className="text-center">
      <p className="reveal-in text-xs uppercase tracking-[0.3em] text-gold/80">
        Your AstroYoda Profile
      </p>

      <div className="mt-5 space-y-2">
        <p className="reveal-in reveal-delay-1 font-display text-3xl sm:text-5xl font-semibold text-textPrimary">
          {result.lagna.sign}{" "}
          <span className="text-textMuted font-normal text-lg sm:text-2xl align-middle">Lagna</span>
        </p>
        <p className="reveal-in reveal-delay-2 font-display text-2xl sm:text-4xl font-semibold text-lavender">
          {moon.sign}{" "}
          <span className="text-textMuted font-normal text-base sm:text-xl align-middle">Moon</span>
        </p>
        <p className="reveal-in reveal-delay-3 font-display text-xl sm:text-3xl font-medium text-gold">
          {attributes.name}{" "}
          <span className="text-textMuted font-normal text-sm sm:text-lg align-middle">
            · Pada {pada}
          </span>
        </p>
      </div>

      <div className="reveal-in reveal-delay-4 mt-9 card bg-gradient-to-br from-navy-dark to-navy border-gold/20">
        <p className="text-xs uppercase tracking-widest text-textMuted mb-5">Your Cosmic Triad</p>
        <div className="grid grid-cols-3 divide-x divide-white/10">
          <div className="px-1 sm:px-3">
            <p className="text-2xl" aria-hidden="true">☉</p>
            <p className="mt-1.5 text-[10px] sm:text-xs text-textMuted uppercase tracking-wide">Sun</p>
            <p className="font-display text-base sm:text-xl text-textPrimary">{sun.sign}</p>
          </div>
          <div className="px-1 sm:px-3">
            <p className="text-2xl" aria-hidden="true">☾</p>
            <p className="mt-1.5 text-[10px] sm:text-xs text-textMuted uppercase tracking-wide">Moon</p>
            <p className="font-display text-base sm:text-xl text-textPrimary">{moon.sign}</p>
          </div>
          <div className="px-1 sm:px-3">
            <p className="text-2xl" aria-hidden="true">↑</p>
            <p className="mt-1.5 text-[10px] sm:text-xs text-textMuted uppercase tracking-wide">Lagna</p>
            <p className="font-display text-base sm:text-xl text-textPrimary">{result.lagna.sign}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
