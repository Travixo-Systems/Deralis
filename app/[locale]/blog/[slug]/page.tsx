import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { ArrowLeft, Clock, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {}, body: content };

  const metadata: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx > 0) {
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      metadata[key] = value;
    }
  }
  return { metadata, body: match[2] };
}

function markdownToBlocks(md: string) {
  const lines = md.trim().split("\n");
  const blocks: { type: string; content: string; level?: number }[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", content: line.slice(3) });
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", content: line.slice(4) });
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      // Collect paragraph lines
      const paraLines: string[] = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].startsWith("## ") && !lines[i].startsWith("### ")) {
        paraLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "p", content: paraLines.join(" ") });
    }
  }

  return blocks;
}

function renderInlineMarkdown(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  const regex = /\*\*(.*?)\*\*/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <strong key={match.index} className="font-semibold text-[var(--dd-text-main)]">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  try {
    return {
      title: t(`posts.${slug}.title`),
      description: t(`posts.${slug}.excerpt`),
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Read the markdown file
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const blocks = markdownToBlocks(body);

  const t = await getTranslations({ locale, namespace: "blog" });

  const categoryColors: Record<string, string> = {
    strategy: "from-emerald-400 to-cyan-400",
    development: "from-[var(--dd-grad-from)] to-[var(--dd-grad-to)]",
    automation: "from-purple-400 to-pink-400",
    ai: "from-amber-400 to-orange-400",
  };

  const category = (metadata.category || "strategy").toLowerCase();

  return (
    <>
      {/* Header */}
      <section className="pt-10 pb-4 lg:pt-12 lg:pb-6 bg-mesh">
        <div className="max-w-[850px] mx-auto px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[var(--dd-text-muted)] hover:text-[var(--dd-accent)] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[category] || categoryColors.strategy} text-[var(--dd-bg)]`}
            >
              <Tag className="w-3 h-3" />
              {t(`categories.${category}`)}
            </span>
            <span className="flex items-center gap-1 text-xs text-[var(--dd-text-dim)]">
              <Clock className="w-3 h-3" />
              {metadata.readTime || "6 min read"}
            </span>
            <span className="text-xs text-[var(--dd-text-dim)]">
              {metadata.date
                ? new Date(metadata.date).toLocaleDateString(
                    locale === "fr" ? "fr-FR" : "en-US",
                    { month: "long", day: "numeric", year: "numeric" }
                  )
                : ""}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--dd-text-main)] leading-tight">
            {metadata.title || t(`posts.${slug}.title`)}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <section className="pt-2 pb-10 lg:pt-3 lg:pb-14">
        <div className="max-w-[850px] mx-auto px-6 lg:px-8">
          <article className="prose-custom">
            {blocks.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className={`text-xl sm:text-2xl font-bold text-[var(--dd-text-main)] mb-4 ${i === 0 ? "mt-0" : "mt-10"}`}
                  >
                    {block.content}
                  </h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <h3
                    key={i}
                    className="text-lg sm:text-xl font-semibold text-[var(--dd-text-main)] mt-8 mb-3"
                  >
                    {block.content}
                  </h3>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[var(--dd-text-muted)] leading-relaxed mb-5"
                >
                  {renderInlineMarkdown(block.content)}
                </p>
              );
            })}
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-[var(--dd-bg-soft)]">
        <div className="max-w-[850px] mx-auto px-6 lg:px-8">
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
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
