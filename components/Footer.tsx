import Link from "next/link";
import { currentYear } from "@/lib/date";

export default function Footer() {
  return (
    <footer className="bg-brand-blue-dark border-t border-white/10 mt-5">
      <div className="max-w-[1280px] mx-auto px-7 pt-12 pb-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="KurumaCow" className="w-8 h-8 object-contain" />
              <p className="text-xl font-black text-white tracking-wide">
                Kuruma<span className="text-brand-sky">Cow</span>
              </p>
            </div>
            <p className="text-[13px] text-white/60 leading-relaxed max-w-xs">
              自動車専門のアフィリエイトメディア。カーリース・自動車保険の比較から最新モデルのレビューまで、クルマ選びに役立つ情報をお届けします。
            </p>
          </div>

          {/* カテゴリ */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3.5 pb-2 border-b border-white/15 tracking-wide">
              カテゴリ
            </h4>
            <ul className="flex flex-col gap-2.5">
              {["SUV", "電気自動車", "軽自動車", "ミニバン", "カーリース"].map((c) => (
                <li key={c}>
                  <Link
                    href={`/blog?cat=${encodeURIComponent(c)}`}
                    className="text-[13px] text-white/60 hover:text-brand-sky transition"
                  >
                    {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サービス比較 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3.5 pb-2 border-b border-white/15 tracking-wide">
              サービス比較
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "カーリース比較", href: "/ranking" },
                { label: "自動車保険比較", href: "/ranking" },
                { label: "中古車査定", href: "/ranking" },
                { label: "ランキング", href: "/ranking" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/60 hover:text-brand-sky transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報 */}
          <div>
            <h4 className="text-sm font-bold text-white mb-3.5 pb-2 border-b border-white/15 tracking-wide">
              サイト情報
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "このサイトについて", href: "/about" },
                { label: "プライバシーポリシー", href: "/privacy" },
                { label: "免責事項", href: "/disclaimer" },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-[13px] text-white/60 hover:text-brand-sky transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-[12px] text-white/45">
          <span>© {currentYear()} KurumaCow. All rights reserved.</span>
          <span>※本サイトはアフィリエイト広告を掲載しています</span>
        </div>
      </div>
    </footer>
  );
}
