import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Disclaimer",
  description:
    "AstroYoda astrology and numerology content is for entertainment, self-reflection and educational purposes only, not medical, financial or legal advice, and no guarantee of any outcome.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <section className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Disclaimer</h1>
      <p className="mt-2 text-sm text-textMuted/70">Last updated: September 22, 2026</p>

      <div className="mt-6 space-y-4 text-textMuted">
        <p>
          AstroYoda provides astrology and numerology content for
          entertainment, self-reflection and educational purposes only.
        </p>
        <p>
          Astrology and numerology are traditional, cultural and symbolic
          systems of interpretation. They are not scientifically proven to
          predict or influence future events, and AstroYoda makes no claim
          that they are.
        </p>
        <p>Nothing on this site is, or should be treated as:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Medical, psychological or mental-health advice</li>
          <li>Financial or investment advice</li>
          <li>Legal advice</li>
          <li>A guarantee of any outcome in marriage, relationships, career, wealth, health or lifespan</li>
        </ul>
        <p>
          Birth chart, Nakshatra and numerology results depend on the accuracy
          of the birth date, time and location you provide. Where birth time is
          approximate or unknown, some results (particularly Ascendant and
          house placements) are less precise, and the site will say so.
        </p>
        <p>
          If you are facing a medical, financial, legal or personal crisis,
          please consult a qualified professional rather than relying on this
          site.
        </p>
        <p>
          AstroYoda&apos;s original &ldquo;AstroYoda Wisdom&rdquo; messages are
          creative writing intended to encourage reflection, not instructions
          to be followed literally.
        </p>
      </div>
    </section>
  );
}
