import { Sparkles } from "lucide-react";
import { getWisdomByCategory } from "@/data/wisdom";
import type { WisdomCategory } from "@/types/wisdom";

export default function WisdomBanner({ category }: { category: WisdomCategory }) {
  const wisdom = getWisdomByCategory(category);

  return (
    <div
      role="note"
      aria-label="AstroYoda Wisdom"
      className="card flex items-start gap-4 bg-gradient-to-br from-navy-dark to-navy border-gold/20"
    >
      <Sparkles className="text-gold shrink-0 mt-1" size={22} aria-hidden="true" />
      <div>
        <p className="text-xs uppercase tracking-widest text-gold/80 mb-2">
          AstroYoda Wisdom
        </p>
        <p className="font-display text-lg sm:text-xl text-textPrimary">
          &ldquo;{wisdom.message}&rdquo;
        </p>
      </div>
    </div>
  );
}
