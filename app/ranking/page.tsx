import type { Metadata } from "next";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/lib/data";
import { currentYearMonth } from "@/lib/date";

export const metadata: Metadata = {
  title: "車買取サービス比較ランキング",
  description: "MOTA車買取・ユーポス・セルカなど主要買取サービスを徹底比較。乗り換え前に一括査定で最高額を引き出す方法を解説。",
};

export default function RankingPage() {
  return (
    <>
      <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-black mb-2">🏆 車買取サービス比較ランキング</h1>
          <p className="text-white/80 text-sm">{currentYearMonth()} 最新版 ・ 乗り換え前に必ずチェック</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {services.map((s) => (
            <ServiceCard key={s.rank} service={s} priority={s.rank === 1} />
          ))}
        </div>

        {/* 比較表 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-brand-blue px-5 py-3">
            <p className="text-white font-bold">📊 サービス詳細比較</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-blue-50">
                  <th className="px-4 py-3 text-left font-bold text-gray-700">比較項目</th>
                  {services.map((s) => (
                    <th key={s.rank} className="px-4 py-3 text-center font-bold text-gray-700">{s.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "月額・費用", values: services.map((s) => s.price) },
                  { label: "主な特徴", values: services.map((s) => s.point) },
                  { label: "特典・還元", values: services.map((s) => `${s.reward.label}${s.reward.value}`) },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                    <td className="px-4 py-3 font-bold text-gray-700 border-t border-gray-100">{row.label}</td>
                    {row.values.map((v, j) => (
                      <td key={j} className="px-4 py-3 text-center border-t border-gray-100 text-gray-700">{v}</td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3 font-bold text-gray-700 border-t border-gray-100">申し込み</td>
                  {services.map((s) => (
                    <td key={s.rank} className="px-4 py-3 text-center border-t border-gray-100">
                      <a href={s.affiliateUrl} target="_blank" rel="noopener noreferrer"
                        className={`inline-block text-xs px-3 py-1.5 rounded-lg text-white font-bold ${s.ctaColor}`}>
                        {s.ctaText}
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          ※ 掲載情報は執筆時点のものです。最新情報は各サービスの公式サイトをご確認ください。<br />
          当サイトはアフィリエイト広告を掲載しています。
        </p>
      </div>
    </>
  );
}
