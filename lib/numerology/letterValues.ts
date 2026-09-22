// Standard Pythagorean numerology letter-to-number map (A-Z -> 1-9, repeating).
// This is the only place letter values are defined; every calculator imports it.
export const PYTHAGOREAN_LETTER_VALUES: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8,
};

export const VOWELS = new Set(["A", "E", "I", "O", "U"]);
// Y is treated as a consonant throughout this project. Some numerology systems
// treat Y as a vowel when it carries a vowel sound (e.g. "Lynn"); that variant
// rule is intentionally not implemented in V1 — see the numerology page copy.

/**
 * Normalizes a name for numerology use: uppercases and strips diacritics
 * (e.g. "José" -> "JOSE") so accented Latin names map onto the same table,
 * then removes anything that isn't A-Z (spaces, punctuation, digits, and
 * any remaining non-Latin characters).
 */
export function normalizeNameForNumerology(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // strip combining diacritics
    .toUpperCase()
    .replace(/[^A-Z]/g, "");
}

export function letterValue(letter: string): number {
  return PYTHAGOREAN_LETTER_VALUES[letter] ?? 0;
}
