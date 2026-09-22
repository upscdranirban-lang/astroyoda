interface SageMascotProps {
  size?: number;
  className?: string;
  /** Adds the floating-sparkle twinkle animation around the sage. */
  animated?: boolean;
}

/**
 * AstroYoda's mascot: an original, hand-drawn "cosmic sage" character.
 *
 * The brief was "give it Yoda vibes" — so this leans into the *archetype*
 * (small, ancient, wise, gently wrinkled) through original details rather
 * than copying Yoda's own protected design: lavender skin instead of
 * green; long, drooping earlobes (a traditional mark of wisdom in Indian
 * iconography) instead of large pointed ears; a gold-trimmed headwrap
 * instead of a bald head; forehead creases, bushy pale eyebrows and a
 * wisp of a white beard for an elder's face; an asymmetric draped
 * Vedic-sage robe with a japa mala and forehead mark instead of a plain
 * hooded robe; seated in meditation under a starlit aura rather than
 * standing with a cane. Recognizable as "wise ancient little guide," not
 * as any specific copyrighted character.
 */
export default function SageMascot({ size = 96, className, animated = false }: SageMascotProps) {
  return (
    <svg
      viewBox="0 0 240 260"
      width={size}
      height={size * (260 / 240)}
      className={className}
      role="img"
      aria-label="AstroYoda's cosmic sage, meditating beneath a starry aura"
    >
      <defs>
        <radialGradient id="sageAura" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#8D86C9" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#667EEA" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#667EEA" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="sageRobe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5B3E86" />
          <stop offset="100%" stopColor="#3A2657" />
        </linearGradient>
        <linearGradient id="sageShawl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9B4B63" />
          <stop offset="100%" stopColor="#6E2F44" />
        </linearGradient>
      </defs>

      {/* Aura */}
      <circle cx="120" cy="140" r="112" fill="url(#sageAura)" />

      {/* Floating sparkles */}
      <g fill="#C8A96B" className={animated ? "star-twinkle" : undefined} style={{ animationDuration: "3.4s" }}>
        <path d="M42 60 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 Z" />
      </g>
      <g fill="#8D86C9" className={animated ? "star-twinkle" : undefined} style={{ animationDuration: "4.1s", animationDelay: "0.6s" }}>
        <path d="M198 90 l2.4 6.4 6.4 2.4 -6.4 2.4 -2.4 6.4 -2.4 -6.4 -6.4 -2.4 6.4 -2.4 Z" />
      </g>
      <g fill="#F8F8F5" className={animated ? "star-twinkle" : undefined} style={{ animationDuration: "5s", animationDelay: "1.1s" }}>
        <circle cx="188" cy="150" r="2.6" />
        <circle cx="34" cy="130" r="2.2" />
      </g>

      {/* Crossed-leg base */}
      <path
        d="M36 232 C36 190 72 172 120 172 C168 172 204 190 204 232 C204 240 196 244 188 244 L52 244 C44 244 36 240 36 232 Z"
        fill="url(#sageRobe)"
      />
      <path
        d="M50 210 C68 186 92 176 120 176 C148 176 172 186 190 210"
        fill="none"
        stroke="#C8A96B"
        strokeWidth="2.5"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* Torso */}
      <path
        d="M82 190 C78 150 96 116 120 116 C144 116 162 150 158 190 Z"
        fill="url(#sageRobe)"
      />
      {/* Draped shawl, asymmetric — the single biggest silhouette difference from a plain Jedi-style robe */}
      <path
        d="M92 122 C110 116 132 114 152 122 L160 158 C142 150 118 150 100 160 Z"
        fill="url(#sageShawl)"
      />
      <path
        d="M92 122 C110 116 132 114 152 122"
        fill="none"
        stroke="#C8A96B"
        strokeWidth="2"
        opacity="0.6"
      />

      {/* Arms meeting in a gyan mudra at the chest */}
      <path
        d="M86 150 C70 160 66 178 82 192 C90 196 98 194 100 188 C90 182 86 170 92 156 Z"
        fill="url(#sageRobe)"
      />
      <path
        d="M154 150 C170 160 174 178 158 192 C150 196 142 194 140 188 C150 182 154 170 148 156 Z"
        fill="url(#sageRobe)"
      />
      <circle cx="112" cy="190" r="7" fill="#B79B8C" />
      <circle cx="128" cy="190" r="7" fill="#B79B8C" />
      <circle cx="120" cy="188" r="3" fill="#3A2657" opacity="0.35" />

      {/* Japa mala (prayer beads) draped across the chest */}
      <g fill="#C8A96B" opacity="0.85">
        <circle cx="98" cy="140" r="3" />
        <circle cx="105" cy="148" r="3" />
        <circle cx="115" cy="152" r="3" />
        <circle cx="125" cy="152" r="3" />
        <circle cx="135" cy="148" r="3" />
        <circle cx="142" cy="140" r="3" />
      </g>

      {/* Neck */}
      <rect x="108" y="106" width="24" height="18" rx="8" fill="#B79B8C" />

      {/* Head */}
      <circle cx="120" cy="84" r="40" fill="#B79B8C" />

      {/* Long, drooping earlobes — a traditional mark of wisdom/spiritual
          attainment in Indian iconography, and a deliberately different
          shape from a pointed ear: rounded, elongated, with a small ring. */}
      <path
        d="M79 86 C72 86 66 94 68 104 C69 112 76 118 83 114 C86 108 85 96 80 87 Z"
        fill="#B79B8C"
      />
      <circle cx="76" cy="106" r="2.6" fill="none" stroke="#C8A96B" strokeWidth="1.6" opacity="0.85" />
      <path
        d="M161 86 C168 86 174 94 172 104 C171 112 164 118 157 114 C154 108 155 96 160 87 Z"
        fill="#B79B8C"
      />
      <circle cx="164" cy="106" r="2.6" fill="none" stroke="#C8A96B" strokeWidth="1.6" opacity="0.85" />

      {/* Gold-trimmed headwrap in place of hair/exposed pointed ears */}
      <path
        d="M76 78 C76 48 96 26 120 26 C144 26 164 48 164 78 L164 86 C150 68 136 60 120 60 C104 60 90 68 76 86 Z"
        fill="#C8A96B"
      />
      <path
        d="M76 78 C76 48 96 26 120 26 C144 26 164 48 164 78"
        fill="none"
        stroke="#3A2657"
        strokeWidth="2"
        opacity="0.25"
      />
      {/* Wrap knot with a small crescent-and-star finial */}
      <path d="M162 66 L176 58 L172 72 Z" fill="#C8A96B" />
      <path
        d="M182 52 a6 6 0 1 0 0.1 0 a4.6 4.6 0 1 1 -0.1 0 Z"
        fill="#8D86C9"
      />
      <path d="M190 46 l1.6 4.2 4.2 1.6 -4.2 1.6 -1.6 4.2 -1.6 -4.2 -4.2 -1.6 4.2 -1.6 Z" fill="#F8F8F5" />

      {/* Forehead creases — an elder's face */}
      <path d="M94 70 Q120 64 146 70" stroke="#8F7565" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.35" />
      <path d="M97 76 Q120 71 143 76" stroke="#8F7565" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.3" />

      {/* Third-eye mark */}
      <circle cx="120" cy="82" r="3" fill="#9B4B63" />

      {/* Bushy, pale, downturned brows — read as ancient and wise rather
          than the thin neutral arcs of the earlier version. */}
      <path d="M94 90 Q104 80 120 87 Q107 87 98 95 Z" fill="#E7E3F5" opacity="0.92" />
      <path d="M146 90 Q136 80 120 87 Q133 87 142 95 Z" fill="#E7E3F5" opacity="0.92" />

      {/* Deep-set, calm closed eyes */}
      <path d="M100 100 Q107 106 114 100" stroke="#2A1B40" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M126 100 Q133 106 140 100" stroke="#2A1B40" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M97 97 Q107 92 116 97" stroke="#2A1B40" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.3" />
      <path d="M124 97 Q133 92 143 97" stroke="#2A1B40" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.3" />

      {/* Nose and serene smile */}
      <path d="M117 108 Q120 112 123 108" stroke="#2A1B40" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d="M104 118 Q120 128 136 118" stroke="#2A1B40" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.55" />

      {/* A wisp of white beard at the chin — finishes the "ancient elder" read */}
      <path
        d="M108 120 Q113 133 120 135 Q127 133 132 120 Q126 128 120 128 Q114 128 108 120 Z"
        fill="#EDEAF7"
        opacity="0.9"
      />
    </svg>
  );
}
