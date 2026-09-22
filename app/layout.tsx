import type { Metadata } from "next";
import { SITE_URL } from "@/lib/siteConfig";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarryBackground from "@/components/StarryBackground";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AstroYoda — Know Your Stars. Understand Yourself.",
    template: "%s — AstroYoda",
  },
  description:
    "Explore your Vedic birth chart, Nakshatra and numerology through a simple, modern, mobile-first experience. Free, ad-light, and grounded in traditional interpretation.",
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "AstroYoda — Know Your Stars. Understand Yourself.",
    description:
      "Explore your Vedic birth chart, Nakshatra and numerology through a simple, modern, mobile-first experience.",
    siteName: "AstroYoda",
    type: "website",
    url: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="pb-16 sm:pb-0">
        <StarryBackground />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
