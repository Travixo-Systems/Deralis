import Link from "next/link";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = {
  navigation: [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  services: [
    { href: "/services#consulting", label: "Strategic Consulting" },
    { href: "/services#development", label: "Web Development" },
    { href: "/services#ai", label: "AI Integration" },
    { href: "/services#automation", label: "Automation" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
    { href: "/legal", label: "Legal Notice" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[var(--dd-bg-soft)] border-t border-[var(--dd-border)]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--dd-grad-from)] to-[var(--dd-grad-to)] flex items-center justify-center font-bold text-[var(--dd-bg)] text-lg">
                D
              </div>
              <span className="font-semibold text-lg text-[var(--dd-text-main)]">
                Deralis Digital
              </span>
            </Link>
            <p className="text-[var(--dd-text-muted)] text-sm mb-6 leading-relaxed">
              Build. Modernize. Digitize.
              <br />
              Modern web development and digital transformation for businesses ready to scale.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/deralis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] flex items-center justify-center text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] hover:border-[var(--dd-accent)] transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/deralis"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] flex items-center justify-center text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] hover:border-[var(--dd-accent)] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/deralisdigital"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[var(--dd-bg-card)] border border-[var(--dd-border)] flex items-center justify-center text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] hover:border-[var(--dd-accent)] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-[var(--dd-text-main)] mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigation.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-[var(--dd-text-main)] mb-4">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-[var(--dd-text-main)] mb-4">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:contact@deralis.digital"
                  className="flex items-center gap-3 text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 text-[var(--dd-accent)]" />
                  contact@deralis.digital
                </a>
              </li>
              <li>
                <a
                  href="tel:+33600000000"
                  className="flex items-center gap-3 text-[var(--dd-text-muted)] hover:text-[var(--dd-text-main)] text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-[var(--dd-accent)]" />
                  +33 6 00 00 00 00
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-[var(--dd-text-muted)] text-sm">
                  <MapPin className="w-4 h-4 text-[var(--dd-accent)] mt-0.5" />
                  <span>Based in France - Working Worldwide</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--dd-border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--dd-text-dim)] text-sm">
            © {new Date().getFullYear()} Deralis Digital. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--dd-text-dim)] hover:text-[var(--dd-text-muted)] text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
