"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileBottomNav from "@/components/MobileBottomNav";
import SageMascot from "@/components/SageMascot";

const primaryNav = [
  { href: "/", label: "Home" },
  { href: "/astrology", label: "Astrology" },
  { href: "/numerology", label: "Numerology" },
  { href: "/nakshatra", label: "Nakshatra" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/learn", label: "Learn" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-wide">
            <SageMascot size={30} className="shrink-0" />
            AstroYoda
          </Link>

          <nav aria-label="Primary" className="hidden md:flex items-center gap-6">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-textMuted hover:text-textPrimary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/about" className="text-sm text-textMuted hover:text-textPrimary transition-colors">
              About
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-full p-2 min-h-[44px] min-w-[44px]"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="md:hidden border-t border-white/10 bg-navy-dark">
            <nav aria-label="More" className="container-page py-3 flex flex-col">
              {[...primaryNav, { href: "/about", label: "About" }].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 text-sm text-textMuted hover:text-textPrimary border-b border-white/5 last:border-none"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <MobileBottomNav />
    </>
  );
}
