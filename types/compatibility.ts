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
