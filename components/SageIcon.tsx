interface SageIconProps {
  size?: number;
  className?: string;
}

/**
 * A compact, bust-only crop of the SageMascot for use at logo/wordmark
 * sizes (~24-36px), where the fully detailed illustration (see
 * SageMascot.tsx for the full design rationale and copyright notes)
 * turns into an indistinct blur. This keeps only what survives shrinking
 * — the headwrap silhouette, the face's closed eyes/brows/smile, the
 * third-eye mark, the long earlobes, and a hint of the shawl — and drops
 * the forehead creases, nose line and cheek shading that add noise
 * rather than clarity at this size.
 */
export default function SageIcon({ size = 32, className }: SageIconProps) {
  return (
    <svg
      viewBox="16 20 208 190"
      width={size}
      height={size * (190 / 208)}
      className={className}
      role="img"
      aria-label="AstroYoda's cosmic sage"
    >
      <defs>
        <radialGradient id="sageIconSkin" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#CBA88F" />
          <stop offset="55%" stopColor="#B08D74" />
          <stop offset="100%" stopColor="#8F6E58" />
        </radialGradient>
        <linearGradient id="sageIconWrap" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#DDBD84" />
          <stop offset="100%" stopColor="#B08A4E" />
        </linearGradient>
        <linearGradient id="sageIconShawl" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#AC5570" />
          <stop offset="100%" stopColor="#692E42" />
        </linearGradient>
      </defs>

      {/* Shoulders/shawl hint, anchors the bust so it doesn't float */}
      <path d="M55 165 C55 145 75 132 120 132 C165 132 185 145 185 165 L185 210 L55 210 Z" fill="url(#sageIconShawl)" />

      {/* Long, drooping earlobes */}
      <path d="M76 122 C66 122 58 132 61 145 C63 154 72 161 81 156 C85 148 84 132 78 122 Z" fill="url(#sageIconSkin)" />
      <path d="M164 122 C174 122 182 132 179 145 C177 154 168 161 159 156 C155 148 156 132 162 122 Z" fill="url(#sageIconSkin)" />

      {/* Head */}
      <circle cx="120" cy="120" r="56" fill="url(#sageIconSkin)" />

      {/* Headwrap */}
      <path
        d="M64 106 C64 66 90 34 120 34 C150 34 176 66 176 106 L176 118 C158 92 140 80 120 80 C100 80 82 92 64 118 Z"
        fill="url(#sageIconWrap)"
      />
      <path d="M172 96 L188 87 L184 103 Z" fill="url(#sageIconWrap)" />
      <path d="M195 80 a7 7 0 1 0 0.1 0 a5.2 5.2 0 1 1 -0.1 0 Z" fill="#8D86C9" />

      {/* Third-eye mark */}
      <ellipse cx="120" cy="112" rx="3.4" ry="4.4" fill="#9B4B63" />

      {/* Bold brows and closed eyes — kept heavier than the full
          illustration's so they stay legible when shrunk */}
      <path d="M88 122 Q100 112 116 117 Q102 117 90 127 Z" fill="#EFE7DD" />
      <path d="M152 122 Q140 112 124 117 Q138 117 150 127 Z" fill="#EFE7DD" />
      <path d="M95 137 Q106 144 117 137" stroke="#3A2A1E" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M123 137 Q134 144 145 137" stroke="#3A2A1E" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* Serene smile */}
      <path d="M103 161 Q120 172 137 161" stroke="#3A2A1E" strokeWidth="3.2" fill="none" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
}
