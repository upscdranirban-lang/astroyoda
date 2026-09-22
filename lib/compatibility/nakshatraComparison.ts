import type { NakshatraPosition } from "@/types/astrology";
import type { NakshatraComparison } from "@/types/compatibility";

/**
 * A light, qualitative Nakshatra comparison — separate from the formal
 * Ashtakoot "Guna Milan" scoring system (lib/compatibility/gunaMilan.ts),
 * which covers the same/different Nakshatra, ruling planet and Gana
 * territory with an actual point score. This one stays purely
 * descriptive: the same/different Nakshatra, ruling planet and Gana as
 * plain traditional facts with a brief qualitative note, no point score.
 */
export function compareNakshatras(a: NakshatraPosition, b: NakshatraPosition): NakshatraComparison {
  const sameNakshatra = a.attributes.name === b.attributes.name;
  const sameRulingPlanet = a.attributes.rulingPlanet === b.attributes.rulingPlanet;
  const sameGana = a.attributes.gana === b.attributes.gana;

  const notes: string[] = [];

  if (sameNakshatra) {
    notes.push(
      `Both Moons fall in ${a.attributes.name} — a traditionally strong shared foundation, since you're drawing on the same lunar mansion's themes.`
    );
  } else if (sameRulingPlanet) {
    notes.push(
      `Different Nakshatras, but both ruled by ${a.attributes.rulingPlanet} — traditionally suggesting a shared underlying drive or temperament even where the surface themes differ.`
    );
  }

  if (sameGana) {
    notes.push(
      `Both fall in the ${a.attributes.gana} Gana — traditionally read as an easier temperamental match.`
    );
  } else {
    notes.push(
      `One Gana is ${a.attributes.gana} and the other ${b.attributes.gana} — traditionally read as differing temperaments that benefit from mutual understanding, not as an incompatibility verdict.`
    );
  }

  if (notes.length === 0) {
    notes.push("Different Nakshatras, ruling planets and Ganas — each partner brings a distinct lunar temperament.");
  }

  return { sameNakshatra, sameRulingPlanet, sameGana, note: notes.join(" ") };
}
