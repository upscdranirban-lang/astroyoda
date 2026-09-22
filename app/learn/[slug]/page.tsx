import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLearnArticle, getAllLearnSlugs } from "@/data/learn/articles";
import WisdomBanner from "@/components/WisdomBanner";
import { buildMetadata } from "@/lib/seo/buildMetadata";
import { SITE_URL } from "@/lib/siteConfig";

export function generateStaticParams() {
  return getAllLearnSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const article = getLearnArticle(params.slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/learn/${article.slug}`,
  });
}

export default function LearnArticlePage({ params }: { params: { slug: string } }) {
  const article = getLearnArticle(params.slug);
  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${SITE_URL}/learn/${article.slug}`,
  };

  return (
    <section className="container-page py-14 sm:py-20 max-w-2xl">
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/learn" className="text-sm text-accentBlue hover:underline">
        ← Back to Learn
      </Link>

      <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold">{article.title}</h1>
      <p className="mt-3 text-textMuted">{article.description}</p>

      <div className="mt-8 space-y-6">
        {article.sections.map((section, i) => (
          <div key={i}>
            {section.heading && (
              <h2 className="font-display text-lg font-semibold text-textPrimary mb-2">
                {section.heading}
              </h2>
            )}
            {section.paragraphs.map((paragraph, j) => (
              <p key={j} className="text-sm sm:text-base text-textMuted leading-relaxed mb-3">
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </div>

      {article.relatedLinks.length > 0 && (
        <div className="mt-10 card">
          <p className="text-xs uppercase tracking-wide text-textMuted mb-3">Try it yourself</p>
          <div className="flex flex-col gap-2">
            {article.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 text-sm text-accentBlue hover:underline"
              >
                {link.label}
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <WisdomBanner category="learning" />
      </div>
    </section>
  );
}
