export interface ReducedNumber {
  value: number;
  isMasterNumber: boolean;
  steps: number[]; // every intermediate value, including the input and the final value
}

const MASTER_NUMBERS = new Set([11, 22, 33]);

export function sumDigits(n: number): number {
  return Math.abs(Math.trunc(n))
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number(digit), 0);
}

/**
 * Reduces a non-negative integer to a single digit (1-9), unless it collapses
 * onto a master number (11, 22, 33) first, in which case reduction stops there.
 * Master numbers are checked at every stage, not only at the end, matching
 * standard numerology practice.
 */
export function reduceNumber(input: number, allowMasterNumbers = true): ReducedNumber {
  if (!Number.isFinite(input) || input < 0) {
    throw new RangeError(`reduceNumber expects a non-negative finite number, got ${input}`);
  }

  const steps: number[] = [input];
  let current = Math.trunc(input);

  while (current > 9 && !(allowMasterNumbers && MASTER_NUMBERS.has(current))) {
    current = sumDigits(current);
    steps.push(current);
  }

  return {
    value: current,
    isMasterNumber: allowMasterNumbers && MASTER_NUMBERS.has(current),
    steps,
  };
}

export function isMasterNumber(n: number): boolean {
  return MASTER_NUMBERS.has(n);
}
