import type { ZodiacSign } from "@/lib/astrology/zodiacSigns";

export type Gana = "Deva" | "Manushya" | "Rakshasa";

export interface NakshatraAttributes {
  name: string;
  rulingPlanet: string; // the Vimshottari dasha lord
  deity: string;
  symbol: string;
  gana: Gana;
}

export interface NakshatraPosition {
  index: number; // 1-27
  pada: 1 | 2 | 3 | 4;
  attributes: NakshatraAttributes;
}

export interface PlanetPosition {
  planet: string;
  tropicalLongitude: number;
  siderealLongitude: number;
  sign: ZodiacSign;
  degreeInSign: number;
}

export interface BirthChartInput {
  utcDate: Date;
  latitude: number; // degrees, north positive
  longitudeEast: number; // degrees, EAST positive
}

export interface BirthChartResult {
  lagna: { sign: ZodiacSign; degreeInSign: number; siderealLongitude: number };
  planets: PlanetPosition[]; // Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu
  moonNakshatra: NakshatraPosition;
  ayanamsaUsed: number;
}
