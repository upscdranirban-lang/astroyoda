"use client";

import { useEffect, useRef, useState } from "react";
import { searchCities } from "@/lib/location/citySearch";
import type { CityMatch } from "@/types/location";

interface CityAutocompleteProps {
  value: string;
  onInputChange: (text: string) => void;
  onSelect: (city: CityMatch) => void;
  placeholder?: string;
  id?: string;
}

/**
 * A text input with a live dropdown of city matches from the bundled,
 * offline place-name dataset (see lib/location/citySearch.ts). Debounced
 * so it doesn't re-search on every keystroke.
 */
export default function CityAutocomplete({
  value,
  onInputChange,
  onSelect,
  placeholder,
  id,
}: CityAutocompleteProps) {
  const [matches, setMatches] = useState<CityMatch[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.trim().length < 2) {
      setMatches([]);
      setOpen(false);
      return;
    }

    const requestId = ++requestIdRef.current;
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const results = await searchCities(value, 8);
      if (requestIdRef.current === requestId) {
        setMatches(results);
        setOpen(true);
        setLoading(false);
      }
    }, 200);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value]);

  function handleSelect(city: CityMatch) {
    onSelect(city);
    onInputChange(`${city.name}, ${city.countryName}`);
    setOpen(false);
  }

  return (
    <div className="relative">
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        onFocus={() => matches.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        placeholder={placeholder ?? "Start typing a city name..."}
        autoComplete="off"
        className="w-full rounded-lg bg-navy border border-white/15 px-4 py-3 text-sm text-textPrimary
          placeholder:text-textMuted/60 focus:border-accentBlue min-h-[44px]"
      />

      {loading && (
        <p className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-textMuted/60">Searching…</p>
      )}

      {open && matches.length > 0 && (
        <ul className="absolute z-10 mt-1 w-full rounded-lg bg-navy border border-white/15 shadow-lg max-h-64 overflow-y-auto">
          {matches.map((city, i) => (
            <li key={`${city.name}-${city.countryCode}-${city.adminCode}-${i}`}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(city)}
                className="w-full text-left px-4 py-2 text-sm text-textPrimary hover:bg-white/10"
              >
                {city.name}
                <span className="text-textMuted"> — {city.countryName}</span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {open && matches.length === 0 && !loading && value.trim().length >= 2 && (
        <div className="absolute z-10 mt-1 w-full rounded-lg bg-navy border border-white/15 shadow-lg px-4 py-3 text-sm text-textMuted">
          No matching city found. Try a nearby larger city, or enter coordinates manually below.
        </div>
      )}
    </div>
  );
}
