import type { ServiceItem, SiteAlert, HeroStat, HowToStep } from "./types";

// ─────────────────────────────────────────────
// アフィリエイトサービス定義（車買取・乗り換え特化）
// ※ affiliateUrl は実際のA8.net等のリンクに差し替えてください
// ─────────────────────────────────────────────
export const services: ServiceItem[] = [
  {
    rank: 1,
    name: "MOTA車買取",
    label: "一括査定 最大45社比較",
    description:
      "入力1分・翌日には最高額の1社だけから連絡が来るシステム。複数業者からの電話が嫌な人に最適。",
    price: "無料で最高額を確認",
    point: "翌日1社のみ連絡・電話ラッシュなし",
    tags: [
      { text: "📱 入力1分", variant: "cool" },
      { text: "📞 1社のみ連絡", variant: "green" },
      { text: "🆚 最大45社比較", variant: "warm" },
    ],
    reward: { label: "平均", value: "43,000円高く売れた" },
    affiliateUrl: "https://example.com/mota", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "無料で最高額を調べる",
    ctaColor: "bg-brand-blue hover:bg-brand-blue-dark",
    badgeGradient: "from-brand-blue-dark to-brand-blue-light",
  },
  {
    rank: 2,
    name: "ガリバー 無料査定",
    label: "中古車買取 累計実績No.1",
    description:
      "全国700店舗以上のガリバーが高額査定。即日現金化も可能で、しつこい営業なし。乗り換えの第一歩におすすめ。",
    price: "査定は完全無料",
    point: "即日査定・全国対応",
    tags: [
      { text: "🏆 買取実績No.1", variant: "cool" },
      { text: "💴 完全無料", variant: "green" },
      { text: "📞 電話なしも可", variant: "gray" },
    ],
    reward: { label: "最大", value: "200万円UP実績" },
    affiliateUrl: "https://example.com/gulliver", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "今すぐ無料で査定する",
    ctaColor: "bg-brand-red hover:bg-red-800",
    badgeGradient: "from-brand-red to-red-400",
  },
  {
    rank: 3,
    name: "楽天Car買取",
    label: "楽天ポイントが貯まる買取",
    description:
      "全国3,000社以上が入札する楽天の買取オークション。楽天ポイントも最大5,000pt付与で乗り換えがお得に。",
    price: "査定・手続きすべて無料",
    point: "楽天ポイント最大5,000pt",
    tags: [
      { text: "🏆 全国3,000社", variant: "cool" },
      { text: "🎁 ポイント付与", variant: "warm" },
      { text: "💴 完全無料", variant: "green" },
    ],
    reward: { label: "最大", value: "楽天P 5,000pt" },
    affiliateUrl: "https://example.com/rakuten-car", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "無料で査定額を調べる",
    ctaColor: "bg-brand-warm hover:bg-amber-800",
    badgeGradient: "from-brand-warm to-amber-500",
  },
];

// ─────────────────────────────────────────────
// サイトアラートバー（ティッカー）
// ─────────────────────────────────────────────
export const siteAlert: SiteAlert = {
  message:
    "🔥 愛車の買取相場を無料チェック！乗り換え前に必ず査定を。一括比較で高く売れる",
  linkText: "今すぐ無料査定 →",
  linkHref: "https://example.com/mota",
};

// ─────────────────────────────────────────────
// ヒーロー統計
// ─────────────────────────────────────────────
export const heroStats: HeroStat[] = [
  { value: "最大45社", label: "一括査定比較", color: "text-brand-sky" },
  { value: "完全無料", label: "査定・手続き", color: "text-brand-sky" },
  { value: "最短即日", label: "現金化も可能", color: "text-brand-sky" },
];

// ─────────────────────────────────────────────
// 乗り換え3ステップ
// ─────────────────────────────────────────────
export const howToSteps: HowToStep[] = [
  {
    step: 1,
    emoji: "📋",
    title: "無料査定で相場を確認",
    description: "まず今の車がいくらで売れるか把握することが乗り換え成功の第一歩です。",
    bgColor: "bg-blue-50",
    stepColor: "bg-brand-blue text-white",
  },
  {
    step: 2,
    emoji: "🆚",
    title: "複数社で比較する",
    description: "1社だけだと損するケースがほとんど。一括査定で最高額の業者を見つけましょう。",
    bgColor: "bg-sky-50",
    stepColor: "bg-brand-blue-dark text-white",
  },
  {
    step: 3,
    emoji: "🚗",
    title: "売却して新しい車へ",
    description: "高く売った分を頭金にすれば、乗り換えコストを大幅に抑えられます。",
    bgColor: "bg-indigo-50",
    stepColor: "bg-indigo-600 text-white",
  },
];
