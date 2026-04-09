import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function SiteFooter() {
  const t = useTranslations("common");

  return (
    <footer className="bg-bg-footer mt-32">
      {/* Zone 1: Main */}
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-[40%_60%] gap-8 md:gap-12">
          {/* Brand block */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Image
                src="/logo-mark.png"
                alt="Deralis Digital"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span className="text-base font-medium text-ink">
                Deralis Digital
              </span>
            </div>
            <p className="text-[15px] text-ink-2 leading-relaxed max-w-xs">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Contact block */}
          <div className="space-y-2">
            <a
              href="mailto:contact&#64;deralis.digital"
              className="text-[15px] font-medium text-ink hover:underline"
            >
              contact&#64;deralis.digital
            </a>
            <p className="text-[15px] text-ink-2">
              {t("footer.location")}
            </p>
            <p className="text-[15px] text-ink-2">
              {t("footer.languages")}
            </p>
          </div>
        </div>
      </div>

      {/* Zone 2: Legal bar */}
      <div className="border-t border-border-warm">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
            <p className="text-[13px] text-ink-2">
              {t("footer.copyrightIndependent")}
            </p>
            <div className="flex gap-6">
              <Link
                href="/legal"
                className="text-[13px] text-ink-2 no-underline hover:text-ink hover:underline transition-colors"
              >
                {t("footer.legalLink")}
              </Link>
              <Link
                href="/privacy"
                className="text-[13px] text-ink-2 no-underline hover:text-ink hover:underline transition-colors"
              >
                {t("footer.privacyLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
