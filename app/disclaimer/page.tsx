import type { Metadata } from "next";

export const metadata: Metadata = { title: "免責事項", robots: { index: false } };

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-black text-gray-900 mb-6">免責事項</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>当サイトに掲載している情報は、できる限り正確な情報を提供するよう努めていますが、その正確性・完全性を保証するものではありません。</p>
        <p>掲載しているサービスの料金・キャンペーン情報は随時変更される場合があります。最新情報は必ず各サービスの公式サイトをご確認ください。</p>
        <p>当サイトはアフィリエイト広告を掲載しており、リンク経由での成約により報酬を受け取る場合があります。</p>
        <p>当サイトのリンク先のウェブサイトにより生じた損害について、当サイトは一切の責任を負いません。</p>
      </div>
    </div>
  );
}
