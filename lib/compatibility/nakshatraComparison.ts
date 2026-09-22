import type { NakshatraPosition } from "@/types/astrology";
import type { NakshatraComparison } from "@/types/compatibility";

/**
 * A light, qualitative Nakshatra comparison — NOT the formal Vedic
 * "Guna Milan" / Kundli-matching system (which scores eight specific
 * factors, including a formal Gana Koota and Nakshatra-pair table out of
 * 36 points). That formal scoring is explicitly out of scope for V1 per
 * the blueprint's §10 ("V2+ scope"); this instead surfaces the same/
 * different Nakshatra, ruling planet and Gana as plain traditional facts
 * with a brief qualitative note, not a point score or verdict.
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
