/**
 * 記事サムネイル画像自動生成スクリプト
 * Google AI Studio (gemini-3.1-flash-image-preview) を使用して記事のサムネイルを生成する
 *
 * 使い方:
 *   npx tsx --env-file=.env scripts/generate-image.ts <slug> <title> <category>
 */

import { GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_AI_API_KEY! });

const IMAGES_DIR = path.join(process.cwd(), "public/images/articles");

// ── カテゴリ別の被写体 ──────────────────────────────────────────
const CATEGORY_SUBJECTS: Record<string, string[]> = {
  車買取: [
    "a sleek modern sedan parked in a clean white showroom with soft spotlights",
    "a professional car appraiser examining a vehicle exterior in bright daylight",
    "a pair of car keys and a signed contract on a polished desk",
    "a wide shot of a busy car dealership lot with various vehicles",
    "close-up of a car dashboard with a valuation document on the seat",
  ],
  乗り換え: [
    "a smiling person receiving new car keys from a dealer in a bright showroom",
    "a family excitedly looking at a new SUV in a dealership",
    "a before-and-after composition showing an old car and a shiny new car",
    "a person driving a new car on an open highway at golden hour",
    "aerial view of multiple new cars lined up in a dealership lot",
  ],
  査定コツ: [
    "a mechanic with a clipboard conducting a detailed vehicle inspection",
    "close-up of car mileage odometer and service history documents",
    "a clean well-maintained car interior under bright lighting",
    "a professional inspection checklist beside a polished car exterior",
    "a car being photographed for an online listing in a parking lot",
  ],
  一括査定: [
    "multiple bid cards arranged around a luxury car in an auction setting",
    "a smartphone showing a car valuation app with multiple offers on screen",
    "a laptop showing car comparison charts on a desk with car keys",
    "icons of multiple companies surrounding a car, representing competition",
    "a split-screen composition showing different car buyers competing",
  ],
  軽自動車: [
    "a cute pastel-colored kei car parked on a quiet Japanese street",
    "a compact kei car in an urban city setting with cherry blossoms",
    "a tiny two-door car in a parking space next to a convenience store",
    "overhead view of a small Japanese kei car on a clean road",
    "a kei car driving through a scenic countryside road",
  ],
  SUV: [
    "a rugged black SUV on a mountain trail at sunset",
    "a family loading luggage into a large silver SUV in a driveway",
    "a premium white SUV parked on a cliff overlooking the ocean",
    "an SUV driving through a forest road with dappled sunlight",
    "a sporty SUV at a scenic viewpoint with mountains in the background",
  ],
  EV: [
    "a white electric vehicle plugged into a fast charger at a modern station",
    "a sleek silver EV driving on a futuristic highway at night with light trails",
    "close-up of an EV charging port with glowing blue charging indicator",
    "a modern electric car parked in front of solar panels",
    "an EV with a futuristic digital dashboard visible through the windshield",
  ],
  節約術: [
    "a piggy bank and car keys on a wooden table with financial documents",
    "a calculator and coins next to a toy car on a desk",
    "a hand holding yen bills in front of a parked car",
    "a budget spreadsheet on a tablet with a car in the background",
    "a person comparing car insurance quotes on a laptop",
  ],
  乗り換え先: [
    "multiple different car models lined up in a showroom for comparison",
    "a person thoughtfully looking at car brochures in a dealership",
    "a wide selection of vehicles in a large automotive expo",
  ],
};

// ── スタイルバリエーション（イラスト調に統一） ──────────────────
const STYLES = [
  "flat design illustration, clean vector art style, smooth gradients, modern Japanese web design aesthetic",
  "isometric illustration, 3D flat icon style, soft pastel colors, cute and clean",
  "minimal line art illustration with flat color fills, simple shapes, friendly and approachable",
  "Japanese editorial illustration style, clean outlines, bright solid colors, magazine cover aesthetic",
  "geometric illustration, abstract shapes, vibrant flat colors, contemporary graphic design",
  "cute kawaii illustration style, rounded shapes, soft colors, friendly characters and objects",
];

// ── カラースキームバリエーション（サイトカラーに合わせた配色） ──
const COLOR_SCHEMES = [
  "color palette: steel blue #4682b4, white, and light sky blue — matches site brand colors",
  "color palette: soft sky blue, white, and navy accent — clean and professional",
  "color palette: light blue, pale yellow, and white — bright and cheerful illustration",
  "color palette: mint green, white, and sky blue — fresh and modern",
  "color palette: coral orange, white, and steel blue — energetic contrast illustration",
  "color palette: lavender, white, and deep blue — elegant and calm",
];

// ── 構図バリエーション ────────────────────────────────────────
const COMPOSITIONS = [
  "wide establishing shot, subject centered with generous negative space",
  "rule of thirds composition, subject offset to the left with open space on right",
  "low angle shot looking up at the subject, dramatic perspective",
  "close-up detail shot with blurred background emphasizing texture",
  "symmetrical centered composition with leading lines",
  "over-the-shoulder perspective creating depth and immersion",
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildPrompt(title: string, category: string): string {
  const subjects = CATEGORY_SUBJECTS[category] ?? CATEGORY_SUBJECTS["車買取"];
  const subject = pickRandom(subjects);
  const style = pickRandom(STYLES);
  const colorScheme = pickRandom(COLOR_SCHEMES);
  const composition = pickRandom(COMPOSITIONS);

  return `Create a blog article thumbnail illustration image.

Subject: ${subject}
Article topic context: ${title}
Visual style: ${style}. This must be an illustration — NOT a photograph. No realistic photography.
${colorScheme}
Composition: ${composition}, 16:9 widescreen aspect ratio, clean white or light background
Important rules: Absolutely no text, letters, numbers, words, watermarks, logos, or typography anywhere in the image. Pure illustration only.
Quality: Crisp, clean, high-quality digital illustration suitable for a blog header image.`;
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
      model: "gemini-3.1-flash-image-preview",
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
