import { numberEssence } from "@/data/interpretations/numberEssence";
import type { NumerologyType } from "@/types/numerology";

const FACET_LABEL: Record<NumerologyType, string> = {
  life_path: "Life Path Number",
  birthday: "Birthday Number",
  destiny: "Destiny Number",
  soul_urge: "Soul Urge Number",
  personality: "Personality Number",
  name: "Name Number",
};

/**
 * Builds a short, traditional-style interpretation sentence for a given
 * interpretation key (e.g. "life_path_11"), by combining the number's shared
 * "essence" with a facet-specific framing. This is the interpretation layer
 * described in the blueprint: it reads structured calculation results and
 * looks up meaning, but never calculates anything itself.
 */
export function getNumerologyInterpretation(interpretationKey: string): string {
  const match = /^(life_path|birthday|destiny|soul_urge|personality|name)_(\d+)$/.exec(
    interpretationKey
  );

  if (!match) {
    return "This number doesn't have a written interpretation yet.";
  }

  const type = match[1] as NumerologyType;
  const number = Number(match[2]);
  const essence = numberEssence[number];

  if (!essence) {
    // Reachable for an edge case like a Soul Urge of 0 (a name with no vowels).
    return `This is an unusually rare ${FACET_LABEL[type].toLowerCase()} without a standard traditional reading — it isn't one of the numbers classical numerology assigns meaning to.`;
  }

  switch (type) {
    case "life_path":
      return `Your Life Path Number describes the overall shape of your journey. Traditionally, a Life Path of ${number} (${essence.keyword}) is read as a life organized around ${essence.trait}.`;
    case "birthday":
      return `Your Birthday Number is a smaller, supporting talent alongside your Life Path. A Birthday Number of ${number} traditionally points to a natural comfort with ${essence.trait}.`;
    case "destiny":
      return `Your Destiny Number describes what you're traditionally considered here to express outwardly. A Destiny of ${number} (${essence.keyword}) points toward a life that puts ${essence.trait} to use in the world.`;
    case "soul_urge":
      return `Your Soul Urge Number reflects inner motivation — what you want, whether or not it shows on the surface. A Soul Urge of ${number} traditionally suggests a private pull toward ${essence.trait}.`;
    case "personality":
      return `Your Personality Number is the impression people often form before they know you well. A Personality of ${number} is traditionally read as coming across through ${essence.trait}.`;
    case "name":
      return `This name's Name Number is ${number} (${essence.keyword}), traditionally associated with ${essence.trait}.`;
    default:
      return "This number doesn't have a written interpretation yet.";
  }
}

export function getNumberKeyword(number: number): string | undefined {
  return numberEssence[number]?.keyword;
}
