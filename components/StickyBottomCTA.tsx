"use client";
import Link from "next/link";

export default function StickyBottomCTA() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-white border-t border-gray-200 shadow-lg">
      <Link href="/ranking"
        className="block text-center py-3 rounded-xl bg-brand-blue text-white font-bold text-sm shadow pop-btn">
        🔍 愛車の買取相場を無料チェック
      </Link>
    </div>
  );
}
