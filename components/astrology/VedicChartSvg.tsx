import type { ChartHouse } from "@/lib/astrology/houseLayout";

interface VedicChartSvgProps {
  houses: ChartHouse[]; // exactly 12, in house-number order (see getChartHouses)
}

/**
 * North Indian style Vedic chart: a square with houses fixed in position
 * (House 1 always at the top point) and each house's zodiac sign changing
 * with the Ascendant. This is the classic "diamond" construction: a square,
 * its two corner-to-corner diagonals, and a diamond formed by connecting
 * the midpoints of its four sides — together these lines divide the square
 * into exactly 12 compartments. All coordinates below were derived
 * directly from that geometric construction (not sourced from any
 * third-party chart image), on a 320x320 canvas with a 10px margin.
 *
 * Houses 1, 4, 7, 10 are the four "kite" shapes touching the top/right/
 * bottom/left edge midpoints; the rest are the eight corner triangles.
 */
const SQUARE = { tl: [10, 10], tr: [310, 10], br: [310, 310], bl: [10, 310] } as const;
const MID = { top: [160, 10], right: [310, 160], bottom: [160, 310], left: [10, 160] } as const;
const CENTER = [160, 160] as const;
// Where each pair of diamond edges meeting a corner crosses that corner's
// square diagonal — the midpoint of the relevant diamond edge, by symmetry.
const CROSS = { tl: [85, 85], tr: [235, 85], br: [235, 235], bl: [85, 235] } as const;

function pts(points: readonly (readonly [number, number])[]): string {
  return points.map(([x, y]) => `${x},${y}`).join(" ");
}

const HOUSE_SHAPES: { points: string; labelX: number; labelY: number }[] = [
  { points: pts([MID.top, CROSS.tr, CENTER, CROSS.tl]), labelX: 160, labelY: 85 }, // House 1
  { points: pts([SQUARE.tr, CROSS.tr, MID.top]), labelX: 235, labelY: 35 }, // House 2
  { points: pts([SQUARE.tr, MID.right, CROSS.tr]), labelX: 285, labelY: 85 }, // House 3
  { points: pts([MID.right, CROSS.br, CENTER, CROSS.tr]), labelX: 235, labelY: 160 }, // House 4
  { points: pts([SQUARE.br, CROSS.br, MID.right]), labelX: 285, labelY: 235 }, // House 5
  { points: pts([SQUARE.br, MID.bottom, CROSS.br]), labelX: 235, labelY: 285 }, // House 6
  { points: pts([MID.bottom, CROSS.bl, CENTER, CROSS.br]), labelX: 160, labelY: 235 }, // House 7
  { points: pts([SQUARE.bl, MID.bottom, CROSS.bl]), labelX: 85, labelY: 285 }, // House 8
  { points: pts([SQUARE.bl, CROSS.bl, MID.left]), labelX: 35, labelY: 235 }, // House 9
  { points: pts([MID.left, CROSS.tl, CENTER, CROSS.bl]), labelX: 85, labelY: 160 }, // House 10
  { points: pts([SQUARE.tl, CROSS.tl, MID.left]), labelX: 35, labelY: 85 }, // House 11
  { points: pts([SQUARE.tl, MID.top, CROSS.tl]), labelX: 85, labelY: 35 }, // House 12
];

export default function VedicChartSvg({ houses }: VedicChartSvgProps) {
  const byNumber = new Map(houses.map((h) => [h.houseNumber, h]));

  return (
    <svg viewBox="0 0 320 320" role="img" aria-label="Vedic birth chart, North Indian style" className="w-full h-auto">
      <rect x="0" y="0" width="320" height="320" fill="none" />
      {/* Outer square + both diagonals + inner diamond, drawn once as the grid */}
      <polygon
        points={pts([SQUARE.tl, SQUARE.tr, SQUARE.br, SQUARE.bl])}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-white/40"
      />
      <line x1={SQUARE.tl[0]} y1={SQUARE.tl[1]} x2={SQUARE.br[0]} y2={SQUARE.br[1]} stroke="currentColor" strokeWidth="1" className="text-white/25" />
      <line x1={SQUARE.tr[0]} y1={SQUARE.tr[1]} x2={SQUARE.bl[0]} y2={SQUARE.bl[1]} stroke="currentColor" strokeWidth="1" className="text-white/25" />
      <polygon
        points={pts([MID.top, MID.right, MID.bottom, MID.left])}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="text-white/25"
      />

      {HOUSE_SHAPES.map((shape, i) => {
        const houseNumber = (i + 1) as ChartHouse["houseNumber"];
        const house = byNumber.get(houseNumber);
        return (
          <g key={houseNumber}>
            <polygon points={shape.points} fill="transparent" />
            <text
              x={shape.labelX}
              y={shape.labelY - 10}
              textAnchor="middle"
              className="fill-white/40"
              style={{ fontSize: "9px" }}
            >
              {house?.signNumber}
            </text>
            {house?.isLagna && (
              <text
                x={shape.labelX}
                y={shape.labelY - 20}
                textAnchor="middle"
                className="fill-gold"
                style={{ fontSize: "9px", fontWeight: 600 }}
              >
                Asc
              </text>
            )}
            {house && house.planetAbbreviations.length > 0 && (
              <text
                x={shape.labelX}
                y={shape.labelY + 6}
                textAnchor="middle"
                className="fill-accentBlue"
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {house.planetAbbreviations.join(" ")}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
