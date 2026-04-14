"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";

export default function LanguageToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common.actions");

  const otherLocale = locale === "en" ? "fr" : "en";

  return (
    <button
      onClick={() => router.replace(pathname, { locale: otherLocale })}
      style={{
        fontSize: 12,
        color: "var(--text-muted)",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit",
        fontWeight: 500,
        padding: 0,
        transition: "color 300ms ease",
      }}
      aria-label={t("changeLanguage")}
    >
      {locale === "en" ? "EN / FR" : "FR / EN"}
    </button>
  );
}
