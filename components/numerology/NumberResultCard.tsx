import type { NumerologyResult } from "@/types/numerology";
import { getNumberKeyword, getNumerologyInterpretation } from "@/data/interpretations/numerology";

const LABELS: Record<NumerologyResult["type"], string> = {
  life_path: "Life Path",
  birthday: "Birthday Number",
  destiny: "Destiny",
  soul_urge: "Soul Urge",
  personality: "Personality",
  name: "Name Number",
};

export default function NumberResultCard({ result }: { result: NumerologyResult }) {
  const keyword = getNumberKeyword(result.number);
  const interpretation = getNumerologyInterpretation(result.interpretationKey);

  return (
    <div className="card">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-textMuted">
          {LABELS[result.type]}
        </p>
        {result.isMasterNumber && <span className="chip border-gold/40 text-gold">Master Number</span>}
      </div>

      <p className="mt-2 font-display text-5xl font-semibold text-accentBlue">
        {result.number}
      </p>

      {keyword && <p className="mt-1 text-sm text-gold/90">{keyword}</p>}

      <p className="mt-4 text-sm text-textMuted">{interpretation}</p>

      <details className="mt-4 text-xs text-textMuted/80">
        <summary className="cursor-pointer select-none hover:text-textMuted">
          How this was calculated
        </summary>
        <p className="mt-2">{result.calculation}</p>
      </details>
    </div>
  );
}
