import type { ServiceItem, SiteAlert, HeroStat, HowToStep } from "./types";

// ─────────────────────────────────────────────
// アフィリエイトサービス定義
// ※ affiliateUrl は実際のA8.net等のリンクに差し替えてください
// ─────────────────────────────────────────────
export const services: ServiceItem[] = [
  {
    rank: 1,
    name: "定額カルモくん",
    label: "カーリース月額最安クラス",
    description:
      "頭金0円・税金コミ・車検コミで月々定額。全国対応で最短翌月から乗れる人気No.1カーリース。",
    price: "月々 ¥19,800〜",
    point: "審査最短即日・頭金0円",
    tags: [
      { text: "🚗 頭金0円", variant: "cool" },
      { text: "💰 月々¥19,800〜", variant: "green" },
      { text: "🎁 車検・税金コミ", variant: "warm" },
    ],
    reward: { label: "最大", value: "50,000円キャッシュバック" },
    affiliateUrl: "https://example.com/carlmo", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "今すぐ無料で審査する",
    ctaColor: "bg-brand-blue hover:bg-brand-blue-dark",
    badgeGradient: "from-brand-blue-dark to-brand-blue-light",
  },
  {
    rank: 2,
    name: "保険スクエアbang!",
    label: "自動車保険 一括見積もり",
    description:
      "最大20社以上を一括比較。1分入力で保険料を最大50%節約できる可能性あり。",
    price: "無料で見積もり比較",
    point: "20社以上を一括比較",
    tags: [
      { text: "🛡️ 20社以上比較", variant: "cool" },
      { text: "💰 最大50%節約", variant: "green" },
      { text: "⚡ 1分で入力完了", variant: "warm" },
    ],
    reward: { label: "保険料", value: "最大50%節約" },
    affiliateUrl: "https://example.com/hoken-bang", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "無料で保険料を比較する",
    ctaColor: "bg-brand-red hover:bg-red-800",
    badgeGradient: "from-brand-red to-red-400",
  },
  {
    rank: 3,
    name: "ガリバー 無料査定",
    label: "中古車・下取り 無料一括査定",
    description:
      "全国4,000社以上の業者が競い合う。最大200万円高く売れた実績あり。",
    price: "査定は完全無料",
    point: "最大30社から一括査定",
    tags: [
      { text: "🏆 最大30社査定", variant: "cool" },
      { text: "💴 完全無料", variant: "green" },
      { text: "📞 電話なしも可", variant: "gray" },
    ],
    reward: { label: "最大", value: "200万円UP実績" },
    affiliateUrl: "https://example.com/gulliver", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "無料で査定額を調べる",
    ctaColor: "bg-brand-warm hover:bg-amber-800",
    badgeGradient: "from-brand-warm to-amber-500",
  },
];

// ─────────────────────────────────────────────
// サイトアラートバー
// ─────────────────────────────────────────────
export const siteAlert: SiteAlert = {
  message:
    "🎉 今なら定額カルモくん初月無料キャンペーン実施中！カーリース比較はこちら",
  linkText: "詳細を見る",
  linkHref: "https://example.com/carlmo",
};

// ─────────────────────────────────────────────
// ヒーロー統計
// ─────────────────────────────────────────────
export const heroStats: HeroStat[] = [
  { value: "3", label: "比較サービス", color: "text-brand-blue" },
  { value: "毎月", label: "情報更新", color: "text-green-500" },
  { value: "無料", label: "診断サービス", color: "text-brand-red" },
];

// ─────────────────────────────────────────────
// 車選び3ステップ
// ─────────────────────────────────────────────
export const howToSteps: HowToStep[] = [
  {
    step: 1,
    emoji: "🏠",
    title: "使い方・頻度を確認",
    description: "通勤・レジャー・家族利用など、使い方によって最適な車種やリース条件が変わります。",
    bgColor: "bg-blue-50",
    stepColor: "bg-brand-blue text-white",
  },
  {
    step: 2,
    emoji: "💰",
    title: "予算・月額を決める",
    description: "頭金・月額・維持費まで含めた総コストで比較するのが賢い選び方です。",
    bgColor: "bg-sky-50",
    stepColor: "bg-brand-blue-dark text-white",
  },
  {
    step: 3,
    emoji: "📊",
    title: "サービスを比較する",
    description: "カーリース・保険・査定を一括比較して、あなたに最適なプランを見つけましょう。",
    bgColor: "bg-indigo-50",
    stepColor: "bg-indigo-600 text-white",
  },
];
