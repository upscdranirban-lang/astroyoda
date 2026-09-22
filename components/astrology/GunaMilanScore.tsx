import { Star, Info } from "lucide-react";
import type { GunaMilanResult, GunaMilanCategory } from "@/types/compatibility";

const CATEGORY_COLOR: Record<GunaMilanCategory, string> = {
  excellent: "text-gold",
  good: "text-accentBlue",
  average: "text-lavender",
  belowAverage: "text-textMuted",
};

/**
 * Renders the 36-point total as a 9-star symbol (each star = 4 points,
 * AstroYoda's max/9 so the scale reads at a glance) alongside the exact
 * number, plus the traditional category band. Star count is rounded to
 * the nearest half so the symbol tracks the real score rather than just
 * its category.
 */
function StarScore({ totalPoints, category }: { totalPoints: number; category: GunaMilanCategory }) {
  const starsOutOf9 = (totalPoints / 36) * 9;
  const fullStars = Math.floor(starsOutOf9 + 0.25); // round to nearest half, then floor for "full" count
  const hasHalfStar = starsOutOf9 - fullStars >= 0.25 && starsOutOf9 - fullStars < 0.75;

  return (
    <div className="flex items-center gap-1" role="img" aria-label={`${totalPoints} out of 36 points`}>
      {Array.from({ length: 9 }, (_, i) => {
        const filled = i < fullStars;
        const half = !filled && i === fullStars && hasHalfStar;
        return (
          <span key={i} className="relative inline-block">
            <Star
              size={22}
              className={filled || half ? CATEGORY_COLOR[category] : "text-white/15"}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
            {half && (
              <Star
                size={22}
                className={`${CATEGORY_COLOR[category]} absolute inset-0 overflow-hidden`}
                fill="currentColor"
                strokeWidth={1.5}
                style={{ clipPath: "inset(0 50% 0 0)" }}
              />
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function GunaMilanScore({ result }: { result: GunaMilanResult }) {
  return (
    <div className="card border-gold/30">
      <p className="text-xs uppercase tracking-widest text-textMuted">Guna Milan (Ashtakoot)</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <StarScore totalPoints={result.totalPoints} category={result.category} />
        <p className="text-2xl font-display font-semibold text-textPrimary">
          {result.totalPoints} <span className="text-base text-textMuted font-normal">/ 36</span>
        </p>
        <span className={`chip border-white/15 ${CATEGORY_COLOR[result.category]}`}>
          {result.categoryLabel}
        </span>
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {result.kootas.map((k) => (
          <div key={k.key} className="flex items-baseline justify-between gap-3 border-b border-white/10 py-1.5">
            <span className="text-sm text-textPrimary">{k.name}</span>
            <span className="text-sm text-textMuted">
              {k.points} / {k.maxPoints}
            </span>
          </div>
        ))}
      </div>

      <details className="mt-4 text-sm text-textMuted">
        <summary className="cursor-pointer text-textPrimary">What each factor means</summary>
        <ul className="mt-2 space-y-2">
          {result.kootas.map((k) => (
            <li key={k.key}>
              <span className="text-textPrimary">{k.name}:</span> {k.note}
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-5 flex items-start gap-2 border-t border-white/10 pt-4 text-sm text-textMuted">
        <Info size={16} className="mt-0.5 shrink-0 text-gold/80" aria-hidden="true" />
        <p>
          <strong className="text-textPrimary">Astrology doesn&apos;t replace effort.</strong> This
          score is a traditional, symbolic reading of two birth charts — not a guarantee of a
          relationship&apos;s success or failure, and not a substitute for communication, compatibility
          of values, and the ongoing effort two people put into a relationship themselves.
        </p>
      </div>
    </div>
  );
}
