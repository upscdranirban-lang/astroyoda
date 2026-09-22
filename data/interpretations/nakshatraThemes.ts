/**
 * Traditional one-to-two-sentence "themes" for each of the 27 nakshatras —
 * cross-checked against Wikipedia's Nakshatra article and PanchangBodh's
 * nakshatra guide (see Sources below), kept to the traditional
 * deity/symbol/planet-based associations both sources corroborate.
 *
 * Three entries (Ashlesha, Jyeshtha, Mula) had a genuine split in tone
 * across sources during that research pass — kept intentionally neutral/
 * conservative below rather than picking a side. Yoni and Nadi are still
 * left out of data/nakshatras.ts for the same reason given there: not
 * confidently cross-checked yet.
 *
 * Sources:
 * - https://en.wikipedia.org/wiki/Nakshatra
 * - https://panchangbodh.com/nakshatras
 *
 * Presented on the site as traditional/cultural/symbolic content for
 * reflection, not scientific or predictive fact — see the Disclaimer page.
 */
export interface NakshatraTheme {
  keyword: string;
  theme: string;
}

export const nakshatraThemes: Record<string, NakshatraTheme> = {
  Ashwini: {
    keyword: "The Pioneer",
    theme:
      "Associated with speed, initiative and healing ability — traditionally the quick-starter of the nakshatras, first to act.",
  },
  Bharani: {
    keyword: "The Bearer",
    theme:
      "Linked to themes of bearing burdens and transformation through struggle — an intense creative and restraining force.",
  },
  Krittika: {
    keyword: "The Cutter",
    theme:
      "Associated with sharp discrimination and purification — a direct temperament, traditionally described as incisive.",
  },
  Rohini: {
    keyword: "The Grower",
    theme:
      "Traditionally linked to beauty, material comfort and fertility — a sensual, growth-oriented nature.",
  },
  Mrigashira: {
    keyword: "The Seeker",
    theme: "Associated with searching, curiosity and gentleness — a restless, seeking temperament.",
  },
  Ardra: {
    keyword: "The Transformer",
    theme:
      "Traditionally tied to intensity and upheaval — transformation reached through emotional catharsis.",
  },
  Punarvasu: {
    keyword: "The Renewer",
    theme: "Linked to renewal and the return of light after hardship — optimism and restorative wisdom.",
  },
  Pushya: {
    keyword: "The Nourisher",
    theme:
      "Considered one of the most nourishing nakshatras — associated with protection and spiritual growth.",
  },
  Ashlesha: {
    keyword: "The Mystic",
    theme:
      "Serpent symbolism traditionally linked to hidden knowledge and intuition — sources vary on tone, so held here as subtle, intuitive power rather than any one reading.",
  },
  Magha: {
    keyword: "The Ancestor",
    theme: "Associated with authority, legacy and tradition — a strong connection to ancestral lineage.",
  },
  "Purva Phalguni": {
    keyword: "The Romantic",
    theme: "Traditionally tied to pleasure, romance and creativity — social and artistic expression.",
  },
  "Uttara Phalguni": {
    keyword: "The Patron",
    theme: "Associated with stable partnerships and practical, lasting support for others.",
  },
  Hasta: {
    keyword: "The Craftsperson",
    theme: "Linked to dexterity and craftsmanship — precise, skillful, hands-on action.",
  },
  Chitra: {
    keyword: "The Artist",
    theme: "Associated with artistry and brilliance — refined craftsmanship or design skill.",
  },
  Swati: {
    keyword: "The Independent",
    theme: "Traditionally tied to independence and adaptability — growth carried by outside forces.",
  },
  Vishakha: {
    keyword: "The Achiever",
    theme: "Associated with determined effort toward a goal — ambition and transformative expansion.",
  },
  Anuradha: {
    keyword: "The Devoted",
    theme: "Linked to friendship, loyalty and devotion — success through cooperation.",
  },
  Jyeshtha: {
    keyword: "The Elder",
    theme:
      "Associated with seniority and authority — sources differ on emphasis, held here as a protective, commanding presence rather than any harsher reading.",
  },
  Mula: {
    keyword: "The Root-Seeker",
    theme:
      "Traditionally tied to getting to the root of things and transformation through upheaval — sources split between a \"seeking truth\" and a more destructive reading; held here as change that clears the way for renewal.",
  },
  "Purva Ashadha": {
    keyword: "The Unstoppable",
    theme: "Associated with invincibility and persistence — an unstoppable, flowing determination.",
  },
  "Uttara Ashadha": {
    keyword: "The Victor",
    theme: "Linked to lasting victory and integrity — comprehensive, principled achievement.",
  },
  Shravana: {
    keyword: "The Listener",
    theme: "Associated with listening, learning and devotion — connection to received wisdom.",
  },
  Dhanishta: {
    keyword: "The Prosperous",
    theme: "Traditionally tied to wealth and rhythm — communal or material prosperity.",
  },
  Shatabhisha: {
    keyword: "The Healer",
    theme:
      "Associated with healing hidden or chronic conditions — mystery and independent, investigative tendencies.",
  },
  "Purva Bhadrapada": {
    keyword: "The Ascetic",
    theme: "Linked to intensity and a dual, fierce-yet-spiritual temperament.",
  },
  "Uttara Bhadrapada": {
    keyword: "The Deep Well",
    theme: "Associated with hidden depth and wisdom gained slowly — quiet, transformative strength.",
  },
  Revati: {
    keyword: "The Guide",
    theme: "Traditionally tied to nourishment and guidance — safe passage through transitions.",
  },
};
