/**
 * Single source of truth for the site's own public URL and name.
 *
 * Set to the real live Netlify URL as of Phase 17's deployment
 * (2026-09-22): https://exquisite-tiramisu-eccf4f.netlify.app. If you
 * rename the Netlify site (Project configuration › General › Change
 * project name) or connect your own custom domain (Project
 * configuration › Domain management), update this constant to match,
 * then commit and push — Netlify will redeploy automatically with the
 * corrected URL baked into every page's metadata and the sitemap. This
 * one constant feeds the canonical URLs, Open Graph tags, and
 * sitemap.xml/robots.txt used across the whole site (Phase 14, SEO).
 */
export const SITE_URL = "https://exquisite-tiramisu-eccf4f.netlify.app";

export const SITE_NAME = "AstroYoda";
