import Link from "next/link";
import WisdomBanner from "@/components/WisdomBanner";
import SageMascot from "@/components/SageMascot";

export default function Hero() {
  return (
    <section className="container-page pt-10 sm:pt-16 pb-14 text-center">
      <div className="flex justify-center">
        <SageMascot size={128} animated className="drop-shadow-[0_0_25px_rgba(141,134,201,0.35)]" />
      </div>
      <p className="mt-2 text-xs uppercase tracking-[0.2em] text-gold/80">
        Your guide through the stars
      </p>
      <h1 className="mt-3 font-display text-4xl sm:text-6xl font-semibold leading-tight">
        Know Your Stars.
        <br />
        Understand Yourself.
      </h1>
      <p className="mt-5 text-base sm:text-lg text-textMuted max-w-xl mx-auto">
        Explore your birth chart, Nakshatra and numerology through a simple,
        modern experience — free, and grounded in traditional interpretation.
      </p>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href="/astrology/birth-chart" className="btn-primary w-full sm:w-auto">
          Explore My Chart
        </Link>
        <Link href="/numerology" className="btn-secondary w-full sm:w-auto">
          Discover My Numbers
        </Link>
        <Link href="/nakshatra" className="btn-ghost w-full sm:w-auto">
          Find My Nakshatra
        </Link>
      </div>

      <div className="mt-10 max-w-md mx-auto text-left">
        <WisdomBanner category="home" />
      </div>
    </section>
  );
}
