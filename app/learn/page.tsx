import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { learnArticles } from "@/data/learn/articles";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";

export const metadata = buildMetadata({
  title: "Learn",
  description:
    "Plain-language articles on Vedic astrology and numerology — Lagna, Nakshatra, birth charts, Dasha, master numbers and more — fact-checked and written for beginners.",
  path: "/learn",
});

export default function LearnHubPage() {
  return (
    <section className="container-page py-14 sm:py-20 max-w-5xl">
      <h1 className="font-display text-3xl sm:text-4xl font-semibold">Learn</h1>
      <p className="mt-3 text-textMuted max-w-2xl">
        Plain-language, fact-checked articles on the ideas behind Vedic
        astrology and numerology — written for people starting from zero,
        with links back to the calculators where you can try each idea on
        your own details.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {learnArticles.map((article) => (
          <Link key={article.slug} href={`/learn/${article.slug}`} className="card group">
            <h2 className="font-display text-base font-semibold text-textPrimary">
              {article.title}
            </h2>
            <p className="mt-2 text-sm text-textMuted">{article.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-accentBlue">
              Read more
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10">
        <WisdomBanner category="learning" />
      </div>
    </section>
  );
}
