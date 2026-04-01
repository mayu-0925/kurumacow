import Link from "next/link";
import type { ServiceItem } from "@/lib/types";

const tagVariants: Record<string, string> = {
  cool: "bg-[rgba(70,130,180,0.1)] text-brand-blue border border-[rgba(70,130,180,0.2)]",
  warm: "bg-amber-50 text-amber-800 border border-amber-200",
  green: "bg-green-50 text-green-700 border border-green-200",
  gray: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function ServiceCard({ service, priority = false }: { service: ServiceItem; priority?: boolean }) {
  return (
    <div
      className={`relative bg-white border rounded-[14px] overflow-hidden shadow-[0_4px_20px_rgba(70,130,180,0.14)] ${
        priority ? "border-brand-blue" : "border-[#dde5f0]"
      }`}
    >
      {/* 上部グラデーションライン */}
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${service.badgeGradient}`}
      />

      {/* 順位バッジ */}
      <div
        className={`absolute top-3 left-4 px-3 py-0.5 rounded-full text-white text-[10px] font-black shadow bg-gradient-to-r ${service.badgeGradient}`}
      >
        第{service.rank}位
      </div>

      <div className="p-5 pt-8">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-xs text-gray-500 mb-0.5">{service.label}</p>
            <p className="font-black text-lg text-gray-900">{service.name}</p>
          </div>
          <p className="text-right text-xs text-gray-500 shrink-0">
            <span className="block text-brand-red font-bold text-sm">{service.reward.value}</span>
            {service.reward.label}
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{service.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {service.tags.map((tag) => (
            <span
              key={tag.text}
              className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagVariants[tag.variant]}`}
            >
              {tag.text}
            </span>
          ))}
        </div>

        <Link
          href={service.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`pop-btn block text-center py-3 rounded-xl text-white font-bold text-sm shadow transition ${service.ctaColor}`}
        >
          {service.ctaText} →
        </Link>
        <p className="text-center text-xs text-gray-400 mt-1.5">{service.price}</p>
      </div>
    </div>
  );
}
