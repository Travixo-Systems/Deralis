import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Deralis Digital — how we collect, use, and protect your personal data.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-[var(--dd-text-dim)] mb-8">
          Last updated: January 2025
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-[var(--dd-text-muted)]">
          <p className="text-lg">
            Deralis Digital (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is an independent engineering practice 
            providing web development and digital services. This Privacy Policy explains how we collect, 
            use, and protect your personal data when you visit deralis.digital or contact us.
          </p>

          {/* Section 1 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              1. Data we collect
            </h2>
            
            <h3 className="text-lg font-medium text-[var(--dd-text-main)] mb-2">
              1.1 Information you submit voluntarily
            </h3>
            <p className="mb-3">
              When you contact us through email or forms, we collect:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Name (if provided)</li>
              <li>Email address</li>
              <li>Company name (optional)</li>
              <li>Project details or message content</li>
            </ul>
            <p className="mb-6">This information is used solely to respond to your inquiry.</p>

            <h3 className="text-lg font-medium text-[var(--dd-text-main)] mb-2">
              1.2 Technical data
            </h3>
            <p className="mb-3">
              When you browse our website, basic technical information may be collected automatically:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>IP address (anonymized when possible)</li>
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Pages visited</li>
              <li>Date, time, and duration of visit</li>
            </ul>
            <p>This data is used for security, performance monitoring, and aggregated analytics.</p>
            <p className="mt-3 font-medium text-[var(--dd-text-main)]">
              We do not use advertising trackers, third-party marketing cookies, or profiling tools.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              2. How we use your data
            </h2>
            <p className="mb-3">Your data is used only for:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Responding to inquiries</li>
              <li>Preparing quotes and proposals</li>
              <li>Providing services when requested</li>
              <li>Website security and performance</li>
              <li>Legal compliance when required</li>
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              We do not sell, rent, or trade your personal data.
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              3. Legal basis (GDPR)
            </h2>
            <p className="mb-3">We process personal data based on:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-[var(--dd-text-main)]">Legitimate interest</strong> — responding to inquiries, improving website performance</li>
              <li><strong className="text-[var(--dd-text-main)]">Performance of a contract</strong> — when working together</li>
              <li><strong className="text-[var(--dd-text-main)]">Consent</strong> — if you choose to provide information</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              4. Data storage and retention
            </h2>
            <p className="mb-3">
              We store personal data securely in the EU or equivalent jurisdictions.
            </p>
            <p className="mb-3">Data is retained only as long as necessary:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-[var(--dd-text-main)]">Contact inquiries:</strong> up to 24 months</li>
              <li><strong className="text-[var(--dd-text-main)]">Project information:</strong> duration of the project + legal obligations</li>
              <li><strong className="text-[var(--dd-text-main)]">Analytics logs:</strong> typically 30–90 days depending on provider</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              5. Sharing your data
            </h2>
            <p className="mb-3">We only share data with:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Hosting providers (e.g., Vercel)</li>
              <li>Email providers (e.g., Gmail / Google Workspace)</li>
              <li>Tools required to deliver our services</li>
            </ul>
            <p className="mb-3">These providers comply with GDPR or offer equivalent protections.</p>
            <p className="font-medium text-[var(--dd-text-main)]">
              We do not share your information with third parties for marketing.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              6. Your rights (EU & GDPR)
            </h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Access your data</li>
              <li>Correct your data</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Request a copy of your data</li>
            </ul>
            <p>
              You may exercise these rights at:{" "}
              <a href="mailto:contact@deralis.digital" className="text-[var(--dd-accent)] hover:underline">
                contact@deralis.digital
              </a>
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              7. Cookies
            </h2>
            <p className="mb-3">The website uses minimal cookies:</p>
            <ul className="list-disc pl-6 space-y-1 mb-4">
              <li>Essential functional cookies</li>
              <li>Anonymous analytics cookies (if enabled)</li>
            </ul>
            <p className="font-medium text-[var(--dd-text-main)]">
              We do not use advertising cookies or trackers.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              8. Contact
            </h2>
            <p>
              If you have questions about this Privacy Policy, contact:{" "}
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