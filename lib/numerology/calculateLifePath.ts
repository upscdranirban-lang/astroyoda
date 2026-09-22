import { parseCalendarDate, type CalendarDate } from "@/lib/dateUtils";
import { reduceNumber } from "@/lib/numerology/reduceNumber";
import type { NumerologyResult } from "@/types/numerology";

/**
 * Life Path Number: the most commonly cited numerology number, derived from
 * the full date of birth. Month, day and year are each reduced separately
 * (preserving master numbers 11/22/33 at every stage), then the three
 * reduced values are summed and reduced again.
 */
export function calculateLifePath(dateOfBirth: string | CalendarDate): NumerologyResult {
  const { year, month, day } = parseCalendarDate(dateOfBirth);

  const reducedMonth = reduceNumber(month);
  const reducedDay = reduceNumber(day);
  const reducedYear = reduceNumber(year);

  const total = reducedMonth.value + reducedDay.value + reducedYear.value;
  const final = reduceNumber(total);

  const calculation =
    `Month ${month} → ${reducedMonth.value}` +
    (reducedMonth.isMasterNumber ? " (master number)" : "") +
    `; Day ${day} → ${reducedDay.value}` +
    (reducedDay.isMasterNumber ? " (master number)" : "") +
    `; Year ${year} → ${reducedYear.value}` +
    (reducedYear.isMasterNumber ? " (master number)" : "") +
    `; ${reducedMonth.value} + ${reducedDay.value} + ${reducedYear.value} = ${total} → ${final.value}` +
    (final.isMasterNumber ? " (master number)" : "");

  return {
    number: final.value,
    type: "life_path",
    calculation,
    interpretationKey: `life_path_${final.value}`,
    isMasterNumber: final.isMasterNumber,
  };
}
