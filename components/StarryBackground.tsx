import { generateStars, CONSTELLATIONS } from "@/lib/starfield";

// Three depth layers of stars give a subtle sense of parallax/scale without
// any JS or scroll listeners — everything below is static markup animated
// purely with CSS (see the .star-twinkle keyframes in globals.css), and it
// is neutralized automatically for prefers-reduced-motion by the existing
// global rule in globals.css.
const SMALL_STARS = generateStars(90, 7);
const MEDIUM_STARS = generateStars(34, 21);
const LARGE_STARS = generateStars(12, 99);

export default function StarryBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {/* Faint constellation lines */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
      >
        {CONSTELLATIONS.map((points, ci) => (
          <g key={ci}>
            {points.slice(1).map((point, pi) => {
              const prev = points[pi];
              return (
                <line
                  key={pi}
                  x1={`${prev[0]}%`}
                  y1={`${prev[1]}%`}
                  x2={`${point[0]}%`}
                  y2={`${point[1]}%`}
                  stroke="#8D86C9"
                  strokeWidth={1}
                />
              );
            })}
            {points.map((point, pi) => (
              <circle
                key={`dot-${pi}`}
                cx={`${point[0]}%`}
                cy={`${point[1]}%`}
                r={1.4}
                fill="#C8A96B"
              />
            ))}
          </g>
        ))}
      </svg>

      {SMALL_STARS.map((star, i) => (
        <span
          key={`sm-${i}`}
          className="star-twinkle absolute rounded-full bg-white"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size,
            height: star.size,
            opacity: star.baseOpacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {MEDIUM_STARS.map((star, i) => (
        <span
          key={`md-${i}`}
          className="star-twinkle absolute rounded-full bg-lavender"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size + 0.5,
            height: star.size + 0.5,
            opacity: star.baseOpacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}

      {LARGE_STARS.map((star, i) => (
        <span
          key={`lg-${i}`}
          className="star-twinkle absolute rounded-full bg-gold"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            width: star.size + 1.2,
            height: star.size + 1.2,
            opacity: star.baseOpacity,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            boxShadow: `0 0 ${(star.size + 1.2) * 3}px rgba(200,169,107,0.55)`,
          }}
        />
      ))}
    </div>
  );
}
