import Link from "next/link";
import HoroscopeSignGrid from "@/components/horoscope/HoroscopeSignGrid";

export default function HoroscopePreview() {
  return (
    <section className="container-page py-14">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="section-heading">Today&apos;s Horoscope</h2>
          <p className="mt-2 text-sm text-textMuted max-w-md">
            A quick, traditional read for each sign — General, Career, Love,
            Money and Well-being.
          </p>
        </div>
        <Link href="/horoscope" className="btn-ghost hidden sm:inline-flex">
          View All Signs
        </Link>
      </div>

      <div className="mt-6">
        <HoroscopeSignGrid />
      </div>

      <Link href="/horoscope" className="btn-ghost mt-6 w-full sm:hidden">
        View All Signs
      </Link>
    </section>
  );
}
