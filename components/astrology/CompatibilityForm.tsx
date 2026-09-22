"use client";

import { useState } from "react";
import { calculateBirthChart } from "@/lib/astrology";
import { getCompatibilityNotes, calculateGunaMilan } from "@/lib/compatibility";
import type { BirthChartResult } from "@/types/astrology";
import type { CompatibilityResult as CompatibilityResultType, GunaMilanResult } from "@/types/compatibility";
import BirthDetailsForm, { type ResolvedBirthDetails } from "@/components/astrology/BirthDetailsForm";
import CompatibilityResult from "@/components/astrology/CompatibilityResult";
import GunaMilanScore from "@/components/astrology/GunaMilanScore";

interface PersonState {
  details: ResolvedBirthDetails;
  chart: BirthChartResult;
}

export default function CompatibilityForm() {
  const [personA, setPersonA] = useState<PersonState | null>(null);
  const [personB, setPersonB] = useState<PersonState | null>(null);

  function resolvePerson(details: ResolvedBirthDetails): PersonState {
    const chart = calculateBirthChart({
      utcDate: details.utcInstant,
      latitude: details.latitude,
      longitudeEast: details.longitudeEast,
    });
    return { details, chart };
  }

  const compatibility: CompatibilityResultType | null =
    personA && personB ? getCompatibilityNotes(personA.chart, personB.chart) : null;

  const gunaMilan: GunaMilanResult | null =
    personA && personB ? calculateGunaMilan(personA.chart, personB.chart) : null;

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold mb-3">
            Person A {personA && <span className="text-gold text-sm font-normal">✓ Saved</span>}
          </h2>
          <BirthDetailsForm
            idPrefix="personA-"
            onResolve={(d) => setPersonA(resolvePerson(d))}
            submitLabel={personA ? "Update Person A" : "Save Person A"}
          />
        </div>

        <div>
          <h2 className="font-display text-xl font-semibold mb-3">
            Person B {personB && <span className="text-gold text-sm font-normal">✓ Saved</span>}
          </h2>
          <BirthDetailsForm
            idPrefix="personB-"
            onResolve={(d) => setPersonB(resolvePerson(d))}
            submitLabel={personB ? "Update Person B" : "Save Person B"}
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-textMuted/70">
        Everything above is calculated in your browser — neither person&apos;s
        details are sent to a server or stored.
      </p>

      {!compatibility && (personA || personB) && (
        <p className="mt-6 text-sm text-textMuted">
          Save both {personA ? "Person B's" : "Person A's"} details above to see the comparison.
        </p>
      )}

      {gunaMilan && (
        <div className="mt-8">
          <GunaMilanScore result={gunaMilan} />
        </div>
      )}

      {compatibility && <CompatibilityResult result={compatibility} />}
    </div>
  );
}
