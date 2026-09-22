import type { LearnArticle } from "@/types/learn";

/**
 * The 9 /learn articles, in the order they're introduced across the site
 * (homepage's EducationalArticles + PopularTopics both link to these
 * slugs). Content was researched and cross-checked against at least two
 * independent sources per topic before writing (Wikipedia, Britannica,
 * and established astrology/numerology reference sites), per the
 * project's no-fabrication rule. Two points genuinely disagree between
 * sources and are worded conservatively rather than stated as settled
 * fact:
 *
 * - The historical origin date of Vedic astrology's earliest texts is
 *   scholarly-contested (see "what-is-vedic-astrology").
 * - Whether 33 is traditionally recognized as a "master number" alongside
 *   11 and 22 is disputed between numerology schools — AstroYoda's own
 *   calculator treats it as one (see lib/numerology/reduceNumber.ts), but
 *   the article says so explicitly rather than presenting it as
 *   universally agreed (see "what-are-master-numbers").
 */
export const learnArticles: LearnArticle[] = [
  {
    slug: "what-is-vedic-astrology",
    title: "What Is Vedic Astrology?",
    description:
      "A beginner's guide to Jyotish — where it comes from, how it's structured, and how it differs from what you read in Western sun-sign columns.",
    sections: [
      {
        paragraphs: [
          "Vedic astrology — known in Sanskrit as Jyotish, meaning roughly \"science of light\" — is one of the six traditional Vedanga, disciplines that grew up alongside the Vedas to support their study (the others cover things like grammar, phonetics and ritual timing). Its earliest known text, the Vedanga Jyotisha, is traditionally attributed to a sage named Lagadha, and mostly describes a lunisolar calendar rather than the predictive, chart-based astrology practiced today. Scholars genuinely disagree on how old it is — some date it as far back as 1400–1200 BCE, others argue the text we have was compiled in the last few centuries BCE — so it's fairest to call it ancient, without pinning an exact century.",
        ],
      },
      {
        heading: "How it's structured",
        paragraphs: [
          "Vedic astrology maps the sky onto four interlocking layers: 12 zodiac signs (rashis), 27 lunar mansions (nakshatras) that divide the same 360° of sky more finely, 9 \"planets\" (grahas) — the Sun, Moon, Mars, Mercury, Jupiter, Venus and Saturn, plus the lunar nodes Rahu and Ketu, which are mathematical points rather than physical bodies but are read as full grahas — and 12 houses (bhavas) representing different areas of life. Your birth chart records where each graha sat, by sign and house, at the exact moment and place you were born.",
        ],
      },
      {
        heading: "How it differs from Western astrology, briefly",
        paragraphs: [
          "The single biggest technical difference is which zodiac it measures against: Vedic astrology uses a sidereal (star-fixed) zodiac, while Western astrology uses a tropical (season-fixed) one, which means the same birth date can land in a different sign in each system. See \"Vedic vs Western Astrology\" for the full comparison.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/astrology/birth-chart", label: "Calculate your birth chart" },
      { href: "/nakshatra", label: "Find your Nakshatra" },
      { href: "/learn/vedic-vs-western-astrology", label: "Vedic vs Western Astrology" },
    ],
  },
  {
    slug: "what-is-nakshatra",
    title: "What Is a Nakshatra?",
    description:
      "The 27 lunar mansions that anchor Vedic astrology, and why your Nakshatra matters as much as your zodiac sign.",
    sections: [
      {
        paragraphs: [
          "A nakshatra is one of 27 \"lunar mansions\" that Vedic astrology divides the sky into — each spanning exactly 13°20' of the ecliptic (27 × 13°20' = the full 360° circle). Where a zodiac sign is a broad, 30°-wide slice of sky, a nakshatra is a much finer one, and each is further divided into 4 padas (\"steps\"), giving 108 total divisions across the sky.",
        ],
      },
      {
        heading: "Your birth Nakshatra",
        paragraphs: [
          "Because the Moon moves through all 27 nakshatras roughly once every 27 days, your birth (Janma) Nakshatra is simply whichever one the Moon occupied at the exact moment you were born. It's traditionally read for personality and character, for muhurta (choosing an auspicious time for something), and as one factor in compatibility matching between two charts.",
        ],
      },
      {
        heading: "Nakshatra vs. zodiac sign",
        paragraphs: [
          "Because a sign (30°) is exactly 2.25 nakshatras wide, one sign always contains 2 full nakshatras plus the first pada of a third, which then spills into the next sign. Aries, for example, contains all of Ashwini and Bharani, plus the first quarter of Krittika. This finer-grained sky is why Vedic astrology often treats your Nakshatra as carrying just as much personal detail as your sign — sometimes more.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/nakshatra", label: "Find your Nakshatra" },
      { href: "/compatibility", label: "Compare two charts" },
    ],
  },
  {
    slug: "what-is-numerology",
    title: "What Is Numerology?",
    description:
      "How letters and numbers are traditionally believed to carry meaning, and where the system actually comes from.",
    sections: [
      {
        paragraphs: [
          "Numerology is the traditional practice of reducing letters (through a letter-to-number correspondence — A=1, B=2, and so on) and dates to single digits, then reading symbolic meaning into the result. It's often described as \"Pythagorean\" numerology, but that attribution deserves a caveat: historians genuinely aren't sure how much of it traces to Pythagoras himself — the historical record on his life is thin enough that even the theorem bearing his name is disputed by scholars. Numeric-symbolic traditions also developed independently elsewhere, including Hebrew gematria (assigning numeric values to Hebrew letters) and the Chaldean numerology system, so it's more accurate to say numerology has several parallel roots than a single inventor.",
        ],
      },
      {
        heading: "The Life Path Number",
        paragraphs: [
          "The most commonly used numerology figure is the Life Path Number, calculated from your date of birth: the month, day and year are each reduced separately (down to a single digit, or a master number — see \"What Are Master Numbers?\"), then the three results are summed and reduced again the same way. Because master numbers (11, 22, and — depending on the tradition — 33) are deliberately not collapsed further during this process, a Life Path calculation can land on one of those instead of a single digit.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/numerology", label: "Calculate your numbers" },
      { href: "/learn/what-are-master-numbers", label: "What Are Master Numbers?" },
    ],
  },
  {
    slug: "what-is-a-birth-chart",
    title: "What Is a Birth Chart?",
    description:
      "What a Vedic birth chart actually is: a snapshot of the sky at the exact moment you were born, and what it's used for.",
    sections: [
      {
        paragraphs: [
          "A Vedic birth chart — called a Kundli or Janma Kundali — is a map of exactly where each planet (graha) sat, by zodiac sign, at the precise date, time and place of your birth. It's the foundational document Vedic astrology works from: every further reading, from house-by-house interpretation to planetary-period (Dasha) timing to compatibility matching, starts from this one chart.",
        ],
      },
      {
        heading: "Why it needs an exact time and place",
        paragraphs: [
          "The chart's 12 houses are laid out relative to your Ascendant (Lagna) — the sign rising on the eastern horizon at your exact birth moment, which becomes house 1, with the rest following in order around the chart. Because the Ascendant changes continuously as the Earth rotates, getting it right depends on knowing your birth time and location precisely; a birth date alone isn't enough to build an accurate chart.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/astrology/birth-chart", label: "Calculate your birth chart" },
      { href: "/learn/how-to-read-a-birth-chart", label: "How to Read a Birth Chart" },
      { href: "/learn/what-is-lagna", label: "What Is Lagna?" },
    ],
  },
  {
    slug: "how-to-read-a-birth-chart",
    title: "How to Read a Birth Chart",
    description:
      "A plain-language walkthrough of houses, signs and planets — no prior knowledge required.",
    sections: [
      {
        paragraphs: [
          "Once you have a birth chart in front of you (see \"What Is a Birth Chart?\" if you haven't yet), reading it comes down to combining three layers of meaning: which house you're looking at, which sign occupies it, and which planets (if any) sit inside it.",
        ],
      },
      {
        heading: "Houses: the \"where\"",
        paragraphs: [
          "Each of the 12 houses (bhavas) represents a broad area of life — house 1 is the self and body, house 4 is home and inner foundation, house 7 is partnerships, house 10 is career and public standing, and so on. Traditionally the houses are also grouped by role: the Kendras (1, 4, 7, 10) are considered structural pillars of the chart, the Trikonas (1, 5, 9) are the most auspicious houses, and the Dusthanas (6, 8, 12) are traditionally read as more challenging.",
        ],
      },
      {
        heading: "Signs: the \"how\"",
        paragraphs: [
          "The zodiac sign occupying a house colors how that life area tends to express itself — a house ruled by an earth sign plays out differently than the same house ruled by a fire sign, even though the underlying life area (say, career) is the same.",
        ],
      },
      {
        heading: "Planets: the \"what\"",
        paragraphs: [
          "A planet placed within a house blends its own traditional significations with that house's domain and that sign's flavor — so, for example, the Moon (emotion, instinct) placed in the 7th house (partnerships) reads differently than the same Moon placed in the 10th (career).",
        ],
      },
      {
        heading: "Your reference point: the Ascendant",
        paragraphs: [
          "Everything above is read relative to your Lagna (Ascendant) — it's the sign that fixes house 1, and every other house follows from it in order. That's why two people born on the same date, but at a different time or place, can end up with genuinely different charts.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/astrology/birth-chart", label: "Calculate your birth chart" },
      { href: "/learn/what-is-a-birth-chart", label: "What Is a Birth Chart?" },
      { href: "/learn/what-is-lagna", label: "What Is Lagna?" },
    ],
  },
  {
    slug: "what-is-lagna",
    title: "What Is Lagna?",
    description:
      "The Ascendant, or \"rising sign\" — what it is, why Vedic astrology treats it as central, and why exact birth time matters so much for it.",
    sections: [
      {
        paragraphs: [
          "Lagna — usually translated as the Ascendant, or \"rising sign\" — is the zodiac sign that was rising on the eastern horizon at the exact moment you were born. The name traces back to the Greek horoskopos, \"hour-marker,\" because it's literally the point of the sky crossing the horizon at that instant.",
        ],
      },
      {
        heading: "Why it's so central in Vedic astrology",
        paragraphs: [
          "Vedic astrology's standard house system (whole-sign houses) builds the entire chart from the Lagna: whichever sign is rising becomes house 1, and the remaining 11 signs fall into houses 2 through 12 in zodiac order from there. In effect, the Lagna is the lens the rest of the chart is read through.",
        ],
      },
      {
        heading: "Why exact birth time matters so much here",
        paragraphs: [
          "The Ascendant is calculated from three things together — your birth time, date and location — and because the Earth keeps rotating, it moves through a full sign roughly every two hours and shifts measurably within just a few minutes. That makes it far more time-sensitive than most other chart factors: even a birth-time error of 15–20 minutes can be enough to change your Lagna, and with it every house placement built on top of it. This is exactly why AstroYoda flags Ascendant and house results as approximate whenever your birth time is uncertain or unknown.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/astrology/birth-chart", label: "Calculate your birth chart" },
      { href: "/learn/what-is-a-birth-chart", label: "What Is a Birth Chart?" },
    ],
  },
  {
    slug: "what-is-vimshottari-dasha",
    title: "What Is Vimshottari Dasha?",
    description:
      "The traditional 120-year planetary-period system Vedic astrology uses to time life events.",
    sections: [
      {
        paragraphs: [
          "Vimshottari Dasha is Vedic astrology's traditional system for timing — for asking not just what a chart means, but when a given theme is likely to be active in someone's life. It divides a person's life into a repeating 120-year cycle of nine planetary periods, and which period you're born into (and how far through it) is determined by your Moon's Nakshatra at birth (see \"What Is a Nakshatra?\").",
        ],
      },
      {
        heading: "The nine planetary periods",
        paragraphs: [
          "Each of the 9 grahas rules a period of a fixed traditional length, and the nine lengths sum to exactly 120 years: Sun 6 years, Moon 10 years, Mars 7 years, Rahu 18 years, Jupiter 16 years, Saturn 19 years, Mercury 17 years, Ketu 7 years, and Venus 20 years.",
        ],
      },
      {
        heading: "Mahadasha and Antardasha",
        paragraphs: [
          "A person's major period at any point in life is their Mahadasha — one of the nine periods above. Within each Mahadasha, all nine planets also get a proportional sub-period, called an Antardasha, in the same fixed sequence, giving a more detailed, nested layer of timing.",
        ],
      },
      {
        heading: "A note on this site",
        paragraphs: [
          "AstroYoda doesn't calculate your personal Dasha timeline yet (it's a more involved, specialist calculation — see the roadmap on the About page) — this article is here as background for the concept. Your Moon Nakshatra, which any Dasha calculation would start from, is already available from the Nakshatra Finder.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/nakshatra", label: "Find your Moon Nakshatra" },
      { href: "/astrology/birth-chart", label: "Calculate your birth chart" },
    ],
  },
  {
    slug: "vedic-vs-western-astrology",
    title: "Vedic vs Western Astrology: What's the Difference?",
    description:
      "The core technical difference between the two systems — and why the same birth date can land in a different sign in each.",
    sections: [
      {
        paragraphs: [
          "The two traditions share a common ancestor and much of the same basic vocabulary — 12 signs, planets, houses — but diverge on one specific technical point: which zodiac they measure against.",
        ],
      },
      {
        heading: "Sidereal vs. tropical",
        paragraphs: [
          "Western astrology uses the tropical zodiac, fixed to the seasons: 0° Aries is always defined as the March equinox point, wherever that happens to fall against the actual stars. Vedic astrology uses the sidereal zodiac, fixed to the actual constellations, adjusted by a correction called the ayanamsa. The two zodiacs lined up roughly 2,000 years ago and have been drifting apart ever since, at about 1° every 72 years, due to the slow wobble of Earth's axis (precession of the equinoxes). Today the offset between them is roughly 23–24 degrees — commonly close to one full zodiac sign — which is why the same birth date can produce a different Sun sign in each system. Vedic astrology typically uses the Lahiri ayanamsa for this correction (which is also what AstroYoda's calculators use); a minority of Western astrologers who also work sidereally tend to use a different one, called Fagan-Bradley.",
        ],
      },
      {
        heading: "What each system emphasizes",
        paragraphs: [
          "Western astrology typically centers the Sun sign as the core of a person's identity. Vedic astrology gives more weight to the Moon sign and Nakshatra — tied traditionally to the mind (manas) — for reading personality and life patterns.",
        ],
      },
      {
        heading: "How each system times events",
        paragraphs: [
          "For predicting when a theme becomes active, Vedic astrology traditionally uses Dasha systems like Vimshottari (see \"What Is Vimshottari Dasha?\"), while Western astrology relies on transits (the current positions of planets against your birth chart) and progressions instead.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/astrology/birth-chart", label: "Calculate your birth chart" },
      { href: "/learn/what-is-vedic-astrology", label: "What Is Vedic Astrology?" },
    ],
  },
  {
    slug: "what-are-master-numbers",
    title: "What Are Master Numbers?",
    description:
      "The numerology numbers 11, 22 and 33, which are traditionally kept intact rather than reduced further — and what each is said to mean.",
    sections: [
      {
        paragraphs: [
          "In numerology, most calculations reduce a number down to a single digit (1 through 9) by repeatedly summing its digits. Master numbers are the exception: when a calculation lands on 11 or 22, tradition holds that it's kept as-is rather than reduced further (11 → 1+1 = 2, for instance, is deliberately skipped), because these numbers are considered to carry amplified, more intense significance than a single digit would.",
        ],
      },
      {
        heading: "11, 22 — and 33",
        paragraphs: [
          "11 and 22 are the master numbers essentially every numerology tradition agrees on. 33 is more debated: some classical schools — including strands of the Pythagorean, Kabbalistic and Chaldean traditions — recognize only 11 and 22 as master numbers, while many modern practitioners include 33 as well. AstroYoda's own calculator treats 33 as a master number too, in keeping with that more common modern practice, but it's worth knowing this particular point isn't universally settled.",
        ],
      },
      {
        heading: "Traditional meanings",
        paragraphs: [
          "11 is traditionally associated with intuition, inspiration and heightened sensitivity. 22, often called \"the Master Builder,\" combines that same visionary quality with the practical ability to build something large and lasting. 33, where it's included, is often called \"the Master Teacher,\" associated with compassion, healing and service to others.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/numerology", label: "Calculate your numbers" },
      { href: "/learn/what-is-numerology", label: "What Is Numerology?" },
    ],
  },
];

export function getLearnArticle(slug: string): LearnArticle | undefined {
  return learnArticles.find((article) => article.slug === slug);
}

export function getAllLearnSlugs(): string[] {
  return learnArticles.map((article) => article.slug);
}
