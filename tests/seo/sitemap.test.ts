import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { ZODIAC_SIGNS } from "@/lib/astrology/zodiacSigns";
import { getAllLearnSlugs } from "@/data/learn/articles";
import { SITE_URL } from "@/lib/siteConfig";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);

  it("includes every static route", () => {
    for (const path of ["", "/astrology", "/numerology", "/nakshatra", "/compatibility", "/horoscope", "/learn"]) {
      expect(urls).toContain(`${SITE_URL}${path}`);
    }
  });

  it("includes all 12 horoscope sign routes", () => {
    for (const sign of ZODIAC_SIGNS) {
      expect(urls).toContain(`${SITE_URL}/horoscope/${sign.toLowerCase()}`);
    }
  });

  it("includes all 9 learn article routes", () => {
    for (const slug of getAllLearnSlugs()) {
      expect(urls).toContain(`${SITE_URL}/learn/${slug}`);
    }
  });

  it("has no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("gives every entry a lastModified date", () => {
    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
    }
  });
});
