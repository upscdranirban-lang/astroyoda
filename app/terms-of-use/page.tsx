import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Terms of Use",
  description: "The terms for using AstroYoda free astrology and numerology tools.",
  path: "/terms-of-use",
});

export default function TermsOfUsePage() {
  return (
    <section className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Terms of Use</h1>
      <p className="mt-2 text-sm text-textMuted/70">Last updated: September 22, 2026</p>

      <div className="mt-6 space-y-6 text-textMuted">
        <div>
          <h2 className="text-textPrimary font-medium mb-2">Using AstroYoda</h2>
          <p>
            AstroYoda is provided free of charge for personal, non-commercial
            use. By using the site, you agree to these terms.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Nature of the content</h2>
          <p>
            All astrology and numerology content on this site is traditional,
            cultural and symbolic interpretation, provided for entertainment
            and self-reflection. See our{" "}
            <a href="/disclaimer" className="underline hover:text-textPrimary">
              Disclaimer
            </a>{" "}
            for the full explanation. By using AstroYoda you accept that its
            content is not scientific, medical, financial or legal advice.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Accuracy</h2>
          <p>
            Calculations are built on deterministic astronomical and
            numerological methods, and are tested against reference data
            (see the project&apos;s testing strategy). Results still depend on
            the accuracy of the birth details you provide, and AstroYoda does
            not guarantee that any result is free of error.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Acceptable use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Use the site to harass, deceive or harm another person</li>
            <li>Attempt to disrupt, overload or reverse-engineer the site</li>
            <li>Scrape or republish site content at scale without permission</li>
          </ul>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Original content</h2>
          <p>
            &ldquo;AstroYoda Wisdom&rdquo; messages, site design and written
            content are original to this project. AstroYoda is not affiliated
            with, and does not reproduce content from, Lucasfilm, Disney or
            Star Wars.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Changes</h2>
          <p>
            We may update these terms as the site evolves. Continued use of
            AstroYoda after a change means you accept the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Contact</h2>
          <p>
            Questions about these terms can be sent through the{" "}
            <a href="/contact" className="underline hover:text-textPrimary">
              Contact page
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
