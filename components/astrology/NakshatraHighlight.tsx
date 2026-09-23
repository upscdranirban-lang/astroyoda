import type { BirthChartResult } from "@/types/astrology";
import { nakshatraThemes } from "@/data/interpretations/nakshatraThemes";

interface NakshatraHighlightProps {
  result: BirthChartResult;
  /** "Your Nakshatra" on its own dedicated page, or a shorter label when it
   * follows a bigger headline elsewhere (e.g. the Birth Chart page). */
  eyebrow?: string;
  revealDelayClassName?: string;
}

/**
 * The "YOUR NAKSHATRA" reveal card — shared by the Birth Chart result
 * (where it follows the cosmic-triad headline) and the standalone
 * Nakshatra Finder (where it's the page's own centerpiece).
 */
export default function NakshatraHighlight({
  result,
  eyebrow = "Your Nakshatra",
  revealDelayClassName = "",
}: NakshatraHighlightProps) {
  const { attributes, pada } = result.moonNakshatra;
  const theme = nakshatraThemes[attributes.name];

  return (
    <div className={`reveal-in ${revealDelayClassName} card border-gold/20 bg-gradient-to-br from-navy-dark to-navy text-center`}>
      <p className="text-xs uppercase tracking-[0.3em] text-gold/80">{eyebrow}</p>
      <p className="mt-3 font-display text-4xl sm:text-5xl font-semibold text-textPrimary">
        {attributes.name}
      </p>
      {theme && (
        <p className="mt-1 font-display text-lg sm:text-xl italic text-gold/90">{theme.keyword}</p>
      )}
      <p className="mt-1 text-sm text-textMuted">Pada {pada} of 4</p>

      <div className="mt-6 flex justify-center gap-10 sm:gap-14 text-sm">
        <div>
          <p className="text-textMuted text-xs uppercase tracking-wide">Ruling Planet</p>
          <p className="mt-1 text-textPrimary font-medium">{attributes.rulingPlanet}</p>
        </div>
        <div>
          <p className="text-textMuted text-xs uppercase tracking-wide">Deity</p>
          <p className="mt-1 text-textPrimary font-medium">{attributes.deity}</p>
        </div>
      </div>
    </div>
  );
}
