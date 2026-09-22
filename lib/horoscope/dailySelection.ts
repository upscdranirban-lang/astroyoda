import { HOROSCOPE_MESSAGES, LUCKY_COLORS } from "@/data/horoscope/messagePool";
import type { DailyHoroscopeReading } from "@/types/horoscope";
import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";

/**
 * A given zodiac sign's calendar date, as YYYY-MM-DD, in whatever
 * timezone `date` represents (the browser's local time when called with
 * `new Date()`, which is how this is used everywhere in the app — the
 * reading changes at local midnight for the visitor, not at UTC
 * midnight).
 */
export function getLocalDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * A small, deterministic string hash (djb2 variant). Not cryptographic —
 * just needs to spread different (sign, category, date) seeds evenly
 * across a short content pool, and to always return the same result for
 * the same seed, in every browser, with no server or randomness
 * involved.
 */
function hashSeed(seed: string): number {
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 33) ^ seed.charCodeAt(i);
  }
  return hash >>> 0; // unsigned 32-bit
}

function pick<T>(pool: readonly T[], seed: string): T {
  return pool[hashSeed(seed) % pool.length];
}

/**
 * Today's (or `date`'s) curated horoscope reading for `sign`. Deterministic:
 * the same sign and calendar date always resolve to the same reading, so
 * this needs no database or server call — every visitor born under the
 * same sign sees the same reading on the same day, and it changes the
 * next day. Content itself comes from the static pool in
 * data/horoscope/messagePool.ts, never a live AI call.
 */
export function getDailyHoroscope(sign: ZodiacSign, date: Date = new Date()): DailyHoroscopeReading {
  const dateStr = getLocalDateString(date);
  return {
    date: dateStr,
    general: pick(HOROSCOPE_MESSAGES.general, `${sign}|general|${dateStr}`),
    career: pick(HOROSCOPE_MESSAGES.career, `${sign}|career|${dateStr}`),
    love: pick(HOROSCOPE_MESSAGES.love, `${sign}|love|${dateStr}`),
    money: pick(HOROSCOPE_MESSAGES.money, `${sign}|money|${dateStr}`),
    wellbeing: pick(HOROSCOPE_MESSAGES.wellbeing, `${sign}|wellbeing|${dateStr}`),
    luckyNumber: 1 + (hashSeed(`${sign}|number|${dateStr}`) % 9),
    luckyColor: pick(LUCKY_COLORS, `${sign}|color|${dateStr}`),
  };
}
