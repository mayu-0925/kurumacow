import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamicParams = false;
import { getAllSlugs, getArticleBySlug, getAllArticles } from "@/lib/articles";
import ArticleBody from "@/components/ArticleBody";
import ArticleSidebar from "@/components/ArticleSidebar";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt },
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

  return (
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
        </article>

        {/* サイドバー */}
        <div className="hidden md:block">
          <div className="sticky top-20">
            <ArticleSidebar relatedArticles={related} />
          </div>
        </div>
      </div>
    </div>
  );
}
