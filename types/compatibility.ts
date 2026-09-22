export type ZodiacElement = "Fire" | "Earth" | "Air" | "Water";

export type RelationshipTone = "harmonious" | "neutral" | "challenging" | "same";

export interface ElementComparison {
  elementA: ZodiacElement;
  elementB: ZodiacElement;
  tone: RelationshipTone;
  note: string;
}

export interface NakshatraComparison {
  sameNakshatra: boolean;
  sameRulingPlanet: boolean;
  sameGana: boolean;
  note: string;
}

export interface CompatibilityResult {
  moonSign: ElementComparison;
  sunSign: ElementComparison;
  ascendant: ElementComparison;
  nakshatra: NakshatraComparison;
}

/** One of the 8 traditional Ashtakoot ("eight-part") Guna Milan factors. */
export interface KootaScore {
  key: "varna" | "vashya" | "tara" | "yoni" | "grahaMaitri" | "gana" | "bhakoot" | "nadi";
  name: string;
  points: number;
  maxPoints: number;
  note: string;
}

export type GunaMilanCategory = "excellent" | "good" | "average" | "belowAverage";

export interface GunaMilanResult {
  kootas: KootaScore[];
  totalPoints: number;
  maxPoints: 36;
  category: GunaMilanCategory;
  categoryLabel: string;
}
