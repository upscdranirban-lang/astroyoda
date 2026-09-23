import { notFound } from "next/navigation";
import DailyHoroscopeCard from "@/components/horoscope/DailyHoroscopeCard";
import WisdomBanner from "@/components/WisdomBanner";
import { ZODIAC_SIGNS, type ZodiacSign } from "@/lib/astrology/zodiacSigns";
import { buildMetadata } from "@/lib/seo/buildMetadata";

const validSlugs = ZODIAC_SIGNS.map((sign) => sign.toLowerCase());

export function generateStaticParams() {
  return validSlugs.map((sign) => ({ sign }));
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }) {
  const { sign } = await params;
  const slug = sign.toLowerCase();
  const label = slug.charAt(0).toUpperCase() + slug.slice(1);
  return buildMetadata({
    title: `${label} Horoscope Today`,
    description: `Today's General, Career, Love, Money and Well-being reading for ${label}, plus a lucky number and color. Free, traditional-style reflection.`,
    path: `/horoscope/${slug}`,
  });
}

export default async function SignHoroscopePage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign: signParam } = await params;
  const slug = signParam.toLowerCase();
  if (!validSlugs.includes(slug)) {
    notFound();
  }
  const sign = ZODIAC_SIGNS.find((s) => s.toLowerCase() === slug) as ZodiacSign;

  return (
    <section className="container-page py-14 sm:py-20 max-w-3xl">
      <DailyHoroscopeCard sign={sign} />

      <div className="mt-10">
        <WisdomBanner category="horoscope" />
      </div>
    </section>
  );
}
