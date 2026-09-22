import type { MetadataRoute } from "next";
import { ZODIAC_SIGNS } from "@/lib/astrology/zodiacSigns";
import { getAllLearnSlugs } from "@/data/learn/articles";

import { SITE_URL } from "@/lib/siteConfig";

const baseUrl = SITE_URL;

const staticRoutes = [
  "",
  "/astrology",
  "/astrology/birth-chart",
  "/numerology",
  "/nakshatra",
  "/compatibility",
  "/horoscope",
  "/learn",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-use",
  "/disclaimer",
];

/**
 * Dynamic per-item routes, generated from the same data each page's own
 * generateStaticParams uses — so this list can't drift out of sync with
 * what's actually built. (See README's "Before you launch this publicly"
 * for the two route families — /nakshatra/[slug] and
 * /numerology/life-path-number-[n] — that the blueprint's sitemap
 * describes but that don't exist as pages yet, and so aren't listed here.)
 */
function getDynamicRoutes(): string[] {
  const horoscopeRoutes = ZODIAC_SIGNS.map((sign) => `/horoscope/${sign.toLowerCase()}`);
  const learnRoutes = getAllLearnSlugs().map((slug) => `/learn/${slug}`);
  return [...horoscopeRoutes, ...learnRoutes];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [...staticRoutes, ...getDynamicRoutes()];
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
