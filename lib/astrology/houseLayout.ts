import type { BirthChartResult } from "@/types/astrology";
import { ZODIAC_SIGNS, getZodiacSignIndex, type ZodiacSign } from "@/lib/astrology/zodiacSigns";

/** Short codes used inside chart house cells (kept to 2 letters to fit). */
export const PLANET_ABBREVIATIONS: Record<string, string> = {
  Sun: "Su",
  Moon: "Mo",
  Mars: "Ma",
  Mercury: "Me",
  Jupiter: "Ju",
  Venus: "Ve",
  Saturn: "Sa",
  Rahu: "Ra",
  Ketu: "Ke",
};

export interface ChartHouse {
  houseNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sign: ZodiacSign;
  /** The sign's position in the standard zodiac order, 1-12 (Aries=1), as
   * traditionally printed as a small numeral inside each house cell. */
  signNumber: number;
  planetAbbreviations: string[];
  isLagna: boolean;
}

/**
 * Derives the 12 whole-sign houses of a Vedic chart from a calculated
 * result: House 1 always holds the Ascendant's sign, and the remaining
 * houses follow in zodiac order from there (the standard "whole sign"
 * house system used throughout this project — see ascendant.ts / birthChart.ts).
 */
export function getChartHouses(result: BirthChartResult): ChartHouse[] {
  const lagnaSignIndex = getZodiacSignIndex(result.lagna.sign);

  const houses: ChartHouse[] = [];
  for (let houseNumber = 1; houseNumber <= 12; houseNumber++) {
    const signIndex = (lagnaSignIndex + houseNumber - 1) % 12;
    const sign = ZODIAC_SIGNS[signIndex];
    const planetAbbreviations = result.planets
      .filter((p) => p.sign === sign)
      .map((p) => PLANET_ABBREVIATIONS[p.planet] ?? p.planet.slice(0, 2));

    houses.push({
      houseNumber: houseNumber as ChartHouse["houseNumber"],
      sign,
      signNumber: signIndex + 1,
      planetAbbreviations,
      isLagna: houseNumber === 1,
    });
  }
  return houses;
}
