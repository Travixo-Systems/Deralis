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
      className="text-[13px] text-ink-3 hover:text-ink transition-colors"
      aria-label={t("changeLanguage")}
    >
      {locale === "en" ? "EN / FR" : "FR / EN"}
    </button>
  );
}
