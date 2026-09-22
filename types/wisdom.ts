export type WisdomCategory =
  | "home"
  | "astrology"
  | "numerology"
  | "nakshatra"
  | "compatibility"
  | "horoscope"
  | "learning"
  | "results";

export interface WisdomEntry {
  id: string;
  category: WisdomCategory;
  message: string;
}
