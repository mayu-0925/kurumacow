export type Author = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  credentials: string[];
  avatarInitials: string;
  avatarColor: string;
};

export const authors: Author[] = [
  {
    id: "yamada-kenta",
    name: "山田 健太",
    role: "KurumaCow編集部 / 車買取・乗り換え担当",
    bio: "車の買取・乗り換えに関する情報を専門に調査・執筆するKurumaCow編集部員。一括査定サービスの比較や買取相場の動向を継続的にリサーチし、読者が損をしない売却方法をわかりやすく発信することをミッションとしている。",
    expertise: ["車買取サービスの比較", "買取相場の調査", "乗り換えコストの計算", "査定額を上げるコツ"],
    credentials: [],
    avatarInitials: "山",
    avatarColor: "bg-brand-blue",
  },
  {
    id: "sato-misaki",
    name: "佐藤 美咲",
    role: "KurumaCow編集部 / 自動車保険担当",
    bio: "自動車保険の比較・見直しを専門に調査するKurumaCow編集部員。各保険会社のプランや等級の仕組み、乗り換え時の保険見直しポイントについて、読者がムダなく最適な保障を選べるよう情報を発信している。",
    expertise: ["自動車保険の比較調査", "等級・割引の仕組み", "保険料の節約術", "乗り換え時の保険見直し"],
    credentials: [],
    avatarInitials: "佐",
    avatarColor: "bg-[#2e7d4f]",
  },
];

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
