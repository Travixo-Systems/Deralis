import DsCard from "@/components/shared/DsCard";
import type { CSSProperties, ReactNode } from "react";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

const h2Style: CSSProperties = {
  fontFamily: "var(--font-fraunces), Georgia, serif",
  fontSize: 24,
  fontWeight: 500,
  marginBottom: 20,
  color: "var(--text-primary)",
  letterSpacing: "-0.01em",
};

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <DsCard style={{ maxWidth: 820 }}>
      <h2 style={h2Style}>{title}</h2>
      {children}
    </DsCard>
  );
}
