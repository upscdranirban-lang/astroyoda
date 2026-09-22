import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface CalculatorCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  cta: string;
}

export default function CalculatorCard({
  icon: Icon,
  title,
  description,
  href,
  cta,
}: CalculatorCardProps) {
  return (
    <div className="card flex flex-col h-full">
      <div className="h-11 w-11 rounded-full bg-accentBlue/15 flex items-center justify-center mb-4">
        <Icon className="text-accentBlue" size={22} aria-hidden="true" />
      </div>
      <h3 className="text-lg font-display font-semibold text-textPrimary">{title}</h3>
      <p className="mt-2 text-sm text-textMuted flex-1">{description}</p>
      <Link href={href} className="btn-secondary mt-5 self-start">
        {cta}
      </Link>
    </div>
  );
}
