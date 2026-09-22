"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDailyHoroscope } from "@/lib/horoscope";
import { ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astrology/zodiacSigns";

function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

/**
 * The 12-sign picker used on both the homepage preview and the
 * /horoscope hub: each card names the sign and previews today's General
 * line, and links to that sign's full reading. Computed client-side, on
 * mount, so "today" always matches the visitor's own local date.
 */
export default function HoroscopeSignGrid() {
  const [snippets, setSnippets] = useState<Partial<Record<ZodiacSign, string>>>({});

  useEffect(() => {
    const today = new Date();
    const next: Partial<Record<ZodiacSign, string>> = {};
    for (const sign of ZODIAC_SIGNS) {
      next[sign] = truncate(getDailyHoroscope(sign, today).general, 64);
    }
    setSnippets(next);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {ZODIAC_SIGNS.map((sign) => (
        <Link
          key={sign}
          href={`/horoscope/${sign.toLowerCase()}`}
          className="card px-4 py-5 transition-colors hover:border-accentBlue/40"
        >
          <p className="text-sm font-medium text-textPrimary">{sign}</p>
          <p className="mt-1 min-h-[2.5rem] text-xs text-textMuted">
            {snippets[sign] ?? "Loading today's reading…"}
          </p>
        </Link>
      ))}
    </div>
  );
}
