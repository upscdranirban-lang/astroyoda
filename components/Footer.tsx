import Link from "next/link";

const footerNav = [
  { href: "/astrology", label: "Astrology" },
  { href: "/numerology", label: "Numerology" },
  { href: "/nakshatra", label: "Nakshatra" },
  { href: "/compatibility", label: "Compatibility" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/learn", label: "Learn" },
];

const legalNav = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
  { href: "/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container-page py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">AstroYoda</p>
          <p className="mt-2 text-sm text-textMuted max-w-xs">
            Know Your Stars. Understand Yourself. Traditional astrology and
            numerology, presented for reflection — not prediction.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-textPrimary mb-3">Explore</p>
          <ul className="space-y-2">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-textMuted hover:text-textPrimary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-medium text-textPrimary mb-3">Site</p>
          <ul className="space-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-textMuted hover:text-textPrimary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-page pb-10">
        <p className="text-xs text-textMuted/80 max-w-3xl">
          AstroYoda offers traditional, cultural and symbolic interpretations of
          astrology and numerology for self-reflection. It is not scientific
          advice and does not guarantee any future outcome, including in
          relationships, finances, health or career. See our{" "}
          <Link href="/disclaimer" className="underline hover:text-textMuted">
            Disclaimer
          </Link>{" "}
          for details.
        </p>
        <p className="text-xs text-textMuted/60 mt-4">
          © {new Date().getFullYear()} AstroYoda. Not affiliated with Lucasfilm,
          Disney or Star Wars.
        </p>
      </div>
    </footer>
  );
}
