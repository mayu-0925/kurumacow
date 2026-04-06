import Link from "next/link";
import ArticleCard from "@/components/ArticleCard";
import { services, siteAlert, heroStats } from "@/lib/data";
import { getLatestArticles } from "@/lib/articles";

export default function Home() {
  const articles = getLatestArticles(6);
  const [featured, ...rest] = articles;

  return (
    <>
      {/* TICKER */}
      <div className="bg-white border-b border-gray-200 px-7 py-2.5 flex items-center gap-4 text-sm overflow-hidden">
        <span className="bg-brand-red text-white text-[11px] font-bold px-2.5 py-0.5 rounded tracking-wide shrink-0">
          NEW
        </span>
        <div className="text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">
          {siteAlert.message}
          <Link
            href={siteAlert.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-blue font-medium ml-2 hover:underline"
          >
            {siteAlert.linkText}
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div
        className="relative min-h-[460px] flex items-center"
        style={{
          background: [
            "radial-gradient(ellipse at 20% 60%, rgba(176,224,230,0.45) 0%, transparent 60%)",
            "radial-gradient(ellipse at 80% 20%, rgba(70,130,180,0.2) 0%, transparent 55%)",
            "linear-gradient(135deg, rgba(46,93,142,0.90) 0%, rgba(70,130,180,0.86) 55%, rgba(135,206,220,0.88) 100%)",
            "url('/uploads/2016/04/white_car.jpg') center 40% / cover no-repeat",
          ].join(", "),
        }}
      >
        <div className="max-w-[1280px] mx-auto px-7 py-[60px] grid grid-cols-1 md:grid-cols-2 gap-14 items-center w-full">
          {/* テキスト */}
          <div>
            <span className="inline-flex items-center gap-2 bg-white/20 border border-white/35 text-white text-xs font-bold tracking-[2px] px-3.5 py-1.5 rounded-full mb-5 uppercase">
              🚗 Car Media &amp; Affiliate
            </span>
            <h1
              className="text-[clamp(26px,3.2vw,44px)] font-black leading-[1.35] mb-4 text-white"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
            >
              愛車を<span
                className="text-brand-sky"
                style={{ textShadow: "0 0 20px rgba(176,224,230,0.6)" }}
              >高く売って、</span><br />
              理想の一台へ乗り換えよう。
            </h1>
            <p className="text-white/90 text-[15px] leading-[1.8] mb-7">
              乗り換え・引越し・免許返納。どのタイミングでも<br />
              一括査定で最高額を引き出すのがカシコイ選択です。
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link
                href="/blog"
                className="pop-btn inline-flex items-center gap-2 bg-white text-brand-blue-dark font-bold text-[15px] px-6 py-3 rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
              >
                🔍 無料で査定額を確認
              </Link>
              <Link
                href="/ranking"
                className="pop-btn inline-flex items-center gap-2 bg-transparent text-white font-semibold text-[15px] px-5 py-3 border-2 border-white/50 rounded-lg hover:bg-white/10 transition"
              >
                🆚 買取サービスを比較
              </Link>
            </div>
            {/* Stats */}
            <div className="flex gap-6 mt-8 pt-6 border-t border-white/25">
              {heroStats.map((s) => (
                <div key={s.label}>
                  <div className="text-[22px] font-black text-brand-sky leading-none">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-white/70 mt-1 tracking-wide">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ビジュアルパネル */}
          <div className="hidden md:block bg-white/95 border border-white/80 rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.15)]">
            <div className="bg-gradient-to-r from-brand-blue-dark to-brand-blue-light rounded-lg px-4 py-3 mb-3 flex items-center gap-2">
              <span className="text-lg">🔍</span>
              <div>
                <p className="text-white font-bold text-sm leading-tight">愛車の買取相場を無料チェック</p>
                <p className="text-white/75 text-[11px]">最大45社比較・入力1分・完全無料</p>
              </div>
            </div>
            {[
              {
                emoji: "💰",
                title: "一括査定で高く売る方法",
                desc: "複数社比較で平均4万円UP",
                badge: "NEW",
                blue: false,
              },
              {
                emoji: "🆚",
                title: "下取りvs買取 どっちがお得？",
                desc: "ディーラー下取りで損しないために",
                badge: "PR",
                blue: true,
              },
              {
                emoji: "📅",
                title: "乗り換えベストタイミング",
                desc: "車検前・3年・5年の損得を解説",
                badge: "人気",
                blue: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-[#eef4fb] border border-[#dde5f0] rounded-[10px] p-3.5 mb-2.5 last:mb-0 flex gap-3 items-center hover:border-[rgba(70,130,180,0.3)] hover:shadow-sm transition"
              >
                <div className="w-11 h-11 rounded-[10px] bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-xl shrink-0">
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-bold text-gray-900 mb-0.5 truncate">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-gray-500">{item.desc}</p>
                </div>
                <span
                  className={`${
                    item.blue ? "bg-brand-blue" : "bg-brand-red"
                  } text-white text-[10px] font-bold px-2 py-0.5 rounded shrink-0`}
                >
                  {item.badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN 2-col layout */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-7 py-11 grid grid-cols-1 md:grid-cols-[1fr_340px] gap-9">
        {/* ── メインカラム ── */}
        <main>
          {/* アフィリエイトブロック */}
          <div className="bg-white border border-[#dde5f0] rounded-[14px] p-6 mb-9 relative overflow-hidden shadow-[0_4px_20px_rgba(70,130,180,0.14)]">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-sky-dark" />
            <span className="inline-block border border-brand-red text-brand-red text-[10px] font-bold px-2.5 py-0.5 rounded tracking-widest mb-3">
              PR
            </span>
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/uploads/2018/01/mitumori.jpg"
                alt=""
                className="w-full sm:w-[190px] h-[130px] object-cover rounded-lg shrink-0"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 leading-[1.4]">
                  🔥 今すぐ確認：愛車の概算査定額はいくら？
                </h3>
                <p className="text-sm text-gray-500 mb-3 leading-[1.7]">
                  乗り換えを考えているなら、まず今の車の概算査定額を確認しましょう。最大20社がWEB上で入札する3枠争奪戦で、ディーラー下取りより高値で売ろう。平均43,000円高く売れた実績あり※。
                </p>
                <p className="text-xs text-gray-400 mb-3">※MOTA実施アンケートより。回答数3,645件（回答期間：2023年6月〜2024年5月）</p>
                <div className="flex gap-3 flex-wrap">
                  <Link
                    href={services[0].affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pop-btn inline-flex items-center gap-2 bg-gradient-to-br from-brand-blue-dark to-brand-blue-light text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-[0_3px_14px_rgba(70,130,180,0.18)]"
                  >
                    🔍 無料で概算査定額を調べる
                  </Link>
                  <Link
                    href="/ranking"
                    className="pop-btn inline-flex items-center gap-2 bg-gradient-to-br from-brand-red to-red-400 text-white font-bold text-sm px-5 py-2.5 rounded-lg shadow-[0_3px_14px_rgba(178,34,34,0.18)]"
                  >
                    🏆 買取サービスを比較する
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* セクション見出し */}
          <div className="flex items-center gap-3 mb-5">
            <h2 className="text-[17px] font-bold text-brand-blue-dark whitespace-nowrap">
              📰 最新記事
            </h2>
            <div className="flex-1 h-[2px] bg-gradient-to-r from-[rgba(70,130,180,0.3)] to-transparent" />
            <Link
              href="/blog"
              className="text-[13px] text-brand-blue font-medium whitespace-nowrap hover:underline"
            >
              すべて見る →
            </Link>
          </div>

          {/* カードグリッド */}
          {articles.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {featured && <ArticleCard article={featured} featured />}
              {rest.slice(0, 4).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400 py-10 text-center text-sm">記事を準備中です。</p>
          )}
        </main>

        {/* ── サイドバー ── */}
        <aside className="flex flex-col gap-5">
          {/* アフィリエイトバナー */}
          <div className="bg-gradient-to-br from-brand-blue-dark to-brand-blue-light rounded-xl p-5 text-center shadow-[0_4px_20px_rgba(70,130,180,0.14)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/uploads/2016/04/harrier.png"
              alt=""
              className="w-full h-[110px] object-contain rounded-lg mb-3.5 bg-white/15 p-1"
            />
            <h3 className="text-[15px] font-bold text-white mb-2 leading-[1.5]">
              🔍 愛車の概算査定額を
              <br />
              今すぐ無料チェック
            </h3>
            <p className="text-[12px] text-white/88 mb-3.5 leading-[1.6]">
              最大20社がWEB上で入札。数十社からの電話ラッシュなし※で概算査定額がわかる
            </p>
            <p className="text-[10px] text-white/60 mb-3">※最多で上位3社からの電話はあります</p>
            <Link
              href={services[0].affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pop-btn inline-block bg-white text-brand-blue-dark font-bold text-[13px] px-5 py-2.5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
            >
              今すぐ無料で査定する
            </Link>
          </div>

          {/* 人気記事ランキング */}
          {articles.length > 0 && (
            <div className="bg-white border border-[#dde5f0] rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 px-4 py-3 bg-brand-blue text-white text-[13px] font-bold tracking-wide">
                🏆 人気記事ランキング
              </div>
              <div className="px-4 py-3.5 divide-y divide-[#dde5f0]">
                {articles.slice(0, 5).map((a, i) => (
                  <Link
                    key={a.slug}
                    href={`/blog/${a.slug}`}
                    className="flex gap-2.5 py-2.5 items-start hover:opacity-75 transition"
                  >
                    <span
                      className={`w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-bold shrink-0 border ${
                        i === 0
                          ? "bg-[rgba(212,166,0,0.12)] border-[#d4a600] text-[#856000]"
                          : i === 1
                          ? "bg-[rgba(120,120,120,0.1)] border-[#aaa] text-[#666]"
                          : i === 2
                          ? "bg-[rgba(160,82,45,0.12)] border-[#a0522d] text-[#a0522d]"
                          : "bg-[#eef4fb] border-[#dde5f0] text-brand-blue"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="text-[13px] leading-[1.5] text-gray-700 line-clamp-2">
                      {a.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* タグクラウド */}
          <div className="bg-white border border-[#dde5f0] rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 bg-brand-blue text-white text-[13px] font-bold tracking-wide">
              🏷️ カテゴリ・タグ
            </div>
            <div className="px-4 py-3.5 flex flex-wrap gap-2">
              {[
                "SUV",
                "電気自動車",
                "カーリース",
                "自動車保険",
                "ランキング",
                "軽自動車",
                "ミニバン",
                "中古車",
                "PHEV",
                "節約術",
              ].map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?cat=${encodeURIComponent(tag)}`}
                  className="bg-[#f2f2f2] border border-[#dde5f0] text-brand-blue text-xs px-3 py-1.5 rounded-full hover:bg-brand-blue hover:text-white hover:border-brand-blue transition"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
