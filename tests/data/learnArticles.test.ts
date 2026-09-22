import { describe, expect, it } from "vitest";
import { learnArticles, getLearnArticle, getAllLearnSlugs } from "@/data/learn/articles";

describe("learnArticles", () => {
  it("has 9 articles with unique, URL-safe slugs", () => {
    expect(learnArticles).toHaveLength(9);
    const slugs = learnArticles.map((a) => a.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it("every article has a title, description, at least one section with content, and at least one related link", () => {
    for (const article of learnArticles) {
      expect(article.title.length, `${article.slug} title`).toBeGreaterThan(0);
      expect(article.description.length, `${article.slug} description`).toBeGreaterThan(0);
      expect(article.sections.length, `${article.slug} sections`).toBeGreaterThan(0);
      for (const section of article.sections) {
        expect(section.paragraphs.length, `${article.slug} section paragraphs`).toBeGreaterThan(0);
        for (const paragraph of section.paragraphs) {
          expect(paragraph.length, `${article.slug} paragraph`).toBeGreaterThan(0);
        }
      }
      expect(article.relatedLinks.length, `${article.slug} relatedLinks`).toBeGreaterThan(0);
      for (const link of article.relatedLinks) {
        expect(link.href.startsWith("/"), `${article.slug} link href "${link.href}"`).toBe(true);
        expect(link.label.length, `${article.slug} link label`).toBeGreaterThan(0);
      }
    }
  });

  it("every slug the homepage components link to (what-is-vedic-astrology, what-is-nakshatra, what-is-numerology, how-to-read-a-birth-chart, what-is-lagna, what-is-vimshottari-dasha, what-is-a-birth-chart, vedic-vs-western-astrology, what-are-master-numbers) resolves to an article", () => {
    const linkedSlugs = [
      "what-is-vedic-astrology",
      "what-is-nakshatra",
      "what-is-numerology",
      "how-to-read-a-birth-chart",
      "what-is-lagna",
      "what-is-vimshottari-dasha",
      "what-is-a-birth-chart",
      "vedic-vs-western-astrology",
      "what-are-master-numbers",
    ];
    for (const slug of linkedSlugs) {
      expect(getLearnArticle(slug), slug).toBeDefined();
    }
  });

  it("getAllLearnSlugs returns exactly the article slugs", () => {
    expect(getAllLearnSlugs().sort()).toEqual(learnArticles.map((a) => a.slug).sort());
  });

  it("getLearnArticle returns undefined for an unknown slug", () => {
    expect(getLearnArticle("not-a-real-article")).toBeUndefined();
  });
});
