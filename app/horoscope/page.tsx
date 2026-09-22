import HoroscopeSignGrid from "@/components/horoscope/HoroscopeSignGrid";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Daily Horoscope",
  description:
    "General, Career, Love, Money and Well-being readings for all 12 zodiac signs, refreshed daily. Free, traditional-style reflection — not a live AI prediction.",
  path: "/horoscope",
});

export default function HoroscopeHubPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-5xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Daily Horoscope</h1>
      <p className="mt-3 text-textMuted max-w-2xl">
        Pick your sign for today&apos;s General, Career, Love, Money and
        Well-being reading, plus a lucky number and color. Readings rotate
        daily from a curated set of traditional-style reflections — not a
        live, AI-generated forecast.
      </p>

      <div className="mt-8">
        <HoroscopeSignGrid />
      </div>

      <div className="mt-10">
        <WisdomBanner category="horoscope" />
      </div>

      <div className="mt-10 text-sm text-textMuted space-y-2">
        <h2 className="text-textPrimary font-medium">About these readings</h2>
        <p>
          Every sign&apos;s reading is the same for everyone born under it —
          these are general, symbolic reflections for the day, not a
          personalized prediction based on your own exact birth chart. See
          our{" "}
          <a href="/disclaimer" className="underline hover:text-textPrimary">
            Disclaimer
          </a>{" "}
          for details.
        </p>
      </div>
    </section>
  );
}
