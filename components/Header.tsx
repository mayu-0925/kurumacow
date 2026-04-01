"use client";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "/blog", label: "新着" },
    { href: "/blog?cat=SUV", label: "SUV" },
    { href: "/blog?cat=EV", label: "EV" },
    { href: "/blog?cat=カーリース", label: "カーリース" },
    { href: "/blog?cat=自動車保険", label: "保険比較" },
    { href: "/ranking", label: "ランキング" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-white/97 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-[1280px] mx-auto px-7 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="w-11 h-11 rounded-[10px] bg-gradient-to-br from-brand-blue-dark to-brand-blue-light flex items-center justify-center text-[22px] shadow-[0_2px_10px_rgba(70,130,180,0.18)]">
            🐄
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-black text-gray-900 tracking-wide">
              Kuruma<span className="text-brand-blue">Cow</span>
            </span>
            <span className="bg-brand-blue text-white text-[9px] font-bold px-2 py-0.5 rounded tracking-[1px]">
              AUTO
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-2 rounded-md text-[13px] font-medium text-gray-600 hover:text-brand-blue hover:bg-[rgba(70,130,180,0.08)] transition"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/ranking"
            className="ml-2 px-4 py-2 rounded-md bg-gradient-to-br from-brand-blue-dark to-brand-blue-light text-white text-[13px] font-bold shadow-[0_2px_10px_rgba(70,130,180,0.18)] hover:opacity-90 transition"
          >
            無料見積もり →
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="メニュー"
        >
          <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-600 mb-1" />
          <span className="block w-5 h-0.5 bg-gray-600" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-gray-700 hover:text-brand-blue"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/ranking"
            onClick={() => setOpen(false)}
            className="mt-1 py-2.5 text-center rounded-lg bg-gradient-to-br from-brand-blue-dark to-brand-blue-light text-white text-sm font-bold"
          >
            無料見積もり →
          </Link>
        </div>
      )}
    </header>
  );
}
