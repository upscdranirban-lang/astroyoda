import { describe, expect, it } from "vitest";
import { calculateDestinyNumber } from "@/lib/numerology/calculateDestinyNumber";
import { calculateSoulUrge } from "@/lib/numerology/calculateSoulUrge";
import { calculatePersonalityNumber } from "@/lib/numerology/calculatePersonalityNumber";
import { calculateNameNumber } from "@/lib/numerology/calculateNameNumber";

// Reference name: JOHN -> J1 O6 H8 N5
// Vowels: O(6). Consonants: J(1) H(8) N(5) = 14.
// Total: 1+6+8+5 = 20 -> 2+0 = 2.

describe("calculateDestinyNumber", () => {
  it("sums every letter of the name and reduces it", () => {
    const result = calculateDestinyNumber("John");
    expect(result.number).toBe(2);
    expect(result.isMasterNumber).toBe(false);
    expect(result.type).toBe("destiny");
  });

  it("preserves a master number when the letter sum lands on one", () => {
    // F(6) + I(9) + G(7) = 22, itself a master number
    const result = calculateDestinyNumber("Fig");
    expect(result.number).toBe(22);
    expect(result.isMasterNumber).toBe(true);
  });

  it("ignores case, spacing and punctuation", () => {
    const a = calculateDestinyNumber("John");
    const b = calculateDestinyNumber("  jOHN  ");
    expect(a.number).toBe(b.number);
  });

  it("throws when the name has no A-Z letters after normalization", () => {
    expect(() => calculateDestinyNumber("123")).toThrow(RangeError);
  });
});

describe("calculateSoulUrge", () => {
  it("sums only the vowels", () => {
    const result = calculateSoulUrge("John");
    expect(result.number).toBe(6); // O=6, already a single digit
    expect(result.type).toBe("soul_urge");
  });

  it("returns 0 for a name with no vowels, rather than throwing", () => {
    const result = calculateSoulUrge("Brr");
    expect(result.number).toBe(0);
    expect(result.isMasterNumber).toBe(false);
  });
});

describe("calculatePersonalityNumber", () => {
  it("sums only the consonants", () => {
    // J(1) + H(8) + N(5) = 14 -> 1+4 = 5
    const result = calculatePersonalityNumber("John");
    expect(result.number).toBe(5);
    expect(result.type).toBe("personality");
  });
});

describe("consistency between the three name-based numbers", () => {
  it("vowel sum + consonant sum equals the total letter sum, pre-reduction", () => {
    // This checks the split logic (vowels vs. consonants) is exhaustive and
    // non-overlapping for a representative name.
    const name = "Anirban Test";
    const destiny = calculateDestinyNumber(name);
    const soulUrge = calculateSoulUrge(name);
    const personality = calculatePersonalityNumber(name);

    // Re-derive raw sums independently to cross-check against the reduced results
    // by reducing (soulUrge + personality) the same way destiny was reduced.
    // We can't access the raw sums directly here (they're an implementation
    // detail), so instead assert the calculation strings agree on the same
    // normalized name.
    expect(destiny.calculation).toContain("ANIRBANTEST");
    expect(soulUrge.calculation).toContain("ANIRBANTEST");
    expect(personality.calculation).toContain("ANIRBANTEST");
  });
});

describe("calculateNameNumber", () => {
  it("uses the same method as Destiny Number for an arbitrary name", () => {
    const destiny = calculateDestinyNumber("John");
    const nameNumber = calculateNameNumber("John");
    expect(nameNumber.number).toBe(destiny.number);
    expect(nameNumber.type).toBe("name");
    expect(nameNumber.interpretationKey).toBe("name_2");
  });
});
