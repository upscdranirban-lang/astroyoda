import ComingSoon from "@/components/ComingSoon";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Vedic Astrology",
  description:
    "Explore Vedic (Jyotish) astrology on AstroYoda: birth charts, Nakshatra and compatibility, calculated free from real astronomical data.",
  path: "/astrology",
});

export default function AstrologyHubPage() {
  return (
    <ComingSoon
      title="Vedic Astrology"
      description="Your Lagna, Moon and Sun signs, planetary positions and a full birth chart are being built next. Check back soon."
      wisdomCategory="astrology"
    />
  );
}
