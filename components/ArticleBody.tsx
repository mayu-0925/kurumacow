import type { ContentBlock } from "@/lib/types";
import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";
import Link from "next/link";

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|==[^=]+==[^\s]?)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("==") && part.endsWith("==")) {
      return <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part.slice(2, -2)}</mark>;
    }
    return part;
  });
}

export default function ArticleBody({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-gray-800 leading-relaxed">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading2":
            return (
              <h2 key={i} className="text-xl font-black text-gray-900 border-l-4 border-brand-blue pl-3 mt-8">
                {block.text}
              </h2>
            );
          case "heading3":
            return (
              <h3 key={i} className="text-base font-bold text-gray-800 flex items-center gap-2 mt-6">
                <span className="w-5 h-5 rounded-full bg-brand-blue text-white text-xs flex items-center justify-center shrink-0">●</span>
                {block.text}
              </h3>
            );
          case "paragraph":
            return <p key={i} className="text-sm leading-7">{renderInlineText(block.text)}</p>;
          case "list":
            return (
              <ul key={i} className="space-y-2">
                {block.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <span className="text-brand-blue mt-1 shrink-0">✓</span>
                    <span>{renderInlineText(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <div key={i} className="bg-blue-50 border-l-4 border-brand-blue rounded-r-xl p-4">
                <p className="font-bold text-brand-blue-dark mb-2">{block.emoji} この記事でわかること</p>
                <ul className="space-y-1">
                  {block.text.split("\n").filter(Boolean).map((line, j) => (
                    <li key={j} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-brand-blue shrink-0">▸</span>
                      {line.replace(/^[・•\-▸]\s*/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            );
          case "service_cta": {
            const service = services[block.serviceIndex];
            if (!service) return null;
            return <div key={i} className="my-6"><ServiceCard service={service} priority={block.serviceIndex === 0} /></div>;
          }
          case "steps":
            return (
              <div key={i} className="space-y-3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                {block.items.map((item, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <span className="w-7 h-7 rounded-full bg-brand-blue text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {j + 1}
                    </span>
                    <div>
                      <p className="font-bold text-sm text-gray-900">{item.title}</p>
                      <p className="text-sm text-gray-600">{renderInlineText(item.description)}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          case "definition_list":
            return (
              <dl key={i} className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
                {block.items.map((item, j) => (
                  <div key={j} className="flex gap-4 px-4 py-3 odd:bg-gray-50">
                    <dt className="font-bold text-sm text-brand-blue-dark w-28 shrink-0">{item.term}</dt>
                    <dd className="text-sm text-gray-700">{renderInlineText(item.description)}</dd>
                  </div>
                ))}
              </dl>
            );
          case "table": {
            return (
              <div key={i} className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-brand-blue text-white">
                      {block.headers.map((h, j) => <th key={j} className="px-4 py-2.5 text-left font-bold">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                        {row.map((cell, k) => <td key={k} className="px-4 py-2.5 border-t border-gray-100">{cell}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }
          case "bar_chart": {
            const max = Math.max(...block.items.map((it) => it.value));
            return (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                <p className="font-bold text-sm text-gray-900 mb-3">{block.title}</p>
                <div className="space-y-2.5">
                  {block.items.map((it, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <span className="w-24 text-xs text-gray-600 shrink-0">{it.label}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-4 overflow-hidden">
                        <div className={`h-full rounded-full ${it.color}`}
                          style={{ width: `${(it.value / max) * 100}%` }} />
                      </div>
                      <span className="w-20 text-xs font-bold text-gray-700 text-right">
                        {it.value.toLocaleString()} {it.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
          case "related_articles": {
            return (
              <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm font-bold text-brand-blue mb-3">📎 関連記事</p>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j}>
                      <Link
                        href={`/blog/${item.slug}/`}
                        className="text-sm text-brand-blue hover:text-brand-blue-dark underline underline-offset-2 transition"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          }
          case "experience": {
            return (
              <div key={i} className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1.5">
                  <span>💬</span> 編集部の実体験
                </p>
                <p className="text-sm text-gray-800 leading-relaxed italic">「{block.text}」</p>
                {block.result && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs font-bold text-white bg-amber-600 px-2 py-0.5 rounded-full shrink-0">結果</span>
                    <span className="text-sm font-bold text-amber-800">{block.result}</span>
                  </div>
                )}
              </div>
            );
          }
          case "faq": {
            return (
              <div key={i} className="space-y-3">
                <p className="text-base font-bold text-gray-900 flex items-center gap-2">
                  <span className="text-brand-blue">❓</span>よくある質問
                </p>
                {block.items.map((item, j) => (
                  <details key={j} className="border border-gray-200 rounded-xl overflow-hidden group">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer bg-gray-50 hover:bg-blue-50 transition list-none">
                      <span className="font-bold text-sm text-gray-900 flex gap-2">
                        <span className="text-brand-blue shrink-0">Q.</span>{item.question}
                      </span>
                      <span className="text-brand-blue shrink-0 ml-2 text-xs">▼</span>
                    </summary>
                    <div className="px-4 py-3 text-sm text-gray-700 leading-relaxed border-t border-gray-100 bg-white">
                      <span className="text-brand-blue font-bold mr-1">A.</span>{item.answer}
                    </div>
                  </details>
                ))}
              </div>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
