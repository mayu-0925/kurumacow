import type { Metadata } from "next";
import { getAllArticles } from "@/lib/articles";
import BlogClient from "@/components/BlogClient";

export const metadata: Metadata = {
  title: "記事一覧",
  description: "カーリース・自動車保険・車選びに役立つ記事を一覧で確認できます。",
};

export default function BlogPage() {
  const articles = getAllArticles();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-black text-gray-900 mb-2">📰 記事一覧</h1>
      <p className="text-sm text-gray-500 mb-8">カーライフに役立つ情報をお届けします</p>
      {articles.length === 0 ? (
        <p className="text-gray-400 text-center py-20">記事を準備中です。しばらくお待ちください。</p>
      ) : (
        <BlogClient articles={articles} />
      )}
    </div>
  );
}
