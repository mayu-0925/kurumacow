/**
 * アフィリエイトサービス定義
 * rankIndex の順番が記事内CTAの優先順位になる
 */

export type AffiliateService = {
  name: string;
  label: string;
  description: string;
  price: string;
  point: string;
  affiliateUrl: string;
  ctaText: string;
  color: string;
};

export const services: AffiliateService[] = [
  // rankIndex: 0 — 最優先CTA
  {
    name: "定額カルモくん",
    label: "カーリース月額最安クラス",
    description: "頭金0円・税金コミ・車検コミで月々定額。全国対応で最短翌月から乗れる。",
    price: "月々 ¥19,000〜",
    point: "審査最短即日・頭金0円",
    affiliateUrl: "https://example.com/carlmo",        // ← 実際のアフィリエイトURLに差し替え
    ctaText: "今すぐ無料で審査する",
    color: "#4682b4",
  },
  // rankIndex: 1
  {
    name: "保険スクエアbang!",
    label: "自動車保険 一括見積もり",
    description: "最大20社以上を一括比較。1分入力で保険料を最大50%節約できる可能性あり。",
    price: "無料で見積もり比較",
    point: "20社以上を一括比較",
    affiliateUrl: "https://example.com/hoken-bang",    // ← 実際のアフィリエイトURLに差し替え
    ctaText: "無料で保険料を比較する",
    color: "#b22222",
  },
  // rankIndex: 2
  {
    name: "ユーポス 無料査定",
    label: "中古車買取 高価買取に自信あり",
    description: "独自のオークションネットワークで高値査定を実現。最短即日査定・全国対応。",
    price: "査定は完全無料",
    point: "最短即日査定・全国対応",
    affiliateUrl: "http://www.rentracks.jp/adx/r.html?idx=0.9155.90616.7545.10704&dna=130214",
    ctaText: "無料で査定額を調べる",
    color: "#665e53",
  },
  // rankIndex: 3
  {
    name: "セルカ",
    label: "業界シェア50%超・8,000社が競るオークション",
    description: "全国8,000社以上のバイヤーが競り合う独自オークション。電話ラッシュなし。累計申込28万件突破。",
    price: "出品無料・成約手数料33,000円",
    point: "8,000社以上が競る・業界シェアNo.1",
    affiliateUrl: "http://www.rentracks.jp/adx/r.html?idx=0.9155.90616.3286.4984&dna=72539",
    ctaText: "無料でオークション査定する",
    color: "#2e7d4f",
  },
];
