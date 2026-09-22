import { describe, expect, it } from "vitest";
import { reduceNumber, sumDigits, isMasterNumber } from "@/lib/numerology/reduceNumber";

describe("sumDigits", () => {
  it("sums the digits of a multi-digit number", () => {
    expect(sumDigits(1990)).toBe(19);
  });

  it("returns the same value for a single digit", () => {
    expect(sumDigits(7)).toBe(7);
  });

  it("returns 0 for 0", () => {
    expect(sumDigits(0)).toBe(0);
  });
});

describe("isMasterNumber", () => {
  it("recognizes 11, 22 and 33 as master numbers", () => {
    expect(isMasterNumber(11)).toBe(true);
    expect(isMasterNumber(22)).toBe(true);
    expect(isMasterNumber(33)).toBe(true);
  });

  it("does not treat 44 or 10 as master numbers", () => {
    expect(isMasterNumber(44)).toBe(false);
    expect(isMasterNumber(10)).toBe(false);
  });
});

describe("reduceNumber", () => {
  it("reduces an ordinary multi-digit number to a single digit", () => {
    // 1990 -> 1+9+9+0=19 -> 1+9=10 -> 1+0=1
    const result = reduceNumber(1990);
    expect(result.value).toBe(1);
    expect(result.isMasterNumber).toBe(false);
    expect(result.steps).toEqual([1990, 19, 10, 1]);
  });

  it("leaves a single digit unchanged", () => {
    expect(reduceNumber(7)).toEqual({ value: 7, isMasterNumber: false, steps: [7] });
  });

  it("leaves 0 unchanged", () => {
    expect(reduceNumber(0)).toEqual({ value: 0, isMasterNumber: false, steps: [0] });
  });

  it("stops at 11 instead of reducing it to 2", () => {
    // 29 -> 2+9=11, and 11 is a master number so reduction stops there
    const result = reduceNumber(29);
    expect(result.value).toBe(11);
    expect(result.isMasterNumber).toBe(true);
    expect(result.steps).toEqual([29, 11]);
  });

  it("stops at 22 instead of reducing it to 4", () => {
    // 1993 -> 1+9+9+3=22, a master number
    const result = reduceNumber(1993);
    expect(result.value).toBe(22);
    expect(result.isMasterNumber).toBe(true);
  });

  it("recognizes 33 as already-master with no further reduction needed", () => {
    const result = reduceNumber(33);
    expect(result.value).toBe(33);
    expect(result.isMasterNumber).toBe(true);
    expect(result.steps).toEqual([33]);
  });

  it("does NOT preserve master numbers when allowMasterNumbers is false", () => {
    const result = reduceNumber(29, false);
    // 29 -> 11 -> 1+1=2, since master numbers are disallowed
    expect(result.value).toBe(2);
    expect(result.isMasterNumber).toBe(false);
  });

  it("reduces a number that only becomes a master number after several steps", () => {
    // 3899 -> 3+8+9+9=29 -> 2+9=11 (master)
    const result = reduceNumber(3899);
    expect(result.value).toBe(11);
    expect(result.isMasterNumber).toBe(true);
  });

  it("throws on a negative input", () => {
    expect(() => reduceNumber(-5)).toThrow(RangeError);
  });

  it("throws on a non-finite input", () => {
    expect(() => reduceNumber(Infinity)).toThrow(RangeError);
  });
});
