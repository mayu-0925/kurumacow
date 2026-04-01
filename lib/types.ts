// ─────────────────────────────────────────────
// アフィリエイトサービス（カーリース・保険・査定）
// ─────────────────────────────────────────────
export type ServiceTag = {
  text: string;
  variant: "cool" | "warm" | "green" | "gray";
};

export type ServiceItem = {
  rank: number;
  name: string;
  label: string;
  description: string;
  price: string;
  point: string;
  tags: ServiceTag[];
  reward: { label: string; value: string };
  affiliateUrl: string;
  ctaText: string;
  ctaColor: string;
  badgeGradient: string;
};

// ─────────────────────────────────────────────
// 記事コンテンツブロック
// ─────────────────────────────────────────────
export type ContentBlock =
  | { type: "heading2"; text: string }
  | { type: "heading3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; emoji: string; text: string }
  | { type: "service_cta"; serviceIndex: number }
  | { type: "steps"; items: { title: string; description: string }[] }
  | { type: "definition_list"; items: { term: string; description: string }[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "bar_chart";
      title: string;
      items: { label: string; value: number; unit: string; color: string }[];
    };

// ─────────────────────────────────────────────
// 記事メタデータ
// ─────────────────────────────────────────────
export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  emoji: string;
  publishedAt: string;
  content?: ContentBlock[];
};

// ─────────────────────────────────────────────
// サイトUI用
// ─────────────────────────────────────────────
export type SiteAlert = {
  message: string;
  linkText: string;
  linkHref: string;
};

export type HeroStat = {
  value: string;
  label: string;
  color: string;
};

export type HowToStep = {
  step: number;
  emoji: string;
  title: string;
  description: string;
  bgColor: string;
  stepColor: string;
};
