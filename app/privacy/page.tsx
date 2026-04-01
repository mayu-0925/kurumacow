import type { Metadata } from "next";

export const metadata: Metadata = { title: "プライバシーポリシー", robots: { index: false } };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 prose prose-sm text-gray-700">
      <h1 className="text-2xl font-black text-gray-900 mb-6">プライバシーポリシー</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-sm leading-relaxed">
        <h2 className="font-bold text-gray-900">収集する情報</h2>
        <p>当サイトは、Google Analyticsを利用してアクセス情報を収集しています。これにはCookieを使用したIPアドレスや閲覧ページなどの情報が含まれます。</p>
        <h2 className="font-bold text-gray-900">アフィリエイトプログラムについて</h2>
        <p>当サイトは各種アフィリエイトプログラムに参加しており、掲載リンクを経由して成約が発生した場合に報酬を受け取ることがあります。</p>
        <h2 className="font-bold text-gray-900">個人情報の管理</h2>
        <p>お問い合わせフォームから取得した個人情報は、返信目的にのみ使用し、第三者に提供することはありません。</p>
        <p className="text-gray-400 text-xs mt-6">制定日：2025年</p>
      </div>
    </div>
  );
}
