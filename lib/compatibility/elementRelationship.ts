import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";
import type { ElementComparison, RelationshipTone, ZodiacElement } from "@/types/compatibility";

/**
 * The four classical elements each zodiac sign belongs to — standard,
 * widely-published astrological classification (not specific to Vedic vs
 * Western astrology; both traditions use it), used here for a light,
 * qualitative compatibility read rather than the formal Vedic "Guna Milan"
 * scoring system (deliberately out of scope for V1 — see the blueprint's
 * §10 and the note in compatibilityNotes.ts).
 */
const SIGN_ELEMENTS: Record<ZodiacSign, ZodiacElement> = {
  Aries: "Fire",
  Leo: "Fire",
  Sagittarius: "Fire",
  Taurus: "Earth",
  Virgo: "Earth",
  Capricorn: "Earth",
  Gemini: "Air",
  Libra: "Air",
  Aquarius: "Air",
  Cancer: "Water",
  Scorpio: "Water",
  Pisces: "Water",
};

export function getElement(sign: ZodiacSign): ZodiacElement {
  return SIGN_ELEMENTS[sign];
}

interface ToneInfo {
  tone: RelationshipTone;
  note: string;
}

const SAME_ELEMENT_NOTE: Record<ZodiacElement, string> = {
  Fire: "Both bring Fire's energy and initiative — an easy, instinctive understanding, though two strong wills can also compete for the lead.",
  Earth: "Both bring Earth's steadiness and practicality — a grounded, reliable pairing that shares a similar pace.",
  Air: "Both bring Air's curiosity and love of ideas — easy conversation, though may need to work at follow-through together.",
  Water: "Both bring Water's emotional depth — an intuitive understanding of each other's feelings.",
};

// Unordered element-pair notes, keyed "A+B" with A < B alphabetically.
const CROSS_ELEMENT_NOTES: Record<string, ToneInfo> = {
  "Air+Fire": {
    tone: "harmonious",
    note: "Traditionally a lively combination — Air feeds Fire's energy, and Fire gives Air's ideas somewhere to go.",
  },
  "Earth+Water": {
    tone: "harmonious",
    note: "Traditionally a nourishing combination — Water helps Earth grow, and Earth gives Water direction and form.",
  },
  "Earth+Fire": {
    tone: "challenging",
    note: "Traditionally a combination that takes patience — Fire moves fast and Earth moves slow, so pacing can take active effort to align.",
  },
  "Fire+Water": {
    tone: "challenging",
    note: "Traditionally an intense combination — Fire and Water can either temper or extinguish each other, so this pairing often runs hot and needs conscious balance.",
  },
  "Air+Water": {
    tone: "challenging",
    note: "Traditionally a combination where logic and emotion can pull in different directions — rewarding when both sides make room for the other's approach.",
  },
  "Air+Earth": {
    tone: "neutral",
    note: "Traditionally a combination of ideas and practicality — Earth can ground Air's plans, though the two can also feel like they're moving at different speeds.",
  },
};

/** Compares two zodiac signs by their classical element, for a given placement (e.g. Moon sign). */
export function compareSignsByElement(signA: ZodiacSign, signB: ZodiacSign): ElementComparison {
  const elementA = getElement(signA);
  const elementB = getElement(signB);

  if (elementA === elementB) {
    return { elementA, elementB, tone: "same", note: SAME_ELEMENT_NOTE[elementA] };
  }

  const key = [elementA, elementB].sort().join("+");
  const info = CROSS_ELEMENT_NOTES[key];
  return { elementA, elementB, tone: info.tone, note: info.note };
}
