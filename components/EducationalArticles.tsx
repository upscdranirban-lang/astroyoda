import Link from "next/link";
import { ArrowRight } from "lucide-react";

const articles = [
  {
    href: "/learn/what-is-vedic-astrology",
    title: "What Is Vedic Astrology?",
    blurb: "A beginner's guide to Jyotish and how it differs from what you read in Western sun-sign columns.",
  },
  {
    href: "/learn/what-is-nakshatra",
    title: "What Is a Nakshatra?",
    blurb: "The 27 lunar mansions that anchor Vedic astrology, and why your Nakshatra matters as much as your sign.",
  },
  {
    href: "/learn/what-is-numerology",
    title: "What Is Numerology?",
    blurb: "How letters and numbers are traditionally believed to carry meaning, and where the system comes from.",
  },
  {
    href: "/learn/how-to-read-a-birth-chart",
    title: "How to Read a Birth Chart",
    blurb: "A plain-language walkthrough of houses, signs and planets — no prior knowledge required.",
  },
];

export default function EducationalArticles() {
  return (
    <section className="container-page py-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <h2 className="section-heading">Learn the Basics</h2>
        <Link href="/learn" className="btn-ghost hidden sm:inline-flex">
          Browse All Articles
        </Link>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {articles.map((article) => (
          <Link key={article.href} href={article.href} className="card group">
            <h3 className="text-base font-display font-semibold text-textPrimary">
              {article.title}
            </h3>
            <p className="mt-2 text-sm text-textMuted">{article.blurb}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm text-accentBlue">
              Read more
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>

      <Link href="/learn" className="btn-ghost mt-6 w-full sm:hidden">
        Browse All Articles
      </Link>
    </section>
  );
}
