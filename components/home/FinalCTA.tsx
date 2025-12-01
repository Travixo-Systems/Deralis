import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="gradient-border p-8 lg:p-12 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5" />

          <div className="relative">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--dd-text-main)] mb-3">
              Ready to build something real?
            </h2>
            <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
              Let&apos;s talk about your project. Free consultation, no pressure.
              We&apos;ll discuss your goals and see if we&apos;re a good fit.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link href="/contact" className="btn-primary">
                Speak to an engineer
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:contact@deralis.digital"
                className="btn-secondary"
              >
                <Mail className="w-4 h-4" />
                contact@deralis.digital
              </a>
            </div>

            <p className="text-xs text-[var(--dd-text-dim)]">
              Typically respond within 24 hours • EN/FR bilingual
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}