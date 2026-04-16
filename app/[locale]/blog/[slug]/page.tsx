import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import AuditCTA from "@/components/shared/AuditCTA";
import SectionHeading from "@/components/shared/SectionHeading";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { metadata: {} as Record<string, string>, body: content };
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

type Block =
  | { type: "h2" | "h3" | "h4" | "p" | "blockquote" | "hr"; content: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "code"; content: string };

function markdownToBlocks(md: string): Block[] {
  const lines = md.trim().split("\n");
  const blocks: Block[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("#### ")) {
      blocks.push({ type: "h4", content: line.slice(5) });
      i++;
    } else if (line.startsWith("### ")) {
      blocks.push({ type: "h3", content: line.slice(4) });
      i++;
    } else if (line.startsWith("## ")) {
      blocks.push({ type: "h2", content: line.slice(3) });
      i++;
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push({ type: "code", content: codeLines.join("\n") });
    } else if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        quoteLines.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "blockquote", content: quoteLines.join(" ") });
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith("- ") || lines[i].startsWith("* "))) {
        items.push(lines[i].slice(2));
        i++;
      }
      blocks.push({ type: "ul", items });
    } else if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
    } else if (line.trim() === "---") {
      blocks.push({ type: "hr", content: "" });
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      const paraLines: string[] = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !lines[i].startsWith("## ") &&
        !lines[i].startsWith("### ") &&
        !lines[i].startsWith("#### ") &&
        !lines[i].startsWith("```") &&
        !lines[i].startsWith("> ") &&
        !lines[i].startsWith("- ") &&
        !lines[i].startsWith("* ") &&
        !/^\d+\.\s/.test(lines[i]) &&
        lines[i].trim() !== "---"
      ) {
        paraLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: "p", content: paraLines.join(" ") });
    }
  }
  return blocks;
}

function renderInline(text: string) {
  const parts: (string | React.ReactElement)[] = [];
  // Handle **bold** and *italic* and `code`
  const regex = /\*\*(.*?)\*\*|\*(.*?)\*|`([^`]+)`/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1]) {
      parts.push(<strong key={match.index} className="font-medium text-ink">{match[1]}</strong>);
    } else if (match[2]) {
      parts.push(<em key={match.index}>{match[2]}</em>);
    } else if (match[3]) {
      parts.push(
        <code key={match.index} className="text-[15px] bg-bg-deep border border-border-default rounded px-1.5 py-0.5 font-mono">
          {match[3]}
        </code>
      );
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

const postsList = [
  { slug: "ai-business-operations-honest-guide", date: "March 2026", readTime: 6 },
  { slug: "why-nextjs-production-apps", date: "March 2026", readTime: 5 },
  { slug: "roi-workflow-automation-small-business", date: "March 2026", readTime: 5 },
  { slug: "saas-vs-custom-build", date: "March 2026", readTime: 7 },
  { slug: "web-system-not-just-a-website", date: "March 2026", readTime: 5 },
  { slug: "why-profitable-businesses-run-on-manual-work", date: "March 2026", readTime: 6 },
];

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  try {
    const title = t(`posts.${slug}.title`);
    const description = t(`posts.${slug}.excerpt`);
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article" as const,
        url: `https://www.deralis.digital/${locale}/blog/${slug}`,
        siteName: "Deralis Digital",
        locale: locale === "fr" ? "fr_FR" : "en_US",
        images: [
          {
            url: "https://www.deralis.digital/og-image.png",
            width: 1200,
            height: 630,
            alt: "Deralis Digital",
          },
        ],
      },
      twitter: {
        card: "summary_large_image" as const,
        title,
        description,
        images: ["https://www.deralis.digital/og-image.png"],
      },
    };
  } catch {
    return { title: "Blog Post" };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!/^[a-z0-9-]+$/.test(slug)) notFound();

  const localePath = path.join(process.cwd(), "content", "blog", locale, `${slug}.md`);
  const defaultPath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  const filePath = fs.existsSync(localePath) ? localePath : defaultPath;
  if (!fs.existsSync(filePath)) notFound();

  const raw = fs.readFileSync(filePath, "utf-8");
  const { metadata, body } = parseFrontmatter(raw);
  const blocks = markdownToBlocks(body);

  const t = await getTranslations({ locale, namespace: "blog" });
  const tPost = await getTranslations({ locale, namespace: "blogPost" });

  // Pick 3 other posts for the "more" strip
  const otherPosts = postsList.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      {/* Article hero */}
      <section className="pt-8 pb-0 max-md:pt-6">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="max-w-[820px]">
            <p className="text-[14px] text-ink-label font-semibold tracking-[0.03em] mb-7 max-md:text-[13px] max-md:mb-5">
              {metadata.date || "2026"}
              <span className="text-ink-3 font-normal mx-2.5">·</span>
              {metadata.readTime || "5 min read"}
            </p>
            <h1 className="text-[60px] leading-[1.05] font-medium tracking-[-0.025em] mb-8 max-w-[780px] max-md:text-[36px] max-md:mb-[22px]">
              {t(`posts.${slug}.title`)}
            </h1>
            <p className="text-[22px] font-medium leading-[1.5] text-ink max-w-[720px] mb-[52px] max-md:text-[18px] max-md:mb-9">
              {t(`posts.${slug}.excerpt`)}
            </p>
          </div>
        </div>
        <hr className="border-0 border-t border-border-warm mx-auto max-w-[1240px]" />
      </section>

      {/* Article body */}
      <section className="pt-14 pb-[60px] max-md:pt-9 max-md:pb-[42px]">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <div className="max-w-[680px]">
            {blocks.map((block, i) => {
              switch (block.type) {
                case "h2":
                  return (
                    <h2
                      key={i}
                      className={`text-[30px] leading-[1.2] font-medium tracking-[-0.018em] text-ink mb-5 max-md:text-[24px] ${
                        i === 0 || (i > 0 && blocks[i - 1]?.type === "hr") ? "mt-0" : "mt-14 max-md:mt-10"
                      }`}
                    >
                      {renderInline(block.content)}
                    </h2>
                  );
                case "h3":
                  return (
                    <h3 key={i} className="text-[22px] leading-[1.3] font-medium tracking-[-0.012em] text-ink mt-10 mb-4 max-md:text-[19px] max-md:mt-8">
                      {renderInline(block.content)}
                    </h3>
                  );
                case "h4":
                  return (
                    <h4 key={i} className="text-[17px] leading-[1.4] font-semibold text-ink-label tracking-[0.01em] mt-8 mb-3 max-md:text-base max-md:mt-[26px]">
                      {renderInline(block.content)}
                    </h4>
                  );
                case "p":
                  return (
                    <p key={i} className="text-[18px] leading-[1.7] text-ink mb-[22px] last:mb-0 max-md:text-[17px]">
                      {renderInline(block.content)}
                    </p>
                  );
                case "blockquote":
                  return (
                    <blockquote key={i} className="border-l-2 border-border-warm pl-7 my-8 max-md:pl-5 max-md:my-[26px]">
                      <p className="text-[19px] leading-[1.65] text-ink-2 italic max-md:text-[17px]">
                        {renderInline(block.content)}
                      </p>
                    </blockquote>
                  );
                case "ul":
                  return (
                    <ul key={i} className="mb-[22px] pl-6 text-[18px] leading-[1.7] text-ink max-md:text-[17px] list-disc marker:text-ink-3">
                      {block.items.map((item, j) => (
                        <li key={j} className="mb-2.5">{renderInline(item)}</li>
                      ))}
                    </ul>
                  );
                case "ol":
                  return (
                    <ol key={i} className="mb-[22px] pl-6 text-[18px] leading-[1.7] text-ink max-md:text-[17px] list-decimal marker:text-ink-3 marker:font-medium">
                      {block.items.map((item, j) => (
                        <li key={j} className="mb-2.5">{renderInline(item)}</li>
                      ))}
                    </ol>
                  );
                case "code":
                  return (
                    <pre key={i} className="bg-bg-deep border border-border-default rounded-lg p-[22px] my-7 overflow-x-auto max-md:p-[18px]">
                      <code className="text-[14px] leading-[1.65] text-ink font-mono max-md:text-[13px]">
                        {block.content}
                      </code>
                    </pre>
                  );
                case "hr":
                  return <hr key={i} className="border-0 border-t border-border-warm my-11 max-w-[80px]" />;
                default:
                  return null;
              }
            })}

            {/* Signature block */}
            <div className="mt-14 pt-8 border-t border-border-warm max-md:mt-10 max-md:pt-[26px]">
              <p className="text-[14px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
                {tPost("signatureBlock.eyebrow")}
              </p>
              <p className="text-[20px] font-medium text-ink leading-[1.3] mb-2.5 max-md:text-[18px]">
                {tPost("signatureBlock.name")}
              </p>
              <p className="text-base leading-[1.65] text-ink-2 mb-[18px] max-w-[600px] max-md:text-[15px]">
                {tPost("signatureBlock.bio")}
              </p>
              <Link
                href="/about"
                className="text-[15px] font-medium text-ink no-underline border-b border-ink pb-[2px] hover:text-accent hover:border-accent transition-colors"
              >
                {tPost("signatureBlock.linkLabel")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* More from the practice */}
      <section className="bg-bg-deep border-y border-border-default py-[60px] max-md:py-[42px]">
        <div className="mx-auto max-w-[1240px] px-6 md:px-12">
          <SectionHeading
            eyebrow={tPost("moreStrip.eyebrow")}
            title={tPost("moreStrip.title")}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 mt-2">
            {otherPosts.map((post, i) => (
              <div
                key={post.slug}
                className={`py-8 max-md:py-6 ${
                  i < 2 ? "md:pr-8 md:border-r md:border-border-default" : ""
                } ${i > 0 ? "md:pl-8" : ""} ${
                  i < 2 ? "max-md:border-b max-md:border-border-default" : ""
                }`}
              >
                <p className="text-[13px] text-ink-label tracking-[0.03em] font-semibold mb-3.5">
                  {post.date}
                </p>
                <h3 className="text-[20px] font-medium text-ink leading-[1.3] mb-3">
                  {t(`posts.${post.slug}.title`)}
                </h3>
                <p className="text-[15px] leading-[1.6] text-ink-2 mb-[18px]">
                  {t(`posts.${post.slug}.excerpt`)}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[14px] font-medium text-ink no-underline border-b border-ink pb-[2px] hover:text-accent hover:border-accent transition-colors"
                >
                  {tPost("moreStrip.readMore")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AuditCTA />
    </>
  );
}
