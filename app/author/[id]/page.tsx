import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { authors, getAuthorById } from "@/lib/authors";
import { getAllArticles } from "@/lib/articles";

export const dynamicParams = false;

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return authors.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const author = getAuthorById(id);
  if (!author) return {};
  return {
    title: `${author.name}（${author.role}）| KurumaCow`,
    description: author.bio,
  };
}

const BASE_URL = "https://kurumacow.com";

export default async function AuthorPage({ params }: Props) {
  const { id } = await params;
  const author = getAuthorById(id);
  if (!author) notFound();

  const articles = getAllArticles().filter((a) => a.authorId === id);

  const authorJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${BASE_URL}/author/${author.id}`,
    knowsAbout: author.expertise,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(authorJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* パンくず */}
        <nav className="text-xs text-gray-400 mb-8 flex gap-1">
          <Link href="/" className="hover:text-brand-blue">ホーム</Link>
          <span>›</span>
          <span className="text-gray-600">著者プロフィール</span>
        </nav>

        {/* プロフィールカード */}
        <div className="bg-white border border-[#dde5f0] rounded-2xl p-8 shadow-sm mb-10">
          <div className="flex gap-6 items-start mb-6">
            <div className={`w-20 h-20 rounded-full ${author.avatarColor} text-white flex items-center justify-center text-3xl font-black shadow shrink-0`}>
              {author.avatarInitials}
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900 mb-1">{author.name}</p>
              <p className="text-sm text-brand-blue font-bold mb-3">{author.role}</p>
              <div className="flex flex-wrap gap-1.5">
                {author.credentials.map((c) => (
                  <span key={c} className="text-xs px-3 py-1 rounded-full bg-blue-50 text-brand-blue border border-blue-100 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-6">{author.bio}</p>

          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">専門分野</p>
            <div className="flex flex-wrap gap-2">
              {author.expertise.map((e) => (
                <span key={e} className="text-sm px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-gray-700">
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 執筆記事一覧 */}
        {articles.length > 0 && (
          <div>
            <h2 className="text-lg font-black text-gray-900 mb-4 border-l-4 border-brand-blue pl-3">
              {author.name}の執筆記事
            </h2>
            <div className="space-y-3">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="flex items-center gap-3 bg-white border border-[#dde5f0] rounded-xl px-4 py-3 hover:bg-blue-50 transition"
                >
                  <span className="text-2xl shrink-0">{a.emoji}</span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{a.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{a.publishedAt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
