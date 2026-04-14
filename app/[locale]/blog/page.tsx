// TODO: FR translation pending. All 6 posts EN only. /fr/blog serves EN. Translate or add banner as a separate task.

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
