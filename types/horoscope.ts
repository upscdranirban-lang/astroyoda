export type HoroscopeCategory = "general" | "career" | "love" | "money" | "wellbeing";

/**
 * A single day's curated horoscope reading for one zodiac sign. Selected
 * deterministically from a static content pool (see data/horoscope) keyed
 * by sign + category + calendar date — never generated live by an AI
 * model, per the project's zero-cost / no-fabrication rules (see README
 * and blueprint §11).
 */
export interface DailyHoroscopeReading {
  /** Local calendar date this reading is for, as YYYY-MM-DD. */
  date: string;
  general: string;
  career: string;
  love: string;
  money: string;
  wellbeing: string;
  /** 1-9, in keeping with the numerology feature's single-digit convention. */
  luckyNumber: number;
  luckyColor: string;
}
