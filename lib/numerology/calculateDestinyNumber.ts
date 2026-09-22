import { reduceNumber } from "@/lib/numerology/reduceNumber";
import { sumNameLetters } from "@/lib/numerology/nameSum";
import type { NumerologyResult } from "@/types/numerology";

/**
 * Destiny Number (also called the Expression Number): every letter of the
 * person's full birth name, summed and reduced. Traditionally calculated
 * from the full name given at birth, not a nickname or married name.
 */
export function calculateDestinyNumber(fullBirthName: string): NumerologyResult {
  const { normalized, sum } = sumNameLetters(fullBirthName, "all");
  const reduced = reduceNumber(sum);

  return {
    number: reduced.value,
    type: "destiny",
    calculation: `"${normalized}" → letter sum ${sum} → ${reduced.value}${reduced.isMasterNumber ? " (master number)" : ""}`,
    interpretationKey: `destiny_${reduced.value}`,
    isMasterNumber: reduced.isMasterNumber,
  };
}
