/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Phase 17 (Deployment): AstroYoda has no server-side API routes, no
  // database, and every page is pre-rendered at build time (both dynamic
  // routes -- /horoscope/[sign] and /learn/[slug] -- use
  // generateStaticParams). That means it can be shipped as a fully static
  // site: `npm run build` produces a plain `out/` folder of HTML/CSS/JS
  // files that any static host can serve, with no Node.js server required
  // at runtime. This keeps hosting free and simple, and avoids locking the
  // site to any one hosting provider's proprietary Next.js integration.
  output: "export",
};

export default nextConfig;
