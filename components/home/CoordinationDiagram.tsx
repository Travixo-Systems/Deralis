import type { CSSProperties } from "react";

type Props = {
  /** Node labels, in flow order. Supplied by the caller so they stay translated. */
  labels: [string, string, string, string];
  /** Short caption under the stalled node. */
  stalledLabel: string;
  /** Label on the return arrow. */
  followUpLabel: string;
  /** Read out to assistive tech in place of the drawing. */
  title: string;
  style?: CSSProperties;
};

/**
 * A request moving between people, stalling at the approval step.
 *
 * A server component: the figure is inline SVG and all of its motion is CSS,
 * so it ships no JavaScript. Colours come from the host section's custom
 * properties, which is what lets one drawing work on both the light and the
 * dark surface.
 */
export default function CoordinationDiagram({
  labels,
  stalledLabel,
  followUpLabel,
  title,
  style,
}: Props) {
  return (
    <div className="coord-fig-scroll">
      <svg
      viewBox="0 0 720 210"
      role="img"
      aria-label={title}
      className="coord-fig"
      style={style}
    >
      <title>{title}</title>
      <g className="fig">
        {/* Each segment is drawn twice: a resting rule, and an accent copy on
            top that draws itself in as the request reaches that step. The
            last one stays grey, because delivery is the step the request
            never gets to. */}
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

        <path className="node" d="M90 36 L122 66 L90 96 L58 66 Z" />
        <path className="node" d="M270 36 L302 66 L270 96 L238 66 Z" />
        <path className="pulse" d="M450 36 L482 66 L450 96 L418 66 Z" />
        <path className="stall-node" d="M450 36 L482 66 L450 96 L418 66 Z" />
        <path className="node" d="M630 36 L662 66 L630 96 L598 66 Z" />

        {/* The travelling request. A small diamond so it belongs to the same
            visual family as the nodes it moves between. */}
        <path className="dot" d="M0 -5 L5 0 L0 5 L-5 0 Z" />

        <text x="90" y="116" textAnchor="middle">{labels[0]}</text>
        <text x="270" y="116" textAnchor="middle">{labels[1]}</text>
        <text x="450" y="116" textAnchor="middle">{labels[2]}</text>
        <text x="630" y="116" textAnchor="middle">{labels[3]}</text>
        <text className="muted" x="450" y="140" textAnchor="middle">
          {stalledLabel}
        </text>
        </g>
      </svg>
    </div>
  );
}
