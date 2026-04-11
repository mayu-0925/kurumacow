import type { ServiceItem, SiteAlert, HeroStat, HowToStep } from "./types";

// ─────────────────────────────────────────────
// アフィリエイトサービス定義（車買取・乗り換え特化）
// ※ affiliateUrl は実際のA8.net等のリンクに差し替えてください
// ─────────────────────────────────────────────
export const services: ServiceItem[] = [
  {
    rank: 1,
    name: "MOTA車買取",
    label: "一括査定 最大20社がWEB上で入札",
    description:
      "入力1分・翌日には上位3社から連絡が来るシステム。数十社からの電話ラッシュなし※最多で上位3社からの電話はあります。",
    price: "無料で概算査定額を確認",
    point: "最大20社がWEB上で入札・3枠争奪戦",
    tags: [
      { text: "📱 入力1分", variant: "cool" },
      { text: "🆚 最大20社が入札", variant: "green" },
      { text: "📞 鬼電なし※", variant: "warm" },
    ],
    reward: { label: "実績", value: "ディーラー下取りより高値" },
    affiliateUrl: "https://example.com/mota", // ← 実際のアフィリエイトURLに差し替え
    ctaText: "無料で概算査定額を調べる",
    ctaColor: "bg-brand-blue hover:bg-brand-blue-dark",
    badgeGradient: "from-brand-blue-dark to-brand-blue-light",
  },
  {
    rank: 2,
    name: "ユーポス 無料査定",
    label: "中古車買取 高価買取に自信あり",
    description:
      "独自のオークションネットワークで高値査定を実現。最短即日査定・全国対応で、愛車を少しでも高く売りたい方におすすめ。",
    price: "査定は完全無料",
    point: "最短即日査定・全国対応",
    tags: [
      { text: "💰 高価買取に自信", variant: "cool" },
      { text: "💴 完全無料", variant: "green" },
      { text: "🚗 最短即日対応", variant: "warm" },
    ],
    reward: { label: "特徴", value: "独自ネットワークで高値査定" },
    affiliateUrl: "http://www.rentracks.jp/adx/r.html?idx=0.9155.90616.7545.10704&dna=130214",
    ctaText: "今すぐ無料で査定する",
    ctaColor: "bg-brand-red hover:bg-red-800",
    badgeGradient: "from-brand-red to-red-400",
  },
  {
    rank: 3,
    name: "セルカ",
    label: "業界シェア50%超・8,000社が競るオークション",
    description:
      "全国8,000社以上のバイヤーが競り合う独自オークション。電話ラッシュなし・1社の担当者とだけやりとりで完結。累計申込28万件突破。",
    price: "出品無料・成約手数料33,000円",
    point: "8,000社以上が競る・業界シェアNo.1",
    tags: [
      { text: "🏆 業界シェア50%超", variant: "cool" },
      { text: "🏢 8,000社以上参加", variant: "green" },
      { text: "📞 電話ラッシュなし", variant: "warm" },
    ],
    reward: { label: "実績", value: "累計申込28万件突破" },
    affiliateUrl: "http://www.rentracks.jp/adx/r.html?idx=0.9155.90616.3286.4984&dna=72539",
    ctaText: "無料でオークション査定する",
    ctaColor: "bg-brand-warm hover:bg-amber-800",
    badgeGradient: "from-brand-warm to-amber-500",
  },
];

// ─────────────────────────────────────────────
// サイトアラートバー（ティッカー）
// ─────────────────────────────────────────────
export const siteAlert: SiteAlert = {
  message:
    "🔥 愛車の概算査定額を無料チェック！乗り換え前に必ず査定を。最大20社がWEB上で入札",
  linkText: "今すぐ無料で確認 →",
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
