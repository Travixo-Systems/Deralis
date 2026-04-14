import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { CSSProperties } from "react";

export default function SiteFooter() {
  const t = useTranslations("common.footer");

  return (
    <>
      {/* ZONE 1: weighted brand + contact */}
      <div style={zone1Wrap}>
        <div style={zone1Inner} className="footer-zone1-grid">
          {/* Left: logo + wordmark + tagline */}
          <div>
            <Link href="/" style={logoLink}>
              <Image
                src="/logo-mark.png"
                alt=""
                width={22}
                height={22}
                style={{ width: 22, height: 22, borderRadius: 4, display: "block" }}
              />
              <span style={wordmark}>Deralis Digital</span>
            </Link>
            <p style={tagline}>{t("tagline")}</p>
          </div>

          {/* Right: contact details */}
          <div style={rightCol}>
            <a href={`mailto:${t("email")}`} style={emailLink}>
              {t("email")}
            </a>
            <p style={metaLine}>{t("location")}</p>
            <p style={metaLine}>{t("languages")}</p>
          </div>
        </div>
      </div>

      {/* ZONE 2: bare canvas strip — copyright + legal links */}
      <footer style={zone2Wrap}>
        <span style={{ fontWeight: 600, color: "var(--text-primary)", transition: "color 450ms ease" }}>
          {t("copyrightIndependent")}
        </span>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <Link
            href="/legal"
            style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 300ms ease" }}
          >
            {t("legalLink")}
          </Link>
          <Link
            href="/privacy"
            style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 300ms ease" }}
          >
            {t("privacyLink")}
          </Link>
        </div>
      </footer>
    </>
  );
}

const zone1Wrap: CSSProperties = {
  background: "var(--card-main)",
  borderTop: "1px solid var(--border-soft)",
  padding: "40px 0",
  transition: "background-color 450ms ease, border-color 450ms ease",
  marginTop: 22,
};

const zone1Inner: CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 28px",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 64,
};

const logoLink: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  textDecoration: "none",
  marginBottom: 16,
};

const wordmark: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "var(--text-primary)",
  transition: "color 450ms ease",
};

const tagline: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 13,
  lineHeight: 1.55,
  color: "var(--text-secondary)",
  maxWidth: "36ch",
  transition: "color 450ms ease",
};

const rightCol: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

const emailLink: CSSProperties = {
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--text-primary)",
  textDecoration: "none",
  transition: "color 300ms ease",
};

const metaLine: CSSProperties = {
  fontSize: 12,
  color: "var(--text-secondary)",
  transition: "color 450ms ease",
};

const zone2Wrap: CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "22px 28px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
  fontSize: 12,
  fontWeight: 500,
  color: "var(--text-muted)",
  transition: "color 450ms ease",
};
