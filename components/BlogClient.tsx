"use client";
import { useState } from "react";
import type { Article } from "@/lib/types";
import ArticleCard from "./ArticleCard";

const PAGE_SIZE = 9;

export default function BlogClient({ articles }: { articles: Article[] }) {
  const categories = ["すべて", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [cat, setCat] = useState("すべて");
  const [page, setPage] = useState(1);

  const filtered = cat === "すべて" ? articles : articles.filter((a) => a.category === cat);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* カテゴリフィルター */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button key={c} onClick={() => { setCat(c); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm font-bold transition ${
              cat === c ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* 件数 */}
      <p className="text-sm text-gray-500 mb-4">{filtered.length}件の記事</p>

      {/* グリッド */}
      {paged.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
          {paged.map((a) => <ArticleCard key={a.slug} article={a} />)}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-16">記事がありません</p>
      )}

      {/* ページネーション */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-bold transition ${
                page === p ? "bg-brand-blue text-white" : "bg-gray-100 text-gray-600 hover:bg-blue-50"
              }`}>
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
