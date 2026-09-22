interface SageMascotProps {
  size?: number;
  className?: string;
  /** Adds the floating-sparkle twinkle animation around the sage. */
  animated?: boolean;
}

/**
 * AstroYoda's mascot: an original, hand-drawn "cosmic sage" character.
 *
 * The brief was "give it Yoda vibes" and "more painterly, less flat
 * cartoon" — so this leans into the archetype (small, ancient, wise) and
 * uses gradient shading (a warm directional light on the skin, fabric-fold
 * shadow lines on the robe) to read as a shaded illustration rather than a
 * flat icon, while staying visually distinct from any existing
 * copyrighted character: warm tan skin rather than green, long drooping
 * earlobes (a traditional mark of wisdom in Indian iconography) instead
 * of large pointed ears, a gold-trimmed headwrap instead of a bald head,
 * forehead creases and pale downturned brows for an elder's face, an
 * asymmetric draped Vedic-sage robe with a japa mala and forehead mark
 * instead of a plain hooded robe, seated in meditation under a starlit
 * aura rather than standing with a cane.
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
        <linearGradient id="sageRobe" x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor="#6A4A98" />
          <stop offset="100%" stopColor="#382451" />
        </linearGradient>
        <linearGradient id="sageShawl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#AC5570" />
          <stop offset="100%" stopColor="#692E42" />
        </linearGradient>
        <radialGradient id="skinShade" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#CBA88F" />
          <stop offset="55%" stopColor="#B08D74" />
          <stop offset="100%" stopColor="#8F6E58" />
        </radialGradient>
        <linearGradient id="wrapShade" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#DDBD84" />
          <stop offset="100%" stopColor="#B08A4E" />
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

      {/* Crossed-leg base, with a soft highlight and fold lines for depth */}
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
      <path d="M70 220 C84 206 100 199 118 198" fill="none" stroke="#2A1B40" strokeWidth="2" opacity="0.25" strokeLinecap="round" />
      <path d="M170 220 C156 206 140 199 122 198" fill="none" stroke="#2A1B40" strokeWidth="2" opacity="0.25" strokeLinecap="round" />
      <ellipse cx="95" cy="200" rx="20" ry="8" fill="#F8F8F5" opacity="0.06" />

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
      <path d="M104 132 C116 128 130 128 142 133" fill="none" stroke="#3E1E2A" strokeWidth="1.6" opacity="0.3" strokeLinecap="round" />

      {/* Arms meeting in a gyan mudra at the chest */}
      <path
        d="M86 150 C70 160 66 178 82 192 C90 196 98 194 100 188 C90 182 86 170 92 156 Z"
        fill="url(#sageRobe)"
      />
      <path
        d="M154 150 C170 160 174 178 158 192 C150 196 142 194 140 188 C150 182 154 170 148 156 Z"
        fill="url(#sageRobe)"
      />
      <circle cx="112" cy="190" r="7" fill="url(#skinShade)" />
      <circle cx="128" cy="190" r="7" fill="url(#skinShade)" />
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
      <rect x="108" y="106" width="24" height="18" rx="8" fill="url(#skinShade)" />

      {/* Head + face, scaled and centered from a design authored around a
          120,120 / r=56 origin so the proportions read clearly even at
          this smaller in-context size. */}
      <g transform="translate(120,84) scale(0.714286) translate(-120,-120)">
        <circle cx="120" cy="120" r="56" fill="url(#skinShade)" />

        {/* Long, drooping earlobes — a traditional mark of wisdom/spiritual
            attainment in Indian iconography, and deliberately unlike a
            pointed ear */}
        <path d="M76 122 C66 122 58 132 61 145 C63 154 72 161 81 156 C85 148 84 132 78 122 Z" fill="url(#skinShade)" />
        <circle cx="72" cy="147" r="3.4" fill="none" stroke="#DDBD84" strokeWidth="2" opacity="0.85" />
        <path d="M164 122 C174 122 182 132 179 145 C177 154 168 161 159 156 C155 148 156 132 162 122 Z" fill="url(#skinShade)" />
        <circle cx="168" cy="147" r="3.4" fill="none" stroke="#DDBD84" strokeWidth="2" opacity="0.85" />

        {/* Gold-trimmed headwrap in place of hair/exposed pointed ears */}
        <path
          d="M64 106 C64 66 90 34 120 34 C150 34 176 66 176 106 L176 118 C158 92 140 80 120 80 C100 80 82 92 64 118 Z"
          fill="url(#wrapShade)"
        />
        <path
          d="M64 106 C64 66 90 34 120 34 C150 34 176 66 176 106"
          fill="none"
          stroke="#5B3E26"
          strokeWidth="2"
          opacity="0.25"
        />
        {/* Wrap knot with a small crescent-and-star finial */}
        <path d="M172 96 L190 86 L185 104 Z" fill="url(#wrapShade)" />
        <path d="M198 78 a8 8 0 1 0 0.1 0 a6 6 0 1 1 -0.1 0 Z" fill="#8D86C9" />
        <path d="M208 68 l2.2 5.8 5.8 2.2 -5.8 2.2 -2.2 5.8 -2.2 -5.8 -5.8 -2.2 5.8 -2.2 Z" fill="#F8F8F5" />

        {/* Forehead creases — an elder's face */}
        <path d="M92 96 Q120 89 148 96" stroke="#6B4E38" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.35" />
        <path d="M96 104 Q120 98 144 104" stroke="#6B4E38" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.3" />

        {/* Third-eye mark */}
        <ellipse cx="120" cy="112" rx="3" ry="4" fill="#9B4B63" />

        {/* Thin, tapered brows sitting clearly above the eyes */}
        <path d="M90 122 Q100 114 114 118 Q102 118 92 126 Z" fill="#EFE7DD" opacity="0.95" />
        <path d="M150 122 Q140 114 126 118 Q138 118 148 126 Z" fill="#EFE7DD" opacity="0.95" />

        {/* Closed, calm eyes with a small lash flick */}
        <path d="M96 136 Q106 142 116 136" stroke="#3A2A1E" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M96 136 L91 133" stroke="#3A2A1E" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M124 136 Q134 142 144 136" stroke="#3A2A1E" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M144 136 L149 133" stroke="#3A2A1E" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Soft cheek warmth */}
        <ellipse cx="98" cy="148" rx="10" ry="6" fill="#C97C6B" opacity="0.18" />
        <ellipse cx="142" cy="148" rx="10" ry="6" fill="#C97C6B" opacity="0.18" />

        {/* Nose */}
        <path d="M117 138 Q114 148 119 152 Q123 153 126 150" stroke="#6B4E38" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5" />

        {/* Serene mouth */}
        <path d="M104 160 Q120 170 136 160" stroke="#3A2A1E" strokeWidth="2.6" fill="none" strokeLinecap="round" opacity="0.6" />
        <path d="M108 162 Q120 167 132 162" stroke="#3A2A1E" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.25" />
      </g>
    </svg>
  );
}
