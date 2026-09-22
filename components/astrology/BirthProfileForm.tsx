"use client";

import { useState } from "react";
import { calculateBirthChart } from "@/lib/astrology";
import type { BirthChartResult } from "@/types/astrology";
import BirthDetailsForm, { type ResolvedBirthDetails } from "@/components/astrology/BirthDetailsForm";
import BirthChartSummary from "@/components/astrology/BirthChartSummary";

interface ResultState {
  chart: BirthChartResult;
  placeLabel: string;
  timezone: string;
  utcInstant: Date;
  approximateTime: boolean;
}

export default function BirthProfileForm() {
  const [result, setResult] = useState<ResultState | null>(null);

  function handleResolve(details: ResolvedBirthDetails) {
    const chart = calculateBirthChart({
      utcDate: details.utcInstant,
      latitude: details.latitude,
      longitudeEast: details.longitudeEast,
    });
    setResult({
      chart,
      placeLabel: details.placeLabel,
      timezone: details.timezone,
      utcInstant: details.utcInstant,
      approximateTime: details.approximateTime,
    });
  }

  return (
    <div>
      <BirthDetailsForm onResolve={handleResolve} submitLabel="Calculate My Birth Chart" />

      <p className="mt-4 text-xs text-textMuted/70">
        Everything above is calculated in your browser — your name, birth date,
        time and place are never sent to a server or stored.
      </p>

      {result && (
        <BirthChartSummary
          result={result.chart}
          placeLabel={result.placeLabel}
          timezone={result.timezone}
          utcInstant={result.utcInstant}
          approximateTime={result.approximateTime}
        />
      )}
    </div>
  );
}
