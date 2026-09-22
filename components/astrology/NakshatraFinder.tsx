"use client";

import { useState } from "react";
import { calculateBirthChart } from "@/lib/astrology";
import type { BirthChartResult } from "@/types/astrology";
import BirthDetailsForm, { type ResolvedBirthDetails } from "@/components/astrology/BirthDetailsForm";
import NakshatraResultCard from "@/components/astrology/NakshatraResultCard";

interface ResultState {
  chart: BirthChartResult;
  approximateTime: boolean;
}

/**
 * Reuses the shared BirthDetailsForm (per blueprint §9) but surfaces only
 * the Nakshatra-relevant part of the calculated chart, rather than the
 * full birth chart shown by BirthProfileForm.
 */
export default function NakshatraFinder() {
  const [result, setResult] = useState<ResultState | null>(null);

  function handleResolve(details: ResolvedBirthDetails) {
    const chart = calculateBirthChart({
      utcDate: details.utcInstant,
      latitude: details.latitude,
      longitudeEast: details.longitudeEast,
    });
    setResult({ chart, approximateTime: details.approximateTime });
  }

  return (
    <div>
      <BirthDetailsForm onResolve={handleResolve} submitLabel="Find My Nakshatra" showNameField={false} />

      <p className="mt-4 text-xs text-textMuted/70">
        Everything above is calculated in your browser — your birth date, time
        and place are never sent to a server or stored.
      </p>

      {result && <NakshatraResultCard result={result.chart} approximateTime={result.approximateTime} />}
    </div>
  );
}
