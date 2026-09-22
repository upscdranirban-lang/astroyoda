import Link from "next/link";

const topics = [
  { href: "/nakshatra", label: "Nakshatra" },
  { href: "/learn/what-is-lagna", label: "Lagna" },
  { href: "/learn/what-is-vimshottari-dasha", label: "Dasha" },
  { href: "/numerology/life-path-number-1", label: "Life Path Number" },
  { href: "/learn/what-is-a-birth-chart", label: "Birth Chart" },
  { href: "/learn/vedic-vs-western-astrology", label: "Vedic vs Western" },
  { href: "/learn/what-are-master-numbers", label: "Master Numbers" },
  { href: "/compatibility", label: "Compatibility" },
];

export default function PopularTopics() {
  return (
    <section className="container-page py-14">
      <h2 className="section-heading text-center">Popular Astrology Topics</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {topics.map((topic) => (
          <Link key={topic.href} href={topic.href} className="chip hover:text-textPrimary hover:border-white/20">
            {topic.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
