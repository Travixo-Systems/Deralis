import type { CSSProperties } from "react";

type Node = {
  /** Centre x of the diamond in viewBox units. */
  x: number;
  label: string;
  /** Shown while the node is hovered or focused. */
  detail: string;
  stalled?: boolean;
};

type Props = {
  nodes: [Node, Node, Node, Node];
  stalledLabel: string;
  followUpLabel: string;
  title: string;
  style?: CSSProperties;
};

/** Diamond path centred on a point, sized like the originals. */
function diamond(x: number, y = 66, rx = 32, ry = 30) {
  return `M${x} ${y - ry} L${x + rx} ${y} L${x} ${y + ry} L${x - rx} ${y} Z`;
}

/**
 * A request moving between people, stalling at the approval step.
 *
 * A server component: inline SVG whose motion and interaction are entirely
 * CSS, so it ships no JavaScript. Each node is a focusable group, so the
 * figure can be explored with a pointer or a keyboard the same way the
 * process steps elsewhere on the page can.
 */
export default function CoordinationDiagram({
  nodes,
  stalledLabel,
  followUpLabel,
  title,
  style,
}: Props) {
  return (
    <div className="coord-fig-scroll">
      <svg viewBox="0 0 720 210" role="img" aria-label={title} className="coord-fig" style={style}>
        <g className="fig">
          <path className="link" d="M128 66 H232" />
          <path className="link" d="M308 66 H412" />
          <path className="link" d="M488 66 H592" />

          <path className="link-fill link-fill-1" d="M128 66 H232" />
          <path className="link-fill link-fill-2" d="M308 66 H412" />

          <path className="accent return" d="M452 150 C 428 180, 296 180, 272 150" />
          <path className="accent" d="M272 150 l 4 10" />
          <path className="accent" d="M272 150 l 10 4" />
          <text className="muted" x="362" y="198" textAnchor="middle">
            {followUpLabel}
          </text>

          {nodes.map((n) => (
            <g
              key={n.label}
              className={`coord-node coord-node-${n.x} ${n.stalled ? "is-stalled" : ""}`}
              tabIndex={0}
              role="group"
              aria-label={`${n.label}. ${n.detail}`}
            >
              {/* Generous invisible hit area: the diamond itself is a thin
                  outline and would be fiddly to point at or tap. */}
              <rect
                className="coord-hit"
                x={n.x - 54}
                y={16}
                width={108}
                height={116}
                rx={8}
              />
              {n.stalled && <path className="pulse" d={diamond(n.x)} />}
              <path className={n.stalled ? "stall-node" : "node"} d={diamond(n.x)} />
              <text className="coord-label" x={n.x} y={116} textAnchor="middle">
                {n.label}
              </text>
              {n.stalled && (
                <text className="muted coord-stalled" x={n.x} y={140} textAnchor="middle">
                  {stalledLabel}
                </text>
              )}
              {/* Revealed on hover or focus. Sits above the row so it never
                  pushes the follow-up label around. */}
              <text className="coord-detail" x={n.x} y={20} textAnchor="middle">
                {n.detail}
              </text>
            </g>
          ))}

          <path className="dot" d="M0 -5 L5 0 L0 5 L-5 0 Z" />
        </g>
      </svg>
    </div>
  );
}
