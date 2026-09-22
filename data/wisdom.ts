import type { WisdomEntry } from "@/types/wisdom";

// AstroYoda Wisdom — short, original, cosmic-mentor-style lines.
// Used selectively (one per page/section), never on every screen.
// Hard rule: no Star Wars / Yoda dialogue, no third-party IP. Every line here is original.
export const wisdomEntries: WisdomEntry[] = [
  { id: "home-1", category: "home", message: "Your chart is a map, not a command." },
  { id: "home-2", category: "home", message: "The stars may suggest a path. Walking it is yours." },
  { id: "home-3", category: "home", message: "Curiosity is the oldest form of courage." },

  { id: "astrology-1", category: "astrology", message: "A birth chart is a beginning, not a verdict." },
  { id: "astrology-2", category: "astrology", message: "Much can be understood when your beginnings are understood." },
  { id: "astrology-3", category: "astrology", message: "Planets describe weather, not destiny." },

  { id: "numerology-1", category: "numerology", message: "Numbers reveal patterns. You give them meaning." },
  { id: "numerology-2", category: "numerology", message: "A number is a mirror, not a measurement." },

  { id: "nakshatra-1", category: "nakshatra", message: "Know your patterns, and wiser your choices become." },
  { id: "nakshatra-2", category: "nakshatra", message: "The star you were born under lights one path among many." },

  { id: "compatibility-1", category: "compatibility", message: "Compatibility is a starting conversation, not a final answer." },
  { id: "compatibility-2", category: "compatibility", message: "Two charts can agree on much and still need patience." },

  { id: "horoscope-1", category: "horoscope", message: "Today's forecast is a suggestion for reflection, not a schedule to follow." },
  { id: "horoscope-2", category: "horoscope", message: "Read the sky lightly. Live the day fully." },

  { id: "learning-1", category: "learning", message: "Ancient systems reward patient study, not quick certainty." },
  { id: "learning-2", category: "learning", message: "Tradition is a long conversation. You have just joined it." },

  { id: "results-1", category: "results", message: "Look within first. The future can wait." },
  { id: "results-2", category: "results", message: "What you do with this is wiser than what it says." },
];

export function getWisdomByCategory(category: WisdomEntry["category"]): WisdomEntry {
  const entries = wisdomEntries.filter((entry) => entry.category === category);
  const pool = entries.length > 0 ? entries : wisdomEntries;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
