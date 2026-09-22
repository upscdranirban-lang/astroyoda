import type { BirthChartResult } from "@/types/astrology";
import { nakshatraThemes } from "@/data/interpretations/nakshatraThemes";

interface NakshatraResultCardProps {
  result: BirthChartResult;
  approximateTime: boolean;
}

export default function NakshatraResultCard({ result, approximateTime }: NakshatraResultCardProps) {
  const { attributes, pada } = result.moonNakshatra;
  const moon = result.planets.find((p) => p.planet === "Moon")!;
  const theme = nakshatraThemes[attributes.name];

  return (
    <div className="mt-8 space-y-6">
      {approximateTime && (
        <div className="card border-gold/40">
          <p className="text-sm text-gold/90">
            <strong>Exact birth time not provided.</strong> The Moon moves roughly
            one nakshatra every day, and can shift within a nakshatra (or across
            its boundary) within just a few hours. Without an exact birth time,
            treat this Nakshatra and Pada as a likely estimate rather than exact.
          </p>
        </div>
      )}

      <div className="card">
        <p className="text-xs uppercase tracking-widest text-textMuted">Your Nakshatra</p>
        <p className="mt-2 font-display text-4xl font-semibold text-accentBlue">{attributes.name}</p>
        {theme && <p className="text-sm text-gold/90">{theme.keyword} — Pada {pada}</p>}
        {theme && <p className="mt-4 text-sm text-textMuted">{theme.theme}</p>}
      </div>

      <div className="card">
        <p className="text-sm font-medium text-textPrimary mb-3">Traditional Attributes</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-textMuted text-xs uppercase tracking-wide">Ruling Planet</p>
            <p className="text-textPrimary">{attributes.rulingPlanet}</p>
          </div>
          <div>
            <p className="text-textMuted text-xs uppercase tracking-wide">Deity</p>
            <p className="text-textPrimary">{attributes.deity}</p>
          </div>
          <div>
            <p className="text-textMuted text-xs uppercase tracking-wide">Symbol</p>
            <p className="text-textPrimary">{attributes.symbol}</p>
          </div>
          <div>
            <p className="text-textMuted text-xs uppercase tracking-wide">Gana</p>
            <p className="text-textPrimary">{attributes.gana}</p>
          </div>
          <div>
            <p className="text-textMuted text-xs uppercase tracking-wide">Rashi (Moon Sign)</p>
            <p className="text-textPrimary">{moon.sign}</p>
          </div>
          <div>
            <p className="text-textMuted text-xs uppercase tracking-wide">Pada</p>
            <p className="text-textPrimary">{pada} of 4</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-textMuted/70">
        Yoni and Nadi (two other traditional Nakshatra attributes) aren&apos;t
        shown yet — the sources checked while building this didn&apos;t agree
        closely enough to publish with confidence. See the{" "}
        <a href="/about" className="underline hover:text-textPrimary">
          About page
        </a>{" "}
        for how this is calculated.
      </p>
    </div>
  );
}
