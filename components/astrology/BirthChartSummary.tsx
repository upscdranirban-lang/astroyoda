import type { BirthChartResult } from "@/types/astrology";
import { getSignPlacementBlurb, zodiacSignEssence } from "@/data/interpretations/zodiacSigns";
import { nakshatraThemes } from "@/data/interpretations/nakshatraThemes";
import { getChartHouses, PLANET_ABBREVIATIONS } from "@/lib/astrology/houseLayout";
import VedicChartSvg from "@/components/astrology/VedicChartSvg";
import CosmicProfileHero from "@/components/astrology/CosmicProfileHero";
import NakshatraHighlight from "@/components/astrology/NakshatraHighlight";
import WhatThisRepresents from "@/components/astrology/WhatThisRepresents";
import WisdomBanner from "@/components/WisdomBanner";

interface BirthChartSummaryProps {
  result: BirthChartResult;
  placeLabel: string;
  timezone: string;
  utcInstant: Date;
  approximateTime: boolean;
}

function formatDegree(degreeInSign: number): string {
  const degrees = Math.floor(degreeInSign);
  const minutes = Math.round((degreeInSign - degrees) * 60);
  return `${degrees}° ${minutes.toString().padStart(2, "0")}'`;
}

export default function BirthChartSummary({
  result,
  placeLabel,
  timezone,
  utcInstant,
  approximateTime,
}: BirthChartSummaryProps) {
  const sun = result.planets.find((p) => p.planet === "Sun")!;
  const moon = result.planets.find((p) => p.planet === "Moon")!;
  const otherPlanets = result.planets.filter((p) => p.planet !== "Sun" && p.planet !== "Moon");
  const houses = getChartHouses(result);
  const nakshatraTheme = nakshatraThemes[result.moonNakshatra.attributes.name];

  return (
    <div className="mt-8 space-y-6">
      {approximateTime && (
        <div className="card border-gold/40">
          <p className="text-sm text-gold/90">
            <strong>Exact birth time not provided.</strong> The Ascendant (Lagna) and
            house positions below assume noon and can shift significantly with a
            different birth time — sign changes roughly every two hours. The Moon&apos;s
            sign and Nakshatra can also shift if your true birth time is near a
            boundary. Treat the Lagna below as a rough estimate only.
          </p>
        </div>
      )}

      {/* The "aha" moment: headline reveal + cosmic triad, before any of the
          more technical chart detail further down this page. */}
      <CosmicProfileHero result={result} />

      <NakshatraHighlight result={result} eyebrow="Your Nakshatra" revealDelayClassName="reveal-delay-4" />

      {nakshatraTheme && (
        <WhatThisRepresents text={nakshatraTheme.theme} revealDelayClassName="reveal-delay-4" />
      )}

      <div className="reveal-in reveal-delay-4">
        <WisdomBanner category="results" />
      </div>

      {/* Full technical detail, for anyone who wants to go deeper than the
          headline reveal above. */}
      <div className="pt-4 border-t border-white/10">
        <p className="text-xs uppercase tracking-widest text-textMuted mb-4">Full Birth Chart</p>

        <div className="card">
          <p className="text-xs uppercase tracking-widest text-textMuted mb-4">
            Your Birth Chart (North Indian style)
          </p>
          <div className="max-w-sm mx-auto text-textPrimary">
            <VedicChartSvg houses={houses} />
          </div>
          <p className="mt-4 text-xs text-textMuted/70 text-center">
            House 1 (marked &ldquo;Asc&rdquo;) is your Ascendant; small numerals are each
            house&apos;s zodiac sign (1 = Aries … 12 = Pisces). Planet codes:{" "}
            {Object.entries(PLANET_ABBREVIATIONS)
              .map(([planet, code]) => `${code}=${planet}`)
              .join(", ")}
            .
          </p>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <div className="card">
            <p className="text-xs uppercase tracking-widest text-textMuted">Lagna (Ascendant)</p>
            <p className="mt-2 font-display text-2xl font-semibold text-accentBlue">
              {result.lagna.sign}
            </p>
            <p className="text-sm text-gold/90">
              {formatDegree(result.lagna.degreeInSign)} — {zodiacSignEssence[result.lagna.sign].keyword}
            </p>
            <p className="mt-3 text-sm text-textMuted">
              {getSignPlacementBlurb("Lagna", result.lagna.sign)}
            </p>
          </div>

          <div className="card">
            <p className="text-xs uppercase tracking-widest text-textMuted">Sun Sign</p>
            <p className="mt-2 font-display text-2xl font-semibold text-accentBlue">{sun.sign}</p>
            <p className="text-sm text-gold/90">
              {formatDegree(sun.degreeInSign)} — {zodiacSignEssence[sun.sign].keyword}
            </p>
            <p className="mt-3 text-sm text-textMuted">{getSignPlacementBlurb("Sun", sun.sign)}</p>
          </div>

          <div className="card">
            <p className="text-xs uppercase tracking-widest text-textMuted">Moon Sign</p>
            <p className="mt-2 font-display text-2xl font-semibold text-accentBlue">{moon.sign}</p>
            <p className="text-sm text-gold/90">
              {formatDegree(moon.degreeInSign)} — {zodiacSignEssence[moon.sign].keyword}
            </p>
            <p className="mt-3 text-sm text-textMuted">{getSignPlacementBlurb("Moon", moon.sign)}</p>
            <p className="mt-3 text-xs text-textMuted/80">
              Nakshatra: <strong className="text-textPrimary">{result.moonNakshatra.attributes.name}</strong>
              {" "}(pada {result.moonNakshatra.pada})
            </p>
          </div>
        </div>

        <div className="mt-5 card">
          <p className="text-sm font-medium text-textPrimary mb-3">Planetary Positions</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {otherPlanets.map((p) => (
              <div key={p.planet}>
                <p className="text-textMuted text-xs uppercase tracking-wide">{p.planet}</p>
                <p className="text-textPrimary">
                  {p.sign} {formatDegree(p.degreeInSign)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <details className="mt-5 text-xs text-textMuted/80">
          <summary className="cursor-pointer select-none hover:text-textMuted">
            How this was calculated
          </summary>
          <div className="mt-2 space-y-1">
            <p>Birth place: {placeLabel}</p>
            <p>Resolved timezone: {timezone}</p>
            <p>Birth instant (UTC): {utcInstant.toISOString()}</p>
            <p>Ayanamsa used (Lahiri, calibrated): {result.ayanamsaUsed.toFixed(4)}°</p>
            <p>
              Positions are sidereal (Vedic), computed from real astronomical data —
              see the About page for how. Houses use the whole-sign system: each
              house is a full zodiac sign starting from the Ascendant&apos;s sign.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
