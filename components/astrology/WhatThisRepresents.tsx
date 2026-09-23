interface WhatThisRepresentsProps {
  text: string;
  revealDelayClassName?: string;
}

/**
 * A short, clearly-labeled explanation directly beneath a reveal card —
 * the traditional theme text already sourced and cross-checked in
 * data/interpretations/*, just formatted to read as a highlight rather
 * than a footnote.
 */
export default function WhatThisRepresents({ text, revealDelayClassName = "" }: WhatThisRepresentsProps) {
  return (
    <div className={`reveal-in ${revealDelayClassName} card`}>
      <p className="text-xs uppercase tracking-widest text-textMuted mb-3">
        What This Traditionally Represents
      </p>
      <p className="font-display text-lg sm:text-xl leading-relaxed text-textPrimary">{text}</p>
    </div>
  );
}
