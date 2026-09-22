import { reduceNumber } from "@/lib/numerology/reduceNumber";
import { sumNameLetters } from "@/lib/numerology/nameSum";
import type { NumerologyResult } from "@/types/numerology";

/**
 * Personality Number: the consonants in the person's full name, summed and
 * reduced. Traditionally interpreted as the impression others form before
 * they know someone well.
 */
export function calculatePersonalityNumber(fullName: string): NumerologyResult {
  const { normalized, sum } = sumNameLetters(fullName, "consonants");
  const reduced = reduceNumber(sum);

  return {
    number: reduced.value,
    type: "personality",
    calculation: `"${normalized}" → consonant sum ${sum} → ${reduced.value}${reduced.isMasterNumber ? " (master number)" : ""}`,
    interpretationKey: `personality_${reduced.value}`,
    isMasterNumber: reduced.isMasterNumber,
  };
}
