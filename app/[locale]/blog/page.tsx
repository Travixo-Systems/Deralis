import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AuditCTA from "@/components/shared/AuditCTA";
import fs from "fs";
import path from "path";

type Props = {
  params: Promise<{ locale: string }>;
};

const slugs = [
  "ai-business-operations-honest-guide",
  "why-nextjs-production-apps",
  "roi-workflow-automation-small-business",
  "saas-vs-custom-build",
  "web-system-not-just-a-website",
  "why-profitable-businesses-run-on-manual-work",
];

function getPostMeta(slug: string) {
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { date: "", readTime: "" };
  const raw = fs.readFileSync(filePath, "utf-8");
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { date: "", readTime: "" };
  const fm: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      fm[line.slice(0, idx).trim()] = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
    }
  }
  return { date: fm.date || "", readTime: fm.readTime || "" };
}

const posts = slugs.map((slug) => ({ slug, ...getPostMeta(slug) }));

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.page" });
  const title = t("metadata.title");
  const description = t("metadata.description");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website" as const,
      url: `https://www.deralis.digital/${locale}/blog`,
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tPage = await getTranslations({ locale, namespace: "blog.page" });

  return (
    <>
      {/* Hero */}
      <section className="pt-14 pb-12 max-md:pt-10 max-md:pb-8">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="max-w-[820px]">
            <h1
              className="text-[56px] leading-[1.05] font-medium tracking-[-0.025em] mb-6 max-md:text-[36px] max-md:mb-5"
              dangerouslySetInnerHTML={{
                __html: `${tPage("hero.title")} <em>${tPage("hero.titleHighlight")}</em>`,
              }}
            />
            <p className="text-[20px] leading-[1.55] text-ink-2-soft max-w-[640px] max-md:text-[17px]">
              {tPage("hero.description")}
            </p>
          </div>
        </div>
      </section>

      {/* Post list */}
      <section className="pt-6 pb-20 max-md:pt-4 max-md:pb-12">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="max-w-[820px]">
            {posts.map((post, i) => (
              <article
                key={post.slug}
                className={`py-9 border-b border-border-default max-md:py-7 ${
                  i === 0 ? "pt-2" : ""
                } ${i === posts.length - 1 ? "border-b-0" : ""}`}
              >
                <p className="text-[13px] text-ink-3 font-medium tracking-[0.02em] mb-3.5 max-md:text-[12px] max-md:mb-3">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="text-[28px] leading-[1.22] font-medium tracking-[-0.015em] mb-3.5 max-w-[720px] max-md:text-[22px]">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-ink no-underline hover:text-accent transition-colors"
                  >
                    {t(`posts.${post.slug}.title`)}
                  </Link>
                </h2>
                <p className="text-base leading-[1.6] text-ink-2 max-w-[680px] max-md:text-[15px]">
                  {t(`posts.${post.slug}.excerpt`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
