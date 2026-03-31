"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { XCircle, CheckCircle } from "lucide-react";

const beforeItemsEN = [
  "Leads arrive over WhatsApp and email. Some get followed up. Some do not.",
  "Job status exists in someone's head or in a spreadsheet nobody updates.",
  "A new client request requires checking three tools and asking two people.",
  "Growth means hiring someone to manage the coordination.",
];

const afterItemsEN = [
  "Every inquiry is captured, logged, and routed automatically.",
  "Job status is visible to everyone without anyone updating it manually.",
  "A new client request triggers a structured flow from the first message.",
  "Growth does not require adding people to manage the process.",
];

const beforeItemsFR = [
  "Les leads arrivent par WhatsApp et email. Certains sont relancés. D'autres non.",
  "L'état des missions existe dans la tête de quelqu'un ou dans un tableur que personne ne tient à jour.",
  "Une nouvelle demande client nécessite de consulter trois outils et d'interroger deux personnes.",
  "La croissance signifie embaucher quelqu'un pour gérer la coordination.",
];

const afterItemsFR = [
  "Chaque demande est capturée, enregistrée et orientée automatiquement.",
  "L'état des missions est visible pour tous, sans mise à jour manuelle.",
  "Une nouvelle demande client déclenche un flux structuré dès le premier message.",
  "La croissance ne nécessite plus d'embaucher pour gérer les processus.",
];

export default function BeforeAfter() {
  const locale = useLocale();
  const isFR = locale === "fr";

  const beforeItems = isFR ? beforeItemsFR : beforeItemsEN;
  const afterItems = isFR ? afterItemsFR : afterItemsEN;
  const beforeLabel = isFR ? "Avant" : "Before";
  const afterLabel = isFR ? "Après" : "After";
  const closingLine = isFR
    ? "L'entreprise n'a pas changé. Le système derrière elle, oui."
    : "The business did not change. The system behind it did.";

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]">
            <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              {beforeLabel}
            </h3>
            <ul className="space-y-3">
              {beforeItems.map((item, i) => (
                <li key={i} className="text-sm text-[var(--dd-text-muted)] leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="p-6 rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)]">
            <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {afterLabel}
            </h3>
            <ul className="space-y-3">
              {afterItems.map((item, i) => (
                <li key={i} className="text-sm text-[var(--dd-text-muted)] leading-relaxed flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing line */}
        <p className="text-center text-[var(--dd-text-main)] font-medium mt-8 text-lg">
          {closingLine}
        </p>
      </div>
    </section>
  );
}
