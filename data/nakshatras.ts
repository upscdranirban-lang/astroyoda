import type { NakshatraAttributes } from "@/types/astrology";

/**
 * The 27 nakshatras' fixed traditional attributes — these don't depend on
 * any individual's birth data (contrast with lib/astrology/nakshatra.ts,
 * which works out WHICH of these 27 a given birth falls into from the
 * calculated sidereal Moon position).
 *
 * Sources cross-checked for accuracy rather than relied on from memory:
 * deity, symbol and ruling planet (Vimshottari dasha lord) from
 * https://en.wikipedia.org/wiki/Nakshatra ; gana from
 * https://onesanatan.com/panchang/nakshatra/ . Yoni and Nadi (mentioned as
 * optional in the blueprint's §9) are intentionally left out of this V1
 * table rather than guessed — the sources checked didn't agree closely
 * enough on those two to publish with confidence; add them once cross-checked
 * against a Sanskrit-literate reference.
 */
export const NAKSHATRAS: NakshatraAttributes[] = [
  { name: "Ashwini", rulingPlanet: "Ketu", deity: "Ashwini Kumaras", symbol: "Horse's head", gana: "Deva" },
  { name: "Bharani", rulingPlanet: "Venus", deity: "Yama", symbol: "Yoni (female organ of reproduction)", gana: "Manushya" },
  { name: "Krittika", rulingPlanet: "Sun", deity: "Agni", symbol: "Knife or spear", gana: "Rakshasa" },
  { name: "Rohini", rulingPlanet: "Moon", deity: "Brahma", symbol: "Cart or chariot, banyan tree", gana: "Manushya" },
  { name: "Mrigashira", rulingPlanet: "Mars", deity: "Soma (Moon)", symbol: "Deer's head", gana: "Deva" },
  { name: "Ardra", rulingPlanet: "Rahu", deity: "Rudra", symbol: "Teardrop, a human head", gana: "Manushya" },
  { name: "Punarvasu", rulingPlanet: "Jupiter", deity: "Aditi", symbol: "Bow and quiver", gana: "Deva" },
  { name: "Pushya", rulingPlanet: "Saturn", deity: "Brihaspati", symbol: "Cow's udder, lotus", gana: "Deva" },
  { name: "Ashlesha", rulingPlanet: "Mercury", deity: "Nagas (serpent deities)", symbol: "Serpent", gana: "Rakshasa" },
  { name: "Magha", rulingPlanet: "Ketu", deity: "Pitrs (ancestors)", symbol: "Royal throne", gana: "Rakshasa" },
  { name: "Purva Phalguni", rulingPlanet: "Venus", deity: "Bhaga", symbol: "Front legs of a bed, fig tree", gana: "Manushya" },
  { name: "Uttara Phalguni", rulingPlanet: "Sun", deity: "Aryaman", symbol: "Back legs of a bed", gana: "Manushya" },
  { name: "Hasta", rulingPlanet: "Moon", deity: "Savitr", symbol: "Hand or fist", gana: "Deva" },
  { name: "Chitra", rulingPlanet: "Mars", deity: "Vishwakarma", symbol: "Bright jewel or pearl", gana: "Rakshasa" },
  { name: "Swati", rulingPlanet: "Rahu", deity: "Vayu", symbol: "Shoot of a plant, coral", gana: "Deva" },
  { name: "Vishakha", rulingPlanet: "Jupiter", deity: "Indra and Agni", symbol: "Triumphal arch, potter's wheel", gana: "Rakshasa" },
  { name: "Anuradha", rulingPlanet: "Saturn", deity: "Mitra", symbol: "Triumphal archway, lotus", gana: "Deva" },
  { name: "Jyeshtha", rulingPlanet: "Mercury", deity: "Indra", symbol: "Circular amulet, umbrella", gana: "Rakshasa" },
  { name: "Mula", rulingPlanet: "Ketu", deity: "Nirriti", symbol: "Bunch of roots tied together", gana: "Rakshasa" },
  { name: "Purva Ashadha", rulingPlanet: "Venus", deity: "Apas (the waters)", symbol: "Elephant tusk, fan", gana: "Manushya" },
  { name: "Uttara Ashadha", rulingPlanet: "Sun", deity: "Vishvadevas", symbol: "Elephant tusk, small bed", gana: "Manushya" },
  { name: "Shravana", rulingPlanet: "Moon", deity: "Vishnu", symbol: "Ear, three footprints", gana: "Deva" },
  { name: "Dhanishta", rulingPlanet: "Mars", deity: "Vasus", symbol: "Drum or flute", gana: "Rakshasa" },
  { name: "Shatabhisha", rulingPlanet: "Rahu", deity: "Varuna", symbol: "Empty circle, a thousand stars", gana: "Rakshasa" },
  { name: "Purva Bhadrapada", rulingPlanet: "Jupiter", deity: "Aja Ekapada", symbol: "Front legs of a funeral cot, sword", gana: "Manushya" },
  { name: "Uttara Bhadrapada", rulingPlanet: "Saturn", deity: "Ahirbudhnya", symbol: "Back legs of a funeral cot, serpent", gana: "Manushya" },
  { name: "Revati", rulingPlanet: "Mercury", deity: "Pushan", symbol: "Fish, drum", gana: "Deva" },
];
