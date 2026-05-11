import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;
import { getAllSlugs, getArticleBySlug, getAllArticles } from "@/lib/articles";
import { getAuthorById } from "@/lib/authors";
import ArticleBody from "@/components/ArticleBody";
import AuthorCard from "@/components/AuthorCard";
import ArticleSidebar from "@/components/ArticleSidebar";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

const BASE_URL = "https://kurumacow.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  const url = `${BASE_URL}/blog/${slug}/`;
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url,
      type: "article",
      publishedTime: article.publishedAt,
      siteName: "KurumaCow",
      images: article.imageUrl
        ? [{ url: `${BASE_URL}${article.imageUrl}`, width: 1200, height: 630 }]
        : [{ url: `${BASE_URL}/logo.png`, width: 512, height: 512 }],
    },
    twitter: { card: "summary", title: article.title, description: article.excerpt },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 4);

  const author = article.authorId ? getAuthorById(article.authorId) : undefined;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    url: `${BASE_URL}/blog/${slug}`,
    image: article.imageUrl ? `${BASE_URL}${article.imageUrl}` : `${BASE_URL}/logo.png`,
    author: author
      ? { "@type": "Person", name: author.name, url: `${BASE_URL}/author/${author.id}` }
      : { "@type": "Organization", name: "KurumaCow編集部" },
    publisher: {
      "@type": "Organization",
      name: "KurumaCow",
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "記事一覧", item: `${BASE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${BASE_URL}/blog/${slug}` },
    ],
  };

  const faqBlocks = article.content?.filter((b) => b.type === "faq") as
    | { type: "faq"; items: { question: string; answer: string }[] }[]
    | undefined;
  const faqJsonLd = faqBlocks && faqBlocks.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqBlocks.flatMap((b) =>
          b.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          }))
        ),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <div className="max-w-5xl mx-auto px-4 py-10">
      {/* パンくず */}
      <nav className="text-xs text-gray-400 mb-6 flex gap-1 flex-wrap">
        <Link href="/" className="hover:text-brand-blue">ホーム</Link>
        <span>›</span>
        <Link href="/blog" className="hover:text-brand-blue">記事一覧</Link>
        <span>›</span>
        <span className="text-gray-600">{article.title}</span>
      </nav>

      <div className="grid md:grid-cols-[1fr_280px] gap-10">
        {/* メイン */}
        <article>
          <div className="mb-6">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-brand-blue text-white mb-3">
              {article.category}
            </span>
            <h1 className="text-2xl font-black text-gray-900 leading-snug mb-3">
              {article.emoji} {article.title}
            </h1>
            <p className="text-sm text-gray-400">公開日: {article.publishedAt}</p>
          </div>

          {article.content && article.content.length > 0 ? (
            <ArticleBody blocks={article.content} />
          ) : (
            <p className="text-gray-400 py-10 text-center">この記事は現在準備中です。</p>
          )}

          {author && <AuthorCard author={author} />}
        </article>

        {/* サイドバー */}
        <div className="hidden md:block">
          <div className="sticky top-20">
            <ArticleSidebar relatedArticles={related} />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
