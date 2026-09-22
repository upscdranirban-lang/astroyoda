"use client";

import { useState, type FormEvent } from "react";
import { calculateLifePath } from "@/lib/numerology/calculateLifePath";
import { calculateDestinyNumber } from "@/lib/numerology/calculateDestinyNumber";
import { calculateSoulUrge } from "@/lib/numerology/calculateSoulUrge";
import { calculatePersonalityNumber } from "@/lib/numerology/calculatePersonalityNumber";
import type { NumerologyResult } from "@/types/numerology";
import NumberResultCard from "@/components/numerology/NumberResultCard";

interface FormState {
  name: string;
  dob: string; // "YYYY-MM-DD" from the native date input
}

export default function NumerologyForm() {
  const [form, setForm] = useState<FormState>({ name: "", dob: "" });
  const [results, setResults] = useState<NumerologyResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const trimmedName = form.name.trim();

    if (!trimmedName) {
      setError("Please enter a name — it's used for your Destiny, Soul Urge and Personality numbers.");
      setResults(null);
      return;
    }
    if (!form.dob) {
      setError("Please enter a date of birth — it's used for your Life Path number.");
      setResults(null);
      return;
    }

    try {
      const computed: NumerologyResult[] = [
        calculateLifePath(form.dob),
        calculateDestinyNumber(trimmedName),
        calculateSoulUrge(trimmedName),
        calculatePersonalityNumber(trimmedName),
      ];
      setResults(computed);
    } catch (err) {
      setResults(null);
      setError(
        err instanceof Error
          ? err.message
          : "Something about that name or date couldn't be calculated. Please check both fields."
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="card grid gap-5 sm:grid-cols-2" noValidate>
        <div className="sm:col-span-1">
          <label htmlFor="name" className="block text-sm font-medium text-textPrimary mb-2">
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="As given at birth, for the most traditional reading"
            className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
              placeholder:text-textMuted/60 focus:border-accentBlue min-h-[44px]"
          />
        </div>

        <div className="sm:col-span-1">
          <label htmlFor="dob" className="block text-sm font-medium text-textPrimary mb-2">
            Date of birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            autoComplete="bday"
            value={form.dob}
            onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
            className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
              focus:border-accentBlue min-h-[44px]"
          />
        </div>

        {error && (
          <p role="alert" className="sm:col-span-2 text-sm text-red-300">
            {error}
          </p>
        )}

        <div className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full sm:w-auto">
            Calculate My Numbers
          </button>
        </div>
      </form>

      <p className="mt-4 text-xs text-textMuted/70">
        Everything above is calculated in your browser — your name and birth
        date are never sent to a server or stored.
      </p>

      {results && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {results.map((result) => (
            <NumberResultCard key={result.type} result={result} />
          ))}
        </div>
      )}
    </div>
  );
}
