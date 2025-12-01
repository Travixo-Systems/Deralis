import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Notice",
  description: "Legal Notice for Deralis Digital — French law compliance (LCEN).",
};

export default function LegalPage() {
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
          Legal Notice
        </h1>
        <p className="text-[var(--dd-text-dim)] mb-8">
          In accordance with French law n° 2004-575 (LCEN), Articles 6-III and 19
        </p>

        <div className="prose prose-invert max-w-none space-y-8 text-[var(--dd-text-muted)]">
          {/* Site Publisher */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              Site Publisher
            </h2>
            <ul className="list-none space-y-2">
              <li>
                <strong className="text-[var(--dd-text-main)]">Business Name:</strong> Deralis Digital
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">Legal Form:</strong> Individual business / Web development and digital services
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">Address:</strong> Available upon official request
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">Email:</strong>{" "}
                <a href="mailto:contact@deralis.digital" className="text-[var(--dd-accent)] hover:underline">
                  contact@deralis.digital
                </a>
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">Publication Director:</strong> Deralis Digital
              </li>
            </ul>
          </section>

          {/* Hosting */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              Hosting Provider
            </h2>
            <ul className="list-none space-y-2">
              <li>
                <strong className="text-[var(--dd-text-main)]">Provider:</strong> Vercel Inc.
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">Address:</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA
              </li>
              <li>
                <strong className="text-[var(--dd-text-main)]">Website:</strong>{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--dd-accent)] hover:underline"
                >
                  https://vercel.com
                </a>
              </li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              Intellectual Property
            </h2>
            <p>
              All content on this website (text, images, logos, design, code, etc.) is protected by copyright. 
              Reproduction, modification, or distribution without authorization is prohibited.
            </p>
          </section>

          {/* Liability */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              Liability
            </h2>
            <p>
              The publisher strives to ensure the accuracy of information on this website but cannot 
              guarantee the absence of errors. The site may contain external links; the publisher 
              disclaims any responsibility for their content.
            </p>
          </section>

          {/* Personal Data */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              Personal Data
            </h2>
            <p>
              Personal data processing is described in our{" "}
              <Link href="/privacy" className="text-[var(--dd-accent)] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-[var(--dd-text-main)] mb-4">
              Contact
            </h2>
            <p>
              For any inquiries:{" "}
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