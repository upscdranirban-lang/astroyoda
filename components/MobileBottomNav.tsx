"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, Hash, Heart, Sun } from "lucide-react";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/astrology", label: "Astrology", icon: Sparkles },
  { href: "/numerology", label: "Numerology", icon: Hash },
  { href: "/compatibility", label: "Match", icon: Heart },
  { href: "/horoscope", label: "Horoscope", icon: Sun },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-navy-dark/95 backdrop-blur
        sm:hidden pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {items.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center justify-center gap-1 py-2 min-h-[56px] text-[11px]
                  ${active ? "text-accentBlue" : "text-textMuted"}`}
              >
                <Icon size={20} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
