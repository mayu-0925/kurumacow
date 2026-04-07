/**
 * 記事サムネイル画像自動生成スクリプト
 * Google AI Studio (Imagen 3) を使用して記事のサムネイルを生成する
 *
 * 使い方:
 *   npx tsx --env-file=.env scripts/generate-image.ts <slug> <title> <category>
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! });

const IMAGES_DIR = path.join(process.cwd(), "public/images/articles");

const CATEGORY_PROMPTS: Record<string, string> = {
  車買取: "car dealership interior, professional car assessment, sleek modern cars on display, blue and white color scheme",
  乗り換え: "new car purchase, happy driver with new car keys, modern car showroom, bright and aspirational",
  査定コツ: "car inspection professional, clipboard with car valuation, clean modern vehicle, trust and expertise",
  一括査定: "multiple car dealers, car auction environment, price comparison, professional automotive",
  軽自動車: "cute compact Japanese kei car, urban street setting, cheerful and practical",
  SUV: "modern SUV on scenic road, family lifestyle, powerful and stylish, outdoor adventure",
  EV: "electric vehicle charging, futuristic clean energy, Tesla-style sleek car, green technology",
  節約術: "smart financial planning with car, piggy bank and keys, money-saving concept, clean minimal",
};

function buildPrompt(title: string, category: string): string {
  const categoryHint =
    CATEGORY_PROMPTS[category] ??
    "modern car, automotive lifestyle, professional photography";

  return `Professional blog thumbnail for a Japanese automotive article.
Subject: ${categoryHint}
Context: ${title}
Style: Clean, modern, high-quality photo-realistic style. Bright lighting. Professional automotive photography aesthetic.
Colors: Predominantly blue, white, and silver tones. Crisp and trustworthy feeling.
Composition: Wide 16:9 landscape format. Absolutely no text, letters, numbers, words, or typography anywhere in the image. No watermarks. No captions.
Mood: Professional, aspirational, helpful.`;
}

export async function generateArticleImage(
  slug: string,
  title: string,
  category: string
): Promise<string | null> {
  try {
    const prompt = buildPrompt(title, category);
    console.log(`🎨 サムネイル生成中: ${slug}`);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-image",
      contents: prompt,
      config: {
        responseModalities: ["IMAGE"],
      },
    });

    const parts = response.candidates?.[0]?.content?.parts ?? [];
    const imagePart = parts.find((p) => p.inlineData?.mimeType?.startsWith("image/"));
    if (!imagePart?.inlineData?.data) {
      console.warn("⚠️  画像データが取得できませんでした（スキップ）");
      return null;
    }

    fs.mkdirSync(IMAGES_DIR, { recursive: true });
    const outputPath = path.join(IMAGES_DIR, `${slug}.jpg`);
    fs.writeFileSync(outputPath, Buffer.from(imagePart.inlineData.data, "base64"));

    const imageUrl = `/images/articles/${slug}.jpg`;
    console.log(`✅ サムネイル保存完了: public/images/articles/${slug}.jpg`);
    return imageUrl;
  } catch (err) {
    console.warn("⚠️  画像生成をスキップしました:", (err as Error).message);
    return null;
  }
}

// スタンドアロン実行時
if (process.argv[2]) {
  const [, , slug, title, category] = process.argv;
  generateArticleImage(slug, title ?? "車買取記事", category ?? "車買取")
    .then((url) => {
      if (url) console.log(`\n画像URL: ${url}`);
    })
    .catch((err) => {
      console.error("エラー:", err);
      process.exit(1);
    });
}
