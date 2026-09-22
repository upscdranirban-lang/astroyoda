import type { CompatibilityResult as CompatibilityResultType } from "@/types/compatibility";
import type { RelationshipTone } from "@/types/compatibility";

const TONE_LABEL: Record<RelationshipTone, string> = {
  same: "Shared Element",
  harmonious: "Traditionally Harmonious",
  neutral: "Traditionally Neutral",
  challenging: "Traditionally Takes Effort",
};

const TONE_COLOR: Record<RelationshipTone, string> = {
  same: "text-gold",
  harmonious: "text-accentBlue",
  neutral: "text-textMuted",
  challenging: "text-lavender",
};

interface IndicatorCardProps {
  title: string;
  tone: RelationshipTone;
  detail: string;
  note: string;
}

function IndicatorCard({ title, tone, detail, note }: IndicatorCardProps) {
  return (
    <div className="card">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-xs uppercase tracking-widest text-textMuted">{title}</p>
        <span className={`chip border-white/15 ${TONE_COLOR[tone]}`}>{TONE_LABEL[tone]}</span>
      </div>
      <p className="mt-2 text-sm text-textPrimary">{detail}</p>
      <p className="mt-3 text-sm text-textMuted">{note}</p>
    </div>
  );
}

export default function CompatibilityResult({ result }: { result: CompatibilityResultType }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="card border-gold/40">
        <p className="text-sm text-gold/90">
          These are traditional, symbolic indicators for reflection —{" "}
          <strong>not a prediction about your relationship&apos;s success.</strong>{" "}
          Two people with a &ldquo;traditionally takes effort&rdquo; indicator can have a wonderful relationship, and
          vice versa; real compatibility depends on far more than a birth chart. (The Guna Milan score
          above is the one traditional part of this page that does use points — everything below it stays
          qualitative.)
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-1">
        <IndicatorCard
          title="Moon Sign"
          tone={result.moonSign.tone}
          detail={`${result.moonSign.elementA} & ${result.moonSign.elementB}`}
          note={result.moonSign.note}
        />
        <IndicatorCard
          title="Sun Sign"
          tone={result.sunSign.tone}
          detail={`${result.sunSign.elementA} & ${result.sunSign.elementB}`}
          note={result.sunSign.note}
        />
        <IndicatorCard
          title="Ascendant (Lagna)"
          tone={result.ascendant.tone}
          detail={`${result.ascendant.elementA} & ${result.ascendant.elementB}`}
          note={result.ascendant.note}
        />
        <div className="card">
          <p className="text-xs uppercase tracking-widest text-textMuted">Nakshatra</p>
          <p className="mt-3 text-sm text-textMuted">{result.nakshatra.note}</p>
        </div>
      </div>
    </div>
  );
}
