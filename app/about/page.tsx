import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "このサイトについて",
  robots: { index: false },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-black text-gray-900 mb-6">このサイトについて</h1>
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>KurumaCow（クルマカウ）は、カーリース・自動車保険・中古車査定などのカーライフサービスを比較・紹介するアフィリエイトメディアです。</p>
        <table className="w-full text-sm border-collapse">
          <tbody>
            {[
              ["サイト名", "KurumaCow"],
              ["運営", "KurumaCow編集部"],
              ["設立", "2025年"],
              ["収益モデル", "アフィリエイト広告収入"],
            ].map(([k, v]) => (
              <tr key={k} className="border-b border-gray-100">
                <th className="py-2 pr-4 text-left font-bold text-gray-600 w-32">{k}</th>
                <td className="py-2">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>当サイトに掲載している情報は、アフィリエイト報酬の有無にかかわらず、読者にとって有益な情報を提供することを第一に執筆しています。</p>
      </div>
    </div>
  );
}
