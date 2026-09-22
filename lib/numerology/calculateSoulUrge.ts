import { reduceNumber } from "@/lib/numerology/reduceNumber";
import { sumNameLetters } from "@/lib/numerology/nameSum";
import type { NumerologyResult } from "@/types/numerology";

/**
 * Soul Urge Number (also called the Heart's Desire Number): the vowels in
 * the person's full name, summed and reduced. Traditionally interpreted as
 * describing inner motivation rather than outward expression.
 */
export function calculateSoulUrge(fullName: string): NumerologyResult {
  const { normalized, sum } = sumNameLetters(fullName, "vowels");
  const reduced = reduceNumber(sum);

  return {
    number: reduced.value,
    type: "soul_urge",
    calculation: `"${normalized}" → vowel sum ${sum} → ${reduced.value}${reduced.isMasterNumber ? " (master number)" : ""}`,
    interpretationKey: `soul_urge_${reduced.value}`,
    isMasterNumber: reduced.isMasterNumber,
  };
}
