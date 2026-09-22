import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";
import { getZodiacSignIndex } from "@/lib/astrology/zodiacSigns";
import type { BirthChartResult, NakshatraPosition } from "@/types/astrology";
import type { GunaMilanCategory, GunaMilanResult, KootaScore } from "@/types/compatibility";

/**
 * The traditional Ashtakoot ("eight-limb") Guna Milan / Kundli-matching
 * system — the formal 36-point score the blueprint's earlier phases
 * deliberately left out of V1 (see the old note in compatibilityNotes.ts)
 * as "beyond what a quick free tool should claim to offer responsibly."
 * Added per the owner's explicit request; kept honest about its limits
 * per the standing "never fabricate" rule — see the per-koota comments
 * below for exactly which parts are precise traditional rule and which
 * are a documented simplification, and why.
 *
 * Because this app treats both people symmetrically ("Person A" /
 * "Person B", no bride/groom or gender field), and two of the eight
 * kootas (Varna, Gana) are traditionally scored directionally by role,
 * Person A is treated as the classical "first" chart and Person B as the
 * "second" — stated plainly here and in the UI rather than hidden.
 *
 * Sources cross-checked (not relied on from memory alone) for every
 * table below: multiple independent Vedic-astrology references were
 * compared for each koota; where they agreed exactly (Varna, Tara,
 * Graha Maitri, Gana, Bhakoot, Nadi, and the Yoni same/enemy rules) the
 * table is used at full traditional precision. Where sources genuinely
 * disagreed with each other on exact intermediate point values (the
 * middle tiers of Yoni and Vashya), a documented 3-tier simplification
 * is used instead of picking one contested version and presenting it as
 * definitive.
 */

// ---------------------------------------------------------------------------
// 1. Varna (1 point) — spiritual/social temperament rank of the Moon sign.
// ---------------------------------------------------------------------------

type Varna = "Brahmin" | "Kshatriya" | "Vaishya" | "Shudra";

const VARNA_RANK: Record<Varna, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1 };

const SIGN_VARNA: Record<ZodiacSign, Varna> = {
  Cancer: "Brahmin",
  Scorpio: "Brahmin",
  Pisces: "Brahmin",
  Aries: "Kshatriya",
  Leo: "Kshatriya",
  Sagittarius: "Kshatriya",
  Taurus: "Vaishya",
  Virgo: "Vaishya",
  Capricorn: "Vaishya",
  Gemini: "Shudra",
  Libra: "Shudra",
  Aquarius: "Shudra",
};

function scoreVarna(signA: ZodiacSign, signB: ZodiacSign): KootaScore {
  const varnaA = SIGN_VARNA[signA];
  const varnaB = SIGN_VARNA[signB];
  const points = VARNA_RANK[varnaA] >= VARNA_RANK[varnaB] ? 1 : 0;
  return {
    key: "varna",
    name: "Varna",
    points,
    maxPoints: 1,
    note:
      varnaA === varnaB
        ? `Both Moons fall in the ${varnaA} varna — traditionally an easy match of temperament.`
        : `Person A's Moon carries the ${varnaA} varna and Person B's the ${varnaB} varna — traditionally read for compatible outlooks on life, not a ranking of either person's worth.`,
  };
}

// ---------------------------------------------------------------------------
// 2. Vashya (2 points) — "mutual influence" grouping of the Moon sign.
//    Simplified to 3 tiers: sources agreed on the sign groupings but not
//    consistently on every intermediate point value between groups.
// ---------------------------------------------------------------------------

type VashyaGroup = "Chatushpada" | "Manava" | "Jalachara" | "Vanachara" | "Keeta";

// Sagittarius and Capricorn are traditionally split by degree within the
// sign (0-15° vs 15-30°); every other sign is a single group throughout.
function getVashyaGroup(sign: ZodiacSign, degreeInSign: number): VashyaGroup {
  if (sign === "Sagittarius") return degreeInSign < 15 ? "Manava" : "Chatushpada";
  if (sign === "Capricorn") return degreeInSign < 15 ? "Chatushpada" : "Jalachara";
  const whole: Partial<Record<ZodiacSign, VashyaGroup>> = {
    Aries: "Chatushpada",
    Taurus: "Chatushpada",
    Gemini: "Manava",
    Cancer: "Jalachara",
    Leo: "Vanachara",
    Virgo: "Manava",
    Libra: "Manava",
    Scorpio: "Keeta",
    Aquarius: "Manava",
    Pisces: "Jalachara",
  };
  return whole[sign]!;
}

function scoreVashya(
  signA: ZodiacSign,
  degreeA: number,
  signB: ZodiacSign,
  degreeB: number
): KootaScore {
  const groupA = getVashyaGroup(signA, degreeA);
  const groupB = getVashyaGroup(signB, degreeB);

  let points: number;
  if (groupA === groupB) {
    points = 2;
  } else if (
    (groupA === "Manava" && groupB === "Vanachara") ||
    (groupA === "Vanachara" && groupB === "Manava")
  ) {
    // The one antagonism every cross-checked source names explicitly:
    // the human group is traditionally read as ill at ease with the wild-
    // animal group.
    points = 0;
  } else {
    points = 1;
  }

  return {
    key: "vashya",
    name: "Vashya",
    points,
    maxPoints: 2,
    note:
      groupA === groupB
        ? `Both Moons fall in the ${groupA} group — traditionally an easy mutual pull.`
        : `Person A's Moon falls in the ${groupA} group and Person B's in the ${groupB} group.`,
  };
}

// ---------------------------------------------------------------------------
// 3. Tara (3 points) — counted from each person's birth-star to the
//    other's, cycling through the 9 traditional Tara positions.
// ---------------------------------------------------------------------------

const MALEFIC_TARA_POSITIONS = new Set([3, 5, 7]); // Vipat, Pratyari, Vadha

function taraPosition(fromIndex: number, toIndex: number): number {
  // 1-indexed position 1-9 counting inclusively from `from` to `to`,
  // cycling every 9 nakshatras (3 full cycles across the 27).
  const diff = (toIndex - fromIndex + 27) % 27;
  const position = (diff % 9) + 1;
  return position;
}

function scoreTara(nakA: NakshatraPosition, nakB: NakshatraPosition): KootaScore {
  const posAtoB = taraPosition(nakA.index, nakB.index);
  const posBtoA = taraPosition(nakB.index, nakA.index);
  const maleficCount =
    (MALEFIC_TARA_POSITIONS.has(posAtoB) ? 1 : 0) + (MALEFIC_TARA_POSITIONS.has(posBtoA) ? 1 : 0);

  const points = maleficCount === 0 ? 3 : maleficCount === 1 ? 1.5 : 0;

  return {
    key: "tara",
    name: "Tara",
    points,
    maxPoints: 3,
    note:
      maleficCount === 0
        ? "Counted both ways between the two birth stars, neither lands on a traditionally difficult position."
        : maleficCount === 1
          ? "Counted both ways between the two birth stars, one direction lands on a traditionally difficult position."
          : "Counted both ways between the two birth stars, both directions land on traditionally difficult positions.",
  };
}

// ---------------------------------------------------------------------------
// 4. Yoni (4 points) — the "animal" symbol of each birth star.
//    Simplified to 3 tiers: same animal, the seven canonical enemy
//    pairs every source agrees on, and everything else — sources gave
//    conflicting values for the in-between friendly/neutral/unfriendly
//    tiers, so those aren't asserted here as if they were settled.
// ---------------------------------------------------------------------------

const NAKSHATRA_YONI: Record<string, string> = {
  Ashwini: "Horse",
  Bharani: "Elephant",
  Krittika: "Sheep",
  Rohini: "Serpent",
  Mrigashira: "Serpent",
  Ardra: "Dog",
  Punarvasu: "Cat",
  Pushya: "Sheep",
  Ashlesha: "Cat",
  Magha: "Rat",
  "Purva Phalguni": "Rat",
  "Uttara Phalguni": "Cow",
  Hasta: "Buffalo",
  Chitra: "Tiger",
  Swati: "Buffalo",
  Vishakha: "Tiger",
  Anuradha: "Deer",
  Jyeshtha: "Deer",
  Mula: "Dog",
  "Purva Ashadha": "Monkey",
  "Uttara Ashadha": "Mongoose",
  Shravana: "Monkey",
  Dhanishta: "Lion",
  Shatabhisha: "Horse",
  "Purva Bhadrapada": "Lion",
  "Uttara Bhadrapada": "Cow",
  Revati: "Elephant",
};

// Stored pre-sorted (alphabetical within each pair) so lookup via
// [a, b].sort().join("+") always matches regardless of which side is A.
const YONI_ENEMY_PAIRS = new Set([
  "Buffalo+Horse",
  "Elephant+Lion",
  "Monkey+Sheep",
  "Mongoose+Serpent",
  "Deer+Dog",
  "Cat+Rat",
  "Cow+Tiger",
]);

function areYoniEnemies(a: string, b: string): boolean {
  return YONI_ENEMY_PAIRS.has([a, b].sort().join("+"));
}

function scoreYoni(nakA: NakshatraPosition, nakB: NakshatraPosition): KootaScore {
  const yoniA = NAKSHATRA_YONI[nakA.attributes.name];
  const yoniB = NAKSHATRA_YONI[nakB.attributes.name];

  const points = yoniA === yoniB ? 4 : areYoniEnemies(yoniA, yoniB) ? 0 : 2;

  return {
    key: "yoni",
    name: "Yoni",
    points,
    maxPoints: 4,
    note:
      yoniA === yoniB
        ? `Both birth stars share the ${yoniA} yoni — traditionally an easy instinctive match.`
        : `Person A's birth star carries the ${yoniA} yoni and Person B's the ${yoniB} yoni.`,
  };
}

// ---------------------------------------------------------------------------
// 5. Graha Maitri (5 points) — natural friendship between the classical
//    planets that rule each person's Moon sign.
// ---------------------------------------------------------------------------

type Graha = "Sun" | "Moon" | "Mars" | "Mercury" | "Jupiter" | "Venus" | "Saturn";

const SIGN_LORD: Record<ZodiacSign, Graha> = {
  Aries: "Mars",
  Scorpio: "Mars",
  Taurus: "Venus",
  Libra: "Venus",
  Gemini: "Mercury",
  Virgo: "Mercury",
  Cancer: "Moon",
  Leo: "Sun",
  Sagittarius: "Jupiter",
  Pisces: "Jupiter",
  Capricorn: "Saturn",
  Aquarius: "Saturn",
};

// Classical (Naisargika) planetary friendship — deliberately asymmetric,
// exactly as the tradition defines it (e.g. the Moon counts Mercury as a
// friend, but Mercury counts the Moon as an enemy).
const GRAHA_FRIENDS: Record<Graha, Graha[]> = {
  Sun: ["Moon", "Mars", "Jupiter"],
  Moon: ["Sun", "Mercury"],
  Mars: ["Sun", "Moon", "Jupiter"],
  Mercury: ["Sun", "Venus"],
  Jupiter: ["Sun", "Moon", "Mars"],
  Venus: ["Mercury", "Saturn"],
  Saturn: ["Mercury", "Venus"],
};
const GRAHA_ENEMIES: Record<Graha, Graha[]> = {
  Sun: ["Venus", "Saturn"],
  Moon: [],
  Mars: ["Mercury"],
  Mercury: ["Moon"],
  Jupiter: ["Mercury", "Venus"],
  Venus: ["Sun", "Moon"],
  Saturn: ["Sun", "Moon", "Mars"],
};

function relation(from: Graha, to: Graha): "friend" | "neutral" | "enemy" {
  if (from === to) return "friend";
  if (GRAHA_FRIENDS[from].includes(to)) return "friend";
  if (GRAHA_ENEMIES[from].includes(to)) return "enemy";
  return "neutral";
}

function scoreGrahaMaitri(signA: ZodiacSign, signB: ZodiacSign): KootaScore {
  const lordA = SIGN_LORD[signA];
  const lordB = SIGN_LORD[signB];

  if (lordA === lordB) {
    return {
      key: "grahaMaitri",
      name: "Graha Maitri",
      points: 5,
      maxPoints: 5,
      note: `Both Moon signs share the same ruling planet, ${lordA} — traditionally an easy natural rapport.`,
    };
  }

  const aToB = relation(lordA, lordB);
  const bToA = relation(lordB, lordA);
  const relations = [aToB, bToA];
  const friends = relations.filter((r) => r === "friend").length;
  const enemies = relations.filter((r) => r === "enemy").length;

  let points: number;
  if (friends === 2) points = 5;
  else if (friends === 1 && enemies === 0) points = 4;
  else if (friends === 0 && enemies === 0) points = 3;
  else if (friends === 1 && enemies === 1) points = 1;
  else if (enemies === 1) points = 0.5;
  else points = 0;

  return {
    key: "grahaMaitri",
    name: "Graha Maitri",
    points,
    maxPoints: 5,
    note: `Person A's Moon sign is ruled by ${lordA} and Person B's by ${lordB} — traditionally read for how naturally the two temperaments get along.`,
  };
}

// ---------------------------------------------------------------------------
// 6. Gana (6 points) — the birth star's traditional temperament group.
// ---------------------------------------------------------------------------

function scoreGana(nakA: NakshatraPosition, nakB: NakshatraPosition): KootaScore {
  const ganaA = nakA.attributes.gana;
  const ganaB = nakB.attributes.gana;

  let points: number;
  if (ganaA === ganaB) points = 6;
  else if (ganaA === "Deva" && ganaB === "Manushya") points = 6;
  else if (ganaA === "Manushya" && ganaB === "Deva") points = 5;
  else if (ganaA === "Rakshasa" && ganaB === "Deva") points = 1;
  else points = 0;

  return {
    key: "gana",
    name: "Gana",
    points,
    maxPoints: 6,
    note:
      ganaA === ganaB
        ? `Both birth stars share the ${ganaA} gana — traditionally an easy shared temperament.`
        : `Person A's birth star carries the ${ganaA} gana and Person B's the ${ganaB} gana.`,
  };
}

// ---------------------------------------------------------------------------
// 7. Bhakoot (7 points) — the distance between the two Moon signs.
// ---------------------------------------------------------------------------

const BHAKOOT_DOSHA_DISTANCES = new Set([2, 12, 5, 9, 6, 8]);

function scoreBhakoot(signA: ZodiacSign, signB: ZodiacSign): KootaScore {
  const indexA = getZodiacSignIndex(signA);
  const indexB = getZodiacSignIndex(signB);
  const distance = ((indexB - indexA + 12) % 12) + 1; // 1-12

  const points = BHAKOOT_DOSHA_DISTANCES.has(distance) ? 0 : 7;

  return {
    key: "bhakoot",
    name: "Bhakoot",
    points,
    maxPoints: 7,
    note:
      points === 7
        ? "The two Moon signs sit at a traditionally supportive distance from each other."
        : "The two Moon signs sit at a distance traditionally flagged as Bhakoot Dosha — a caution to weigh alongside the rest of the chart, not a verdict on its own.",
  };
}

// ---------------------------------------------------------------------------
// 8. Nadi (8 points) — the birth star's traditional "pulse" or humor group.
// ---------------------------------------------------------------------------

const NADI_GROUPS: Record<string, "Aadi" | "Madhya" | "Antya"> = {
  Ashwini: "Aadi",
  Ardra: "Aadi",
  Punarvasu: "Aadi",
  "Uttara Phalguni": "Aadi",
  Hasta: "Aadi",
  Jyeshtha: "Aadi",
  Mula: "Aadi",
  Shatabhisha: "Aadi",
  "Purva Bhadrapada": "Aadi",
  Bharani: "Madhya",
  Mrigashira: "Madhya",
  Pushya: "Madhya",
  "Purva Phalguni": "Madhya",
  Chitra: "Madhya",
  Anuradha: "Madhya",
  "Purva Ashadha": "Madhya",
  Dhanishta: "Madhya",
  "Uttara Bhadrapada": "Madhya",
  Krittika: "Antya",
  Rohini: "Antya",
  Ashlesha: "Antya",
  Magha: "Antya",
  Swati: "Antya",
  Vishakha: "Antya",
  "Uttara Ashadha": "Antya",
  Shravana: "Antya",
  Revati: "Antya",
};

function scoreNadi(nakA: NakshatraPosition, nakB: NakshatraPosition): KootaScore {
  const nadiA = NADI_GROUPS[nakA.attributes.name];
  const nadiB = NADI_GROUPS[nakB.attributes.name];

  const points = nadiA === nadiB ? 0 : 8;

  return {
    key: "nadi",
    name: "Nadi",
    points,
    maxPoints: 8,
    note:
      nadiA === nadiB
        ? `Both birth stars share the ${nadiA} Nadi — traditionally flagged as Nadi Dosha, the most heavily weighted caution in this system.`
        : `Person A's birth star carries the ${nadiA} Nadi and Person B's the ${nadiB} Nadi — traditionally read as no Nadi Dosha.`,
  };
}

// ---------------------------------------------------------------------------
// Total, category and public entry point.
// ---------------------------------------------------------------------------

function categorize(totalPoints: number): { category: GunaMilanCategory; categoryLabel: string } {
  if (totalPoints >= 32) return { category: "excellent", categoryLabel: "Excellent traditional match" };
  if (totalPoints >= 24) return { category: "good", categoryLabel: "Good traditional match" };
  if (totalPoints >= 18) return { category: "average", categoryLabel: "Average traditional match" };
  return { category: "belowAverage", categoryLabel: "Below the traditional threshold" };
}

/**
 * Computes the traditional 36-point Ashtakoot Guna Milan score from two
 * already-calculated birth charts. See the module comment above for what
 * is precise traditional rule vs. a documented simplification.
 */
export function calculateGunaMilan(chartA: BirthChartResult, chartB: BirthChartResult): GunaMilanResult {
  const moonA = chartA.planets.find((p) => p.planet === "Moon")!;
  const moonB = chartB.planets.find((p) => p.planet === "Moon")!;

  const kootas: KootaScore[] = [
    scoreVarna(moonA.sign, moonB.sign),
    scoreVashya(moonA.sign, moonA.degreeInSign, moonB.sign, moonB.degreeInSign),
    scoreTara(chartA.moonNakshatra, chartB.moonNakshatra),
    scoreYoni(chartA.moonNakshatra, chartB.moonNakshatra),
    scoreGrahaMaitri(moonA.sign, moonB.sign),
    scoreGana(chartA.moonNakshatra, chartB.moonNakshatra),
    scoreBhakoot(moonA.sign, moonB.sign),
    scoreNadi(chartA.moonNakshatra, chartB.moonNakshatra),
  ];

  const totalPoints = kootas.reduce((sum, k) => sum + k.points, 0);
  const { category, categoryLabel } = categorize(totalPoints);

  return { kootas, totalPoints, maxPoints: 36, category, categoryLabel };
}
