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
    role: "編集長 / 中古車査定アドバイザー",
    bio: "中古車ディーラーに10年間勤務し、500台以上の買取査定を経験。現在はKurumaCowの編集長として、車の売却・乗り換えに関する情報を発信している。「ディーラー下取りで損している人を減らしたい」という思いでコンテンツを制作。",
    expertise: ["中古車査定", "買取業者比較", "乗り換えのタイミング", "ローン・維持費計算"],
    credentials: ["中古自動車査定士", "自動車整備士2級"],
    avatarInitials: "山",
    avatarColor: "bg-brand-blue",
  },
  {
    id: "sato-misaki",
    name: "佐藤 美咲",
    role: "自動車保険アドバイザー / FP",
    bio: "大手損保会社で7年間勤務後、ファイナンシャルプランナーとして独立。自動車保険の比較・見直しを専門とし、年間100件以上の相談実績を持つ。車の乗り換えに合わせた保険の最適化を得意とする。",
    expertise: ["自動車保険比較", "等級・割引の仕組み", "保険料節約術", "乗り換え時の保険見直し"],
    credentials: ["ファイナンシャルプランナー2級", "損害保険募集人資格"],
    avatarInitials: "佐",
    avatarColor: "bg-[#2e7d4f]",
  },
];

export function getAuthorById(id: string): Author | undefined {
  return authors.find((a) => a.id === id);
}
