import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type AuditCTAProps = {
  headlineOverride?: string;
  bodyOverride?: string;
  noteOverride?: string;
  eyebrowOverride?: string;
  /** When true, renders destination-page CTA (Stripe link, startAudit label) */
  destination?: boolean;
};

const stripeLink = process.env.NEXT_PUBLIC_STRIPE_AUDIT_LINK || "#";

export default function AuditCTA({ headlineOverride, bodyOverride, noteOverride, eyebrowOverride, destination = false }: AuditCTAProps) {
  const t = useTranslations("common.auditCta");
  const tActions = useTranslations("common.actions");

  return (
    <section className="bg-bg-cta border-y border-border-cool py-[60px] max-md:py-[42px]">
      <div className="mx-auto max-w-[1240px] px-6 md:px-12 grid grid-cols-1 md:grid-cols-[1.35fr_1fr] gap-16 items-center max-md:gap-7">
        <div>
          <p className="text-[15px] text-ink-cool-label font-semibold tracking-[0.03em] mb-[22px] max-md:text-[14px]">
            {eyebrowOverride || t("eyebrow")}
          </p>
          <h2 className="text-[40px] font-medium leading-[1.12] tracking-[-0.02em] text-accent max-w-[580px] mb-6 max-md:text-[28px]">
            {headlineOverride || t("headline")}
          </h2>
          <div className="text-[19px] leading-[1.6] text-ink-cool max-w-[580px] max-md:text-base">
            {bodyOverride ? (
              <p>{bodyOverride}</p>
            ) : (
              <>
                <p className="mb-[14px]">{t("body1")}</p>
                <p>{t("body2")}</p>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 max-md:mt-2">
          {destination ? (
            <a
              href={stripeLink}
              className="group inline-flex items-center gap-2.5 px-[30px] py-[18px] bg-ink text-bg-cta text-[15px] font-medium rounded-lg hover:bg-accent transition-colors no-underline"
            >
              {tActions("startAudit")}
              <span
                aria-hidden="true"
                className="transition-transform duration-[180ms] group-hover:translate-x-[3px]"
              >
                →
              </span>
            </a>
          ) : (
            <Link
              href="/audit"
              className="group inline-flex items-center gap-2.5 px-[30px] py-[18px] bg-ink text-bg-cta text-[15px] font-medium rounded-lg hover:bg-accent transition-colors no-underline"
            >
              {tActions("discoverAudit")}
              <span
                aria-hidden="true"
                className="transition-transform duration-[180ms] group-hover:translate-x-[3px]"
              >
                →
              </span>
            </Link>
          )}
          <p className="text-[13px] text-ink-cool-muted">{noteOverride || t("note")}</p>
        </div>
      </div>
    </section>
  );
}
