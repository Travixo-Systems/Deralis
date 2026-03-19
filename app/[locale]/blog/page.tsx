import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Clock, Tag } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.metadata" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

const blogPosts = [
  {
    slug: "why-profitable-businesses-run-on-manual-work",
    category: "strategy",
    date: "2026-03-19",
    readTime: 6,
    image: "/projects/travixo-dashboard.png",
  },
];

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });

  const categoryColors: Record<string, string> = {
    strategy: "from-emerald-400 to-cyan-400",
    development: "from-[var(--dd-grad-from)] to-[var(--dd-grad-to)]",
    automation: "from-purple-400 to-pink-400",
    ai: "from-amber-400 to-orange-400",
  };

  return (
    <>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-mesh">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--dd-text-main)] mb-4">
            {t("hero.title")}{" "}
            <span className="gradient-text">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="text-lg text-[var(--dd-text-muted)] max-w-2xl mx-auto">
            {t("hero.description")}
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-xl bg-[var(--dd-bg-card)] border border-[var(--dd-border)] overflow-hidden card-hover"
              >
                {/* Image */}
                <div className="aspect-[16/9] relative bg-[var(--dd-bg-soft)] overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--dd-bg-card)] to-transparent opacity-60" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[post.category] || categoryColors.strategy} text-[var(--dd-bg)]`}>
                      <Tag className="w-3 h-3" />
                      {t(`categories.${post.category}`)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-[var(--dd-text-main)] mb-2 group-hover:text-[var(--dd-accent)] transition-colors line-clamp-2">
                    {t(`posts.${post.slug}.title`)}
                  </h2>
                  <p className="text-sm text-[var(--dd-text-muted)] mb-4 line-clamp-2">
                    {t(`posts.${post.slug}.excerpt`)}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-[var(--dd-text-dim)]">
                      <span>{new Date(post.date).toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[var(--dd-text-dim)] group-hover:text-[var(--dd-accent)] transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="gradient-border p-8 lg:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--dd-grad-from)]/5 to-[var(--dd-grad-to)]/5" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--dd-text-main)] mb-3">
                {t("cta.title")}
              </h2>
              <p className="text-[var(--dd-text-muted)] max-w-xl mx-auto mb-6">
                {t("cta.description")}
              </p>
              <Link href="/contact" className="btn-primary">
                {t("cta.button")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
