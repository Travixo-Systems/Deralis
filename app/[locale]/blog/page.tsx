// Blog posts localized via messages/{locale}.json -> blog.posts[slug].
// Frontmatter = structure SoT (date, readTime, featured, category key).
// Locale files = content SoT (title, excerpt, category label).
// Missing slug in locale -> loader falls back to frontmatter + logs warning.

import { setRequestLocale, getTranslations } from "next-intl/server";
import BlogHeroCard from "@/components/blog/BlogHeroCard";
import FeaturedPostCard from "@/components/blog/FeaturedPostCard";
import PostListCard from "@/components/blog/PostListCard";
import BlogAuditCtaCard from "@/components/blog/BlogAuditCtaCard";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.page.metadata" });
  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website" as const,
      url: `https://www.deralis.digital/${locale}/blog`,
      images: [
        {
          url: "https://www.deralis.digital/og-image.png",
          width: 1200,
          height: 630,
          alt: "Deralis Digital",
        },
      ],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <BlogHeroCard />
      <FeaturedPostCard />
      <PostListCard />
      <BlogAuditCtaCard />
    </>
  );
}
