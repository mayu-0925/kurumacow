import Link from "next/link";
import type { Article } from "@/lib/types";

const catColors: Record<string, string> = {
  "EV": "bg-[#2e7d4f]",
  "自動車保険": "bg-brand-red",
  "ランキング": "bg-[#856000]",
  "ミニバン": "bg-[#7b2d8b]",
  "カーリース": "bg-brand-blue",
  "SUV": "bg-brand-blue-dark",
  "中古車": "bg-brand-warm",
  "節約術": "bg-[#2e7d4f]",
};

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const catColor = catColors[article.category] ?? "bg-brand-blue";

  return (
    <Link
      href={`/blog/${article.slug}`}
      className={`group bg-white border border-[#dde5f0] rounded-xl overflow-hidden card-pop flex ${
        featured ? "col-span-2 flex-col sm:flex-row" : "flex-col"
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`bg-gradient-to-br from-brand-sky to-brand-sky-dark flex items-center justify-center relative shrink-0 overflow-hidden ${
          featured ? "h-[160px] sm:w-[260px] sm:h-auto" : "h-[150px]"
        }`}
      >
        <span className={featured ? "text-[60px]" : "text-[44px]"}>{article.emoji}</span>
        <span
          className={`absolute top-2.5 left-2.5 ${catColor} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-xl tracking-wide`}
        >
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className={`flex flex-col flex-1 ${featured ? "p-5" : "p-4"}`}>
        <h3
          className={`font-bold text-gray-900 leading-[1.55] mb-2 group-hover:text-brand-blue transition ${
            featured ? "text-base" : "text-sm"
          }`}
        >
          {article.title}
        </h3>
        <p className="text-xs text-gray-500 leading-[1.7] flex-1 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#dde5f0]">
          <span className="text-[11px] text-gray-500">{article.publishedAt}</span>
          <span className="w-7 h-7 bg-[rgba(70,130,180,0.08)] border border-[rgba(70,130,180,0.3)] rounded-full flex items-center justify-center text-[13px] text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
