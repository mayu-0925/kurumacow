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
  description: "車の買取・乗り換えを考えているあなたへ。MOTA・ユーポス・セルカなど主要買取サービスを徹底比較。一括査定で愛車を高く売る方法を解説します。",
  keywords: ["車買取", "車の乗り換え", "一括査定", "高く売る", "ユーポス", "MOTA車買取", "中古車買取", "下取り 比較"],
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: BASE_URL,
    siteName: "KurumaCow",
    images: [{ url: "/logo.png", width: 512, height: 512, alt: "KurumaCow" }],
  },
  twitter: {
    card: "summary",
    images: ["/logo.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "KurumaCow",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "車の買取・乗り換えを考えている方向けの比較メディア。主要買取サービスの比較情報と一括査定活用ノウハウを提供します。",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "KurumaCow",
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${BASE_URL}/blog?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={noto.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyBottomCTA />
      </body>
    </html>
  );
}
