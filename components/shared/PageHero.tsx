import DsCard from "@/components/shared/DsCard";
import RichText from "@/components/shared/RichText";
import type { CSSProperties, ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  subs?: string[];
  subs_strong_first?: boolean;
  children?: ReactNode;
};

const eyebrowStyle: CSSProperties = {
  fontSize: "var(--fs-eyebrow)",
  textTransform: "uppercase",
  letterSpacing: "0.14em",
  color: "var(--text-muted)",
  marginBottom: 26,
  fontWeight: 600,
  transition: "color 450ms ease",
};

const h1Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: "var(--fs-h1)",
  fontWeight: 500,
  lineHeight: 1.02,
  letterSpacing: "-0.02em",
  marginBottom: 36,
  maxWidth: "20ch",
};

const subheadStackStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
  marginBottom: 32,
  maxWidth: "52ch",
};

const subheadPStyle: CSSProperties = {
  fontSize: "var(--fs-subhead)",
  lineHeight: 1.5,
  color: "var(--text-secondary)",
  transition: "color 450ms ease",
};

export default function PageHero({ eyebrow, title, subs = [], subs_strong_first = false, children }: PageHeroProps) {
  return (
    <DsCard>
      {eyebrow && <p style={eyebrowStyle}>{eyebrow}</p>}
      <h1 style={h1Style} className="hero-h1-responsive">
        <RichText html={title} />
      </h1>
      {subs.length > 0 && (
        <div style={subheadStackStyle}>
          {subs.map((s, i) => (
            <p key={i} style={{
              ...subheadPStyle,
              color: subs_strong_first && i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
              fontWeight: subs_strong_first && i === 0 ? 500 : 400,
            }}>
              <RichText html={s} />
            </p>
          ))}
        </div>
      )}
      {children}
    </DsCard>
  );
}
