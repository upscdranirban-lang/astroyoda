"use client";

import { useState, type FormEvent } from "react";
import { getTimezoneForCoordinates, localDateTimeToUtc } from "@/lib/location";
import type { CityMatch } from "@/types/location";
import CityAutocomplete from "@/components/astrology/CityAutocomplete";

export interface ResolvedBirthDetails {
  name: string;
  utcInstant: Date;
  latitude: number;
  longitudeEast: number;
  timezone: string;
  placeLabel: string;
  approximateTime: boolean;
}

interface BirthDetailsFormProps {
  /** Called once all inputs are valid and location/timezone/UTC resolution succeeded. */
  onResolve: (details: ResolvedBirthDetails) => void;
  submitLabel: string;
  showNameField?: boolean;
  /** Prefix for this instance's input ids, so two forms can render on one
   * page (e.g. Compatibility's Person A / Person B) without id collisions. */
  idPrefix?: string;
}

/**
 * Shared birth-details input (name, date/time of birth, birth place) used
 * by the Birth Chart, Nakshatra and Compatibility pages — per the
 * blueprint's §9/§10, these reuse the same birth-details component rather
 * than duplicating the form.
 *
 * This component owns input state and location/timezone/UTC resolution;
 * it does not know what its caller will calculate from the result.
 */
export default function BirthDetailsForm({
  onResolve,
  submitLabel,
  showNameField = true,
  idPrefix = "",
}: BirthDetailsFormProps) {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);

  const [placeText, setPlaceText] = useState("");
  const [selectedCity, setSelectedCity] = useState<CityMatch | null>(null);

  const [manualMode, setManualMode] = useState(false);
  const [manualLat, setManualLat] = useState("");
  const [manualLon, setManualLon] = useState("");

  const [error, setError] = useState<string | null>(null);

  const id = (field: string) => `${idPrefix}${field}`;

  function handlePlaceTextChange(text: string) {
    setPlaceText(text);
    setSelectedCity(null);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!dob) {
      setError("Please enter a date of birth.");
      return;
    }

    const effectiveTime = unknownTime ? "12:00" : time;
    if (!effectiveTime) {
      setError("Please enter a time of birth, or check “I don't know my exact birth time.”");
      return;
    }

    let latitude: number;
    let longitudeEast: number;
    let placeLabel: string;

    if (manualMode) {
      latitude = Number(manualLat);
      longitudeEast = Number(manualLon);
      if (!manualLat || !manualLon || Number.isNaN(latitude) || Number.isNaN(longitudeEast)) {
        setError("Please enter both a latitude and a longitude.");
        return;
      }
      if (latitude < -90 || latitude > 90) {
        setError("Latitude must be between -90 and 90.");
        return;
      }
      if (longitudeEast < -180 || longitudeEast > 180) {
        setError("Longitude must be between -180 and 180.");
        return;
      }
      placeLabel = `${latitude.toFixed(4)}, ${longitudeEast.toFixed(4)} (manual)`;
    } else {
      if (!selectedCity) {
        setError("Please select a birth city from the dropdown, or switch to manual coordinates below.");
        return;
      }
      latitude = selectedCity.latitude;
      longitudeEast = selectedCity.longitudeEast;
      placeLabel = `${selectedCity.name}, ${selectedCity.countryName}`;
    }

    try {
      const timezone = getTimezoneForCoordinates(latitude, longitudeEast);
      const utcInstant = localDateTimeToUtc(dob, effectiveTime, timezone);
      onResolve({
        name: name.trim(),
        utcInstant,
        latitude,
        longitudeEast,
        timezone,
        placeLabel,
        approximateTime: unknownTime,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something about that date, time or place couldn't be calculated. Please check all fields."
      );
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card grid gap-5 sm:grid-cols-2" noValidate>
      {showNameField && (
        <div className="sm:col-span-2">
          <label htmlFor={id("name")} className="block text-sm font-medium text-textPrimary mb-2">
            Name <span className="text-textMuted font-normal">(optional, for display only)</span>
          </label>
          <input
            id={id("name")}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
              placeholder:text-textMuted/60 focus:border-accentBlue min-h-[44px]"
          />
        </div>
      )}

      <div>
        <label htmlFor={id("dob")} className="block text-sm font-medium text-textPrimary mb-2">
          Date of birth
        </label>
        <input
          id={id("dob")}
          type="date"
          autoComplete="bday"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
            focus:border-accentBlue min-h-[44px]"
        />
      </div>

      <div>
        <label htmlFor={id("time")} className="block text-sm font-medium text-textPrimary mb-2">
          Time of birth
        </label>
        <input
          id={id("time")}
          type="time"
          value={time}
          disabled={unknownTime}
          onChange={(e) => setTime(e.target.value)}
          className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
            focus:border-accentBlue min-h-[44px] disabled:opacity-50"
        />
        <label className="mt-2 flex items-center gap-2 text-xs text-textMuted">
          <input
            type="checkbox"
            checked={unknownTime}
            onChange={(e) => setUnknownTime(e.target.checked)}
            className="rounded border-white/30"
          />
          I don&apos;t know my exact birth time
        </label>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={id("place")} className="block text-sm font-medium text-textPrimary mb-2">
          Birth place
        </label>
        {!manualMode ? (
          <CityAutocomplete
            id={id("place")}
            value={placeText}
            onInputChange={handlePlaceTextChange}
            onSelect={setSelectedCity}
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="number"
              step="any"
              placeholder="Latitude (e.g. 28.6139)"
              value={manualLat}
              onChange={(e) => setManualLat(e.target.value)}
              className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
                placeholder:text-textMuted/60 focus:border-accentBlue min-h-[44px]"
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude (e.g. 77.2090, east positive)"
              value={manualLon}
              onChange={(e) => setManualLon(e.target.value)}
              className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
                placeholder:text-textMuted/60 focus:border-accentBlue min-h-[44px]"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => {
            setManualMode((m) => !m);
            setError(null);
          }}
          className="mt-2 text-xs text-accentBlue underline hover:text-accentBlue/80"
        >
          {manualMode ? "Search for a city instead" : "Can't find your city? Enter coordinates manually"}
        </button>
      </div>

      {error && (
        <p role="alert" className="sm:col-span-2 text-sm text-red-300">
          {error}
        </p>
      )}

      <div className="sm:col-span-2">
        <button type="submit" className="btn-primary w-full sm:w-auto">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
