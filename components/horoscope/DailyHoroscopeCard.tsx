"use client";

import { useEffect, useState } from "react";
import { getDailyHoroscope } from "@/lib/horoscope";
import { zodiacSignEssence } from "@/data/interpretations/zodiacSigns";
import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";
import type { DailyHoroscopeReading, HoroscopeCategory } from "@/types/horoscope";

const CATEGORY_LABELS: Record<HoroscopeCategory, string> = {
  general: "General",
  career: "Career",
  love: "Love",
  money: "Money",
  wellbeing: "Well-being",
};

const CATEGORY_ORDER: HoroscopeCategory[] = ["general", "career", "love", "money", "wellbeing"];

/**
 * Full daily-horoscope display for one sign: today's date, the sign's
 * essence, all five category readings, and lucky number/color. Computed
 * client-side (see lib/horoscope) so the "today" it shows always matches
 * the visitor's own local date, even on a statically-generated page.
 */
export default function DailyHoroscopeCard({ sign }: { sign: ZodiacSign }) {
  const [reading, setReading] = useState<DailyHoroscopeReading | null>(null);

  useEffect(() => {
    setReading(getDailyHoroscope(sign, new Date()));
  }, [sign]);

  const essence = zodiacSignEssence[sign];

  if (!reading) {
    return (
      <div className="card animate-pulse">
        <div className="h-4 w-32 rounded bg-white/10" />
        <div className="mt-4 h-20 rounded bg-white/10" />
      </div>
    );
  }

  const formattedDate = new Date(`${reading.date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="card">
        <p className="chip w-fit">{formattedDate}</p>
        <h1 className="mt-3 font-display text-2xl sm:text-3xl font-semibold">
          {sign} <span className="text-base font-normal text-textMuted">— {essence.keyword}</span>
        </h1>
        <p className="mt-2 text-sm text-textMuted">{essence.theme}</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CATEGORY_ORDER.map((category) => (
          <div key={category} className="card">
            <p className="text-xs font-medium uppercase tracking-wide text-accentBlue">
              {CATEGORY_LABELS[category]}
            </p>
            <p className="mt-2 text-sm text-textPrimary">{reading[category]}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="card min-w-[140px] flex-1 text-center">
          <p className="text-xs uppercase tracking-wide text-textMuted">Lucky Number</p>
          <p className="mt-1 font-display text-2xl font-semibold text-gold">{reading.luckyNumber}</p>
        </div>
        <div className="card min-w-[140px] flex-1 text-center">
          <p className="text-xs uppercase tracking-wide text-textMuted">Lucky Color</p>
          <p className="mt-1 font-display text-2xl font-semibold text-gold">{reading.luckyColor}</p>
        </div>
      </div>

      <p className="mt-6 text-xs text-textMuted/70">
        A general, traditional-style reflection for {sign} today — everyone born under {sign} sees
        the same reading, refreshed daily from a curated set (not a live, personalized AI
        prediction). For something based on your own exact birth details, see your{" "}
        <a href="/astrology/birth-chart" className="underline hover:text-textPrimary">
          birth chart
        </a>
        .
      </p>
    </div>
  );
}
