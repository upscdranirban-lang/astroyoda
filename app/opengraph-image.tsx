import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export const alt = "AstroYoda — Know Your Stars. Understand Yourself.";

/**
 * Default social-share (Open Graph / Twitter card) image for the whole
 * site, shown when a link is pasted into iMessage, WhatsApp, Slack, X,
 * etc. Individual pages inherit this unless they define their own
 * opengraph-image. Reuses the sage-icon design (see components/SageIcon
 * and app/icon.tsx) plus a few fixed "stars" — not the seeded
 * StarryBackground component, since that generates a different
 * random-looking field on every server render and this needs to be a
 * single static image baked at build time.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0B1020 0%, #151B33 100%)",
          position: "relative",
        }}
      >
        {[
          [90, 70], [220, 160], [340, 60], [480, 200], [620, 90],
          [760, 220], [900, 80], [1040, 180], [1140, 110], [150, 420],
          [300, 500], [520, 470], [700, 540], [880, 460], [1020, 520],
          [1160, 430], [60, 300], [1130, 260],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: i % 3 === 0 ? 5 : 3,
              height: i % 3 === 0 ? 5 : 3,
              borderRadius: "50%",
              background: "#F8F8F5",
              opacity: i % 2 === 0 ? 0.8 : 0.4,
            }}
          />
        ))}

        <div style={{ display: "flex", alignItems: "center", gap: 56 }}>
          <svg viewBox="16 20 208 190" width="220" height="200">
            <defs>
              <radialGradient id="ogSkin" cx="38%" cy="30%" r="75%">
                <stop offset="0%" stopColor="#CBA88F" />
                <stop offset="55%" stopColor="#B08D74" />
                <stop offset="100%" stopColor="#8F6E58" />
              </radialGradient>
              <linearGradient id="ogWrap" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%" stopColor="#DDBD84" />
                <stop offset="100%" stopColor="#B08A4E" />
              </linearGradient>
              <linearGradient id="ogShawl" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#AC5570" />
                <stop offset="100%" stopColor="#692E42" />
              </linearGradient>
            </defs>
            <path
              d="M55 165 C55 145 75 132 120 132 C165 132 185 145 185 165 L185 210 L55 210 Z"
              fill="url(#ogShawl)"
            />
            <path
              d="M76 122 C66 122 58 132 61 145 C63 154 72 161 81 156 C85 148 84 132 78 122 Z"
              fill="url(#ogSkin)"
            />
            <path
              d="M164 122 C174 122 182 132 179 145 C177 154 168 161 159 156 C155 148 156 132 162 122 Z"
              fill="url(#ogSkin)"
            />
            <circle cx="120" cy="120" r="56" fill="url(#ogSkin)" />
            <path
              d="M64 106 C64 66 90 34 120 34 C150 34 176 66 176 106 L176 118 C158 92 140 80 120 80 C100 80 82 92 64 118 Z"
              fill="url(#ogWrap)"
            />
            <path d="M172 96 L188 87 L184 103 Z" fill="url(#ogWrap)" />
            <path
              d="M195 80 a7 7 0 1 0 0.1 0 a5.2 5.2 0 1 1 -0.1 0 Z"
              fill="#8D86C9"
            />
            <ellipse cx="120" cy="112" rx="3.4" ry="4.4" fill="#9B4B63" />
            <path d="M88 122 Q100 112 116 117 Q102 117 90 127 Z" fill="#EFE7DD" />
            <path d="M152 122 Q140 112 124 117 Q138 117 150 127 Z" fill="#EFE7DD" />
            <path
              d="M95 137 Q106 144 117 137"
              stroke="#3A2A1E"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M123 137 Q134 144 145 137"
              stroke="#3A2A1E"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M103 161 Q120 172 137 161"
              stroke="#3A2A1E"
              strokeWidth="3.2"
              fill="none"
              strokeLinecap="round"
              opacity="0.65"
            />
          </svg>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 76,
                fontWeight: 700,
                color: "#F8F8F5",
                letterSpacing: -1,
              }}
            >
              AstroYoda
            </div>
            <div
              style={{
                marginTop: 14,
                fontSize: 32,
                color: "#C8A96B",
              }}
            >
              Know Your Stars. Understand Yourself.
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

