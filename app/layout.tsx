import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyBottomCTA from "@/components/StickyBottomCTA";

const noto = Noto_Sans_JP({ subsets: ["latin"], variable: "--font-noto", display: "swap" });

const BASE_URL = "https://kurumacow.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: { default: "KurumaCow｜車の買取・乗り換えで損しないための比較メディア", template: "%s｜KurumaCow" },
  description: "車の買取・乗り換えを考えているあなたへ。ガリバー・MOTA・楽天Carなど主要買取サービスを徹底比較。一括査定で愛車を高く売る方法を解説します。",
  keywords: ["車買取", "車の乗り換え", "一括査定", "高く売る", "ガリバー", "MOTA車買取", "中古車買取", "下取り 比較"],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "KurumaCow",
    images: [{ url: "/og-default.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={noto.variable}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyBottomCTA />
      </body>
    </html>
  );
}
