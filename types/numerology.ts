export type NumerologyType =
  | "life_path"
  | "birthday"
  | "destiny"
  | "soul_urge"
  | "personality"
  | "name";

export interface NumerologyResult {
  number: number;
  type: NumerologyType;
  calculation: string; // human-readable steps, shown in the UI's "how this was calculated"
  interpretationKey: string; // e.g. "life_path_7" or "life_path_11" — looked up by the interpretation layer
  isMasterNumber: boolean;
}
