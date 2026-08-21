import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

const captionStyle: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.5,
  color: "var(--text-muted)",
  marginTop: 10,
  fontStyle: "italic",
  transition: "color 450ms ease",
};

/**
 * Caption shown directly under any product screenshot that contains
 * demonstration figures, so the numbers are never read as client data.
 */
export default function ScreenshotDisclaimer({ style }: { style?: CSSProperties }) {
  const t = useTranslations("common");

  return <p style={{ ...captionStyle, ...style }}>{t("screenshotDisclaimer")}</p>;
}
