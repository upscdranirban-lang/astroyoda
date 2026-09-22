export interface NumberEssence {
  keyword: string; // a short label used as a card subtitle, e.g. "The Leader"
  trait: string; // the core traditional trait, used inside interpretation sentences
}

// The traditional "core meaning" of each Pythagorean numerology number.
// Shared across Life Path, Destiny, Soul Urge and Personality — each of those
// reads this same essence through a different lens (see numerology.ts).
export const numberEssence: Record<number, NumberEssence> = {
  1: { keyword: "The Initiator", trait: "independence, leadership and starting things from scratch" },
  2: { keyword: "The Peacemaker", trait: "partnership, sensitivity and quiet diplomacy" },
  3: { keyword: "The Communicator", trait: "creative expression, optimism and putting feeling into words" },
  4: { keyword: "The Builder", trait: "structure, discipline and steady, practical effort" },
  5: { keyword: "The Free Spirit", trait: "change, curiosity and resistance to being boxed in" },
  6: { keyword: "The Caretaker", trait: "responsibility, harmony and care for family and home" },
  7: { keyword: "The Seeker", trait: "introspection, analysis and a pull toward deeper questions" },
  8: { keyword: "The Achiever", trait: "ambition, material accomplishment and comfort with authority" },
  9: { keyword: "The Humanitarian", trait: "compassion, breadth of perspective and letting go gracefully" },
  11: { keyword: "The Intuitive (Master Number)", trait: "heightened intuition and inspiration — a more charged version of 2's sensitivity" },
  22: { keyword: "The Master Builder (Master Number)", trait: "turning a large vision into something concrete — a more charged version of 4's discipline" },
  33: { keyword: "The Master Teacher (Master Number)", trait: "selfless guidance on a wide scale — a more charged version of 6's care for others" },
};
