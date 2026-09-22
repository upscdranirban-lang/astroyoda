import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/siteConfig";

/**
 * Builds a consistent per-page Metadata object: title, description, a
 * canonical URL, and matching Open Graph tags — per the blueprint's SEO
 * Architecture (§19): "Per-page metadata: title tags, meta descriptions,
 * canonical URLs, Open Graph tags."
 *
 * `title` is the page's own short title (e.g. "About", not
 * "About — AstroYoda") — the root layout's title template
 * (`app/layout.tsx`) appends " — AstroYoda" automatically for the <title>
 * tag. Open Graph's `title` doesn't inherit that template (Next.js only
 * applies title templates to the top-level `title` field), so this
 * builds the full "<title> — AstroYoda" string for `openGraph.title`
 * directly, to keep social-share previews consistent with the tab title.
 *
 * `path` is the route's own path (e.g. "/astrology/birth-chart", or ""
 * for the homepage) — resolved against `metadataBase` in the root
 * layout, so it can stay relative here.
 */
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonicalPath = path === "" ? "/" : path;
  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url: canonicalPath,
      siteName: SITE_NAME,
      type: "website",
    },
  };
}
