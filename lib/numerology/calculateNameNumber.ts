import { reduceNumber } from "@/lib/numerology/reduceNumber";
import { sumNameLetters } from "@/lib/numerology/nameSum";
import type { NumerologyResult } from "@/types/numerology";

/**
 * Name Number: the same letter-sum-and-reduce method as the Destiny Number,
 * applied to any name you give it (a nickname, current legal name, or a
 * business name) rather than specifically the full birth name. Kept as a
 * separate function so the UI and interpretation copy can distinguish
 * "your birth name" (Destiny) from "a name you're curious about" (Name Number).
 */
export function calculateNameNumber(name: string): NumerologyResult {
  const { normalized, sum } = sumNameLetters(name, "all");
  const reduced = reduceNumber(sum);

  return {
    number: reduced.value,
    type: "name",
    calculation: `"${normalized}" → letter sum ${sum} → ${reduced.value}${reduced.isMasterNumber ? " (master number)" : ""}`,
    interpretationKey: `name_${reduced.value}`,
    isMasterNumber: reduced.isMasterNumber,
  };
}
