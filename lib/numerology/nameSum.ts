import { letterValue, normalizeNameForNumerology, VOWELS } from "@/lib/numerology/letterValues";

export interface NameSumResult {
  normalized: string;
  sum: number;
}

type LetterFilter = "all" | "vowels" | "consonants";

/**
 * Internal helper shared by the name-based numerology calculators
 * (Destiny/Expression, Soul Urge, Personality, Name Number). Normalizes the
 * name, then sums the Pythagorean value of the letters matching `filter`.
 */
export function sumNameLetters(name: string, filter: LetterFilter): NameSumResult {
  const normalized = normalizeNameForNumerology(name);

  if (normalized.length === 0) {
    throw new RangeError("Name must contain at least one A-Z letter after normalization");
  }

  let sum = 0;
  for (const letter of normalized) {
    const isVowel = VOWELS.has(letter);
    const include =
      filter === "all" || (filter === "vowels" && isVowel) || (filter === "consonants" && !isVowel);
    if (include) {
      sum += letterValue(letter);
    }
  }

  return { normalized, sum };
}
