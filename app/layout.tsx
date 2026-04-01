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
  title: { default: "KurumaCow｜カーリース・自動車保険・中古車を比較", template: "%s｜KurumaCow" },
  description: "カーリース・自動車保険・中古車査定サービスを徹底比較。あなたのカーライフに最適なサービスが見つかります。",
  keywords: ["カーリース", "自動車保険", "中古車査定", "車比較", "カーライフ"],
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
