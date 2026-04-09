import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("common");

  return (
    <footer className="bg-bg-footer border-t border-border-warm pt-9 pb-[22px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 mb-7">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 mb-3 text-ink font-medium text-base tracking-[-0.01em] no-underline"
            >
              <span className="w-6 h-6 bg-ink rounded-[5px] shrink-0" />
              Deralis Digital
            </Link>
            <p className="text-sm leading-relaxed text-ink-2 max-w-[260px]">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[13px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
              {t("footer.navigation")}
            </h4>
            <ul className="list-none flex flex-col gap-2">
              <li>
                <Link href="/" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("nav.services")}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("nav.blog")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[13px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
              {t("footer.services")}
            </h4>
            <ul className="list-none flex flex-col gap-2">
              <li>
                <Link href="/services#audit" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("footer.servicesList.audit")}
                </Link>
              </li>
              <li>
                <Link href="/services#custom" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("footer.servicesList.custom")}
                </Link>
              </li>
              <li>
                <Link href="/services#extensions" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("footer.servicesList.extensions")}
                </Link>
              </li>
              <li>
                <Link href="/services#ongoing" className="text-sm text-ink no-underline hover:text-accent transition-colors">
                  {t("footer.servicesList.ongoing")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="text-[13px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
              {t("footer.contact")}
            </h4>
            <p className="text-sm text-ink mb-1.5">
              <a
                href="mailto:contact&#64;deralis.digital"
                className="text-ink no-underline hover:text-accent transition-colors"
              >
                contact&#64;deralis.digital
              </a>
            </p>
            <p className="text-sm text-ink-2">{t("footer.location")}</p>
            <p className="text-sm text-ink-2 mt-3">{t("footer.languages")}</p>
          </div>
        </div>

        <div className="flex justify-between items-center pt-[18px] border-t border-border-warm text-[13px] text-ink-2 flex-wrap gap-4">
          <p>{t("footer.copyrightIndependent")}</p>
          <div className="flex gap-6">
            <Link href="/legal" className="text-ink-2 no-underline hover:text-ink transition-colors">
              {t("footer.legalLink")}
            </Link>
            <Link href="/privacy" className="text-ink-2 no-underline hover:text-ink transition-colors">
              {t("footer.privacyLink")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
