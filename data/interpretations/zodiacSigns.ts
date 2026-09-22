import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";

/**
 * Traditional, widely-published symbolic keywords and one-line themes for
 * each sidereal (Vedic) zodiac sign — the same sign names used in Western
 * astrology, carrying the traditional associations passed down through
 * both traditions. Offered as cultural/symbolic reflection, not fact; see
 * the Disclaimer page.
 */
export interface ZodiacSignEssence {
  keyword: string;
  theme: string;
}

export const zodiacSignEssence: Record<ZodiacSign, ZodiacSignEssence> = {
  Aries: {
    keyword: "The Initiator",
    theme: "Bold, direct energy that likes to lead and start things rather than wait.",
  },
  Taurus: {
    keyword: "The Builder",
    theme: "Steady, grounded and patient, drawn to comfort, stability and lasting things.",
  },
  Gemini: {
    keyword: "The Communicator",
    theme: "Curious and quick-witted, energized by ideas, conversation and variety.",
  },
  Cancer: {
    keyword: "The Nurturer",
    theme: "Emotionally attuned and protective, with a strong pull toward home and family.",
  },
  Leo: {
    keyword: "The Performer",
    theme: "Warm, expressive and confident, drawn to creativity and being seen.",
  },
  Virgo: {
    keyword: "The Analyst",
    theme: "Detail-oriented and practical, finding meaning in service and doing things well.",
  },
  Libra: {
    keyword: "The Harmonizer",
    theme: "Relationship-focused and fair-minded, seeking balance and partnership.",
  },
  Scorpio: {
    keyword: "The Transformer",
    theme: "Intense and perceptive, drawn beneath the surface toward depth and truth.",
  },
  Sagittarius: {
    keyword: "The Explorer",
    theme: "Optimistic and freedom-loving, drawn to travel, philosophy and the big picture.",
  },
  Capricorn: {
    keyword: "The Achiever",
    theme: "Disciplined and ambitious, playing the long game toward status and structure.",
  },
  Aquarius: {
    keyword: "The Innovator",
    theme: "Independent and idea-driven, drawn to community, progress and the unconventional.",
  },
  Pisces: {
    keyword: "The Dreamer",
    theme: "Imaginative and empathetic, attuned to feeling, art and the intangible.",
  },
};

const PLANET_ROLE_BLURB: Record<string, string> = {
  Sun: "your core identity and sense of purpose",
  Moon: "your emotional nature and instinctive reactions",
  Lagna: "how you tend to come across, and the lens the rest of the chart is read through",
};

/**
 * Composes a short, traditional one-paragraph blurb for a given planet's
 * sign placement (e.g. "Sun in Leo"), for the three placements shown by
 * default on the birth chart summary (Sun, Moon, Ascendant/Lagna).
 */
export function getSignPlacementBlurb(planetOrPoint: "Sun" | "Moon" | "Lagna", sign: ZodiacSign): string {
  const essence = zodiacSignEssence[sign];
  const role = PLANET_ROLE_BLURB[planetOrPoint];
  return `${essence.theme} In Vedic tradition, this placement colors ${role}.`;
}
