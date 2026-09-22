import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How AstroYoda handles the birth details you enter: what is collected, what is stored, and what never leaves your browser.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-textMuted/70">Last updated: September 22, 2026</p>

      <div className="mt-6 space-y-6 text-textMuted">
        <div>
          <h2 className="text-textPrimary font-medium mb-2">What you enter</h2>
          <p>
            To calculate a birth chart, Nakshatra, numerology profile or
            compatibility result, AstroYoda asks for a name, date of birth,
            birth time (or an indication that it&apos;s approximate or
            unknown) and birth location.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">How it&apos;s processed</h2>
          <p>
            All of AstroYoda&apos;s calculators run entirely in your browser.
            When you enter your birth details, they never leave your device:
            planetary positions, your Ascendant, Nakshatra and numerology
            numbers are all computed by JavaScript running locally, not on a
            server. This isn&apos;t a simplification — AstroYoda has no
            server-side API route at all, and no code anywhere in the site
            sends a network request containing anything you type into a
            calculator.
          </p>
          <p className="mt-2">
            That includes turning a birth city into coordinates and a
            timezone: this doesn&apos;t call an external geocoding or
            timezone API. It looks the city up in a place-name dataset and a
            timezone-boundary dataset that are both bundled with the site
            itself (downloaded to your browser once, like any other part of
            the page), and reads real historical daylight-saving rules from
            your browser&apos;s own built-in timezone database. See
            &ldquo;Third-party services&rdquo; below for where that bundled
            place-name data originally comes from.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">What&apos;s stored</h2>
          <p>
            AstroYoda does not require an account and does not store your
            name, birth date, birth time or birth location on our servers —
            there is no database. Nothing you enter into a calculator is
            retained after you close or refresh the page, unless a feature
            explicitly says otherwise (for example, a future &ldquo;save my
            chart&rdquo; option, which will ask for separate consent).
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Analytics and ads</h2>
          <p>
            As of this writing, AstroYoda has no analytics provider, no
            advertising, and sets no tracking cookies of any kind. If that
            changes in the future — for instance, adding a privacy-respecting
            analytics tool to understand which pages are useful — this
            section will be updated first to name the provider, what it
            collects, and how to opt out, before it&apos;s turned on.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Third-party services</h2>
          <p>
            No live third-party service receives any part of your birth
            details — see &ldquo;How it&apos;s processed&rdquo; above. The
            one third-party involvement worth naming is data, not a service:
            the offline place-name dataset used for the birth-city search box
            is derived from{" "}
            <a
              href="https://www.geonames.org"
              className="underline hover:text-textPrimary"
              target="_blank"
              rel="noopener noreferrer"
            >
              GeoNames
            </a>
            , used under its{" "}
            <a
              href="https://creativecommons.org/licenses/by/4.0/"
              className="underline hover:text-textPrimary"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 4.0
            </a>{" "}
            license (see the{" "}
            <a href="/about" className="underline hover:text-textPrimary">
              About page
            </a>{" "}
            for the attribution). That data was downloaded once when this
            site was built and ships as a static file — GeoNames does not
            receive your searches or any other data from AstroYoda.
          </p>
        </div>

        <div>
          <h2 className="text-textPrimary font-medium mb-2">Contact</h2>
          <p>
            Questions about this policy can be sent through the{" "}
            <a href="/contact" className="underline hover:text-textPrimary">
              Contact page
            </a>.
          </p>
        </div>
      </div>
    </section>
  );
}
