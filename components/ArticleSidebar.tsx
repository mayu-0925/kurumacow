import Link from "next/link";
import { services as allServices } from "@/lib/data";

const services = allServices.filter((s) => s.category !== "insurance");
import type { Article } from "@/lib/types";

export default function ArticleSidebar({ relatedArticles }: { relatedArticles: Article[] }) {
  return (
    <aside className="flex flex-col gap-5">
      {/* アフィリエイトバナー */}
      <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue-light rounded-xl p-5 text-center shadow-[0_4px_20px_rgba(70,130,180,0.14)]">
        <div className="text-4xl mb-2">🔍</div>
        <h3 className="text-[14px] font-bold text-white mb-2 leading-[1.5]">
          愛車の概算査定額を<br />今すぐ無料チェック
        </h3>
        <p className="text-[11px] text-white/88 mb-3 leading-[1.6]">
          最大20社がWEB上で入札。数十社からの電話ラッシュなし※で、乗り換え前の相場確認に最適。
        </p>
        <Link
          href={services[0].affiliateUrl}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-block bg-white text-brand-blue-dark font-bold text-[13px] px-4 py-2 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 transition"
        >
          無料で概算査定額を調べる
        </Link>
        <p className="text-[10px] text-white/60 mt-2">※最多で上位3社からの電話はあります</p>
      </div>

      {/* おすすめサービスランキング */}
      <div className="bg-white border border-[#dde5f0] rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-4 py-3 bg-brand-blue text-white text-[13px] font-bold tracking-wide">
          🏆 おすすめサービス比較
        </div>
        <div className="divide-y divide-[#dde5f0]">
          {services.map((s, i) => (
            <div key={s.rank} className="p-3 flex items-center gap-3">
              <span
                className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-bold shrink-0 border ${
                  i === 0
                    ? "bg-[rgba(212,166,0,0.12)] border-[#d4a600] text-[#856000]"
                    : i === 1
                    ? "bg-[rgba(120,120,120,0.1)] border-[#aaa] text-[#666]"
                    : "bg-[rgba(160,82,45,0.12)] border-[#a0522d] text-[#a0522d]"
                }`}
              >
                {s.rank}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-gray-900 truncate">{s.name}</p>
                <p className="text-xs text-gray-500">{s.price}</p>
              </div>
              <Link
                href={s.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs px-2 py-1 rounded-lg bg-brand-blue text-white font-bold shrink-0 hover:bg-brand-blue-dark transition"
              >
                公式へ
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 関連記事 */}
      {relatedArticles.length > 0 && (
        <div className="bg-white border border-[#dde5f0] rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center gap-2 px-4 py-3 bg-brand-blue text-white text-[13px] font-bold tracking-wide">
            📰 関連記事
          </div>
          <div className="divide-y divide-[#dde5f0]">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/blog/${a.slug}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#eef4fb] transition"
              >
                <span className="text-xl shrink-0">{a.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 line-clamp-2">{a.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.publishedAt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
