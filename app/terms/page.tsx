import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Deralis Digital — conditions for using our website and services.",
};

export default function TermsPage() {
  return (
    <section className="pt-24 pb-16 lg:pt-28 lg:pb-20">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--dd-text-main)] mb-4">
          Terms of Service
        </h1>
        <p className="text-[var(--dd-text-dim)] mb-8">
          Last updated: January 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-[var(--dd-text-muted)]">
          <p className="text-lg">
            These Terms govern your use of the website deralis.digital and any services provided by 
            Deralis Digital (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;). By accessing our website or contacting us, 
            you agree to these Terms.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              1. Use of the website
            </h2>
            <p className="mb-3">
              You may browse this website for informational purposes. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Attempt to breach the website&apos;s security</li>
              <li>Copy or reproduce content without permission</li>
              <li>Misuse contact forms or attempt spam</li>
              <li>Interfere with the site&apos;s functionality</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              2. Services
            </h2>
            <p className="mb-3">Deralis Digital provides:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Web system development</li>
              <li>Platform engineering</li>
              <li>Automation and integration</li>
              <li>Consulting and technical strategy</li>
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              A service relationship begins only after both parties agree in writing to a proposal or contract.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              3. Quotes & pricing
            </h2>
            <p className="mb-3">All proposals, quotes, and estimates:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Are valid for 30 days unless stated otherwise</li>
              <li>May change based on updated requirements</li>
              <li>Are not binding until formally accepted</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              4. Payment terms
            </h2>
            <p className="mb-3">
              Specific payment terms are defined in each project contract. Unless otherwise stated:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Consulting may require upfront payment</li>
              <li>Development projects may use milestone-based payments</li>
              <li>Work begins after initial payment is received</li>
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              Late payments may result in suspension of services.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              5. Intellectual property
            </h2>
            <p className="mb-3">Unless explicitly agreed:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>We retain ownership of development tools, internal libraries, and frameworks we use.</li>
              <li>The client receives full usage rights for all custom deliverables created specifically for their project.</li>
              <li>Third-party libraries remain licensed under their respective terms.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              6. Confidentiality
            </h2>
            <p>
              All project information shared between you and Deralis Digital is confidential and will 
              not be disclosed without consent, except when legally required.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              7. Limitation of liability
            </h2>
            <p className="mb-3">Deralis Digital is not liable for:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Business interruptions</li>
              <li>Loss of revenue</li>
              <li>Indirect or consequential damages</li>
              <li>Issues caused by third-party hosting providers, APIs, or services</li>
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              Liability is limited to the amount paid for services in the preceding 3 months.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              8. Termination
            </h2>
            <p>
              Both parties may terminate a project contract with written notice if obligations are not met. 
              Completed deliverables and pending payments remain due.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              9. Governing law
            </h2>
            <p>
              These Terms are governed by French law. Any dispute shall be handled by the competent 
              courts in France.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              10. Contact
            </h2>
            <p>
              For questions regarding these Terms:{" "}
              <a href="mailto:contact@deralis.digital" className="text-[var(--dd-accent)] hover:underline">
                contact@deralis.digital
              </a>
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}