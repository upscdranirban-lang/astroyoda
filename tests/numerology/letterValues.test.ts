import { describe, expect, it } from "vitest";
import { normalizeNameForNumerology, letterValue } from "@/lib/numerology/letterValues";

describe("normalizeNameForNumerology", () => {
  it("uppercases a plain name", () => {
    expect(normalizeNameForNumerology("john")).toBe("JOHN");
  });

  it("strips spaces and punctuation", () => {
    expect(normalizeNameForNumerology("Mary-Jane O'Brien")).toBe("MARYJANEOBRIEN");
  });

  it("strips accents from Unicode letters instead of dropping the letter", () => {
    expect(normalizeNameForNumerology("José")).toBe("JOSE");
  });

  it("strips digits and symbols entirely", () => {
    expect(normalizeNameForNumerology("Anna123!!!")).toBe("ANNA");
  });

  it("returns an empty string for input with no Latin letters", () => {
    expect(normalizeNameForNumerology("123 !!! 你好")).toBe("");
  });
});

describe("letterValue", () => {
  it("maps A-I to 1-9", () => {
    expect(letterValue("A")).toBe(1);
    expect(letterValue("I")).toBe(9);
  });

  it("wraps around so J-R map back to 1-9", () => {
    expect(letterValue("J")).toBe(1);
    expect(letterValue("R")).toBe(9);
  });

  it("wraps around again so S-Z map to 1-8", () => {
    expect(letterValue("S")).toBe(1);
    expect(letterValue("Z")).toBe(8);
  });

  it("returns 0 for a character that isn't A-Z", () => {
    expect(letterValue("5")).toBe(0);
  });
});
