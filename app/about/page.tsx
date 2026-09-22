import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "What AstroYoda is, how its calculations work (real astronomical data and documented numerology methods, never a language model guessing numbers), and where its place data comes from.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">About AstroYoda</h1>

      <div className="mt-6 space-y-4 text-textMuted">
        <p>
          AstroYoda exists to make Vedic astrology and numerology approachable —
          without excessive gold, flashing stars, or claims it can&apos;t back up.
        </p>
        <p>
          Every calculation on this site — birth charts, Nakshatra, numerology —
          is deterministic: it comes from real astronomical data and documented
          numerological methods, not from a language model guessing numbers.
        </p>
        <p>
          Every interpretation is offered as traditional, cultural and symbolic
          insight for reflection. We don&apos;t claim astrology or numerology is
          scientifically proven, and we never guarantee outcomes in your
          relationships, finances, health or career. See our{" "}
          <a href="/disclaimer" className="underline hover:text-textPrimary">
            Disclaimer
          </a>{" "}
          for the full picture.
        </p>
        <p>
          AstroYoda is an independent project and is not affiliated with
          Lucasfilm, Disney or Star Wars. &ldquo;AstroYoda Wisdom&rdquo; messages
          throughout the site are original writing.
        </p>
        <p>
          City and place data used to resolve a birth location&apos;s
          coordinates and timezone is derived from{" "}
          <a
            href="https://www.geonames.org"
            className="underline hover:text-textPrimary"
            target="_blank"
            rel="noopener noreferrer"
          >
            GeoNames
          </a>
          , used under the{" "}
          <a
            href="https://creativecommons.org/licenses/by/4.0/"
            className="underline hover:text-textPrimary"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY 4.0
          </a>{" "}
          license.
        </p>
      </div>

      <div className="mt-10">
        <WisdomBanner category="learning" />
      </div>
    </section>
  );
}
