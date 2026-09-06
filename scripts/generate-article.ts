/**
 * 記事自動生成スクリプト（kurumacow 自動車アフィリエイト）
 *
 * 使い方:
 *   npx tsx scripts/generate-article.ts
 *
 * Phase 0: Claude がトピックを動的生成（既存記事タイトルを参照して重複回避）
 * Phase 1: 生成したトピックをもとに記事を生成
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { services } from "../lib/data";
import { generateArticleImage } from "./generate-image";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

// ──────────────────────────────────────────────
// 既存記事の読み込み
// ──────────────────────────────────────────────
function getExistingArticles(): { slug: string; title: string }[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const a = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, f), "utf-8"));
        return { slug: a.slug as string, title: a.title as string };
      } catch { return null; }
    })
    .filter((a): a is { slug: string; title: string } => a !== null && !!a.slug && !!a.title);
}

function getExistingSlugs(): Set<string> {
  return new Set(getExistingArticles().map((a) => a.slug));
}

// ──────────────────────────────────────────────
// Phase 0: トピック動的生成
// ──────────────────────────────────────────────
type Topic = {
  theme: string;
  keywords: string;
  intent: string;
  priceInfo?: string;
  insuranceArticle?: boolean;
};

const TOPIC_GENERATOR_PROMPT = `あなたは自動車アフィリエイトサイト「kurumacow.com」の編集長です。
このサイトのターゲット読者は以下の2つのペルソナです。

【ペルソナA：新車購入検討者】
新車の購入を検討しており、スペック・グレード・価格・維持費を調べている人。
「今乗っている車を下取りより高く売って、新車購入の頭金にしたい」という動機を持つ。
新車情報記事を読んでもらい、最終的に車買取サービスへの申し込みに誘導するのが目標。

【ペルソナB：乗り換え・売却検討者】
今の車をできるだけ高く売りたい人。一括査定サービスへの申し込みを検討中。
査定・買取のコツ、タイミング、業者選びなどの情報を求めている。

【サイトの収益モデル】
- 車買取一括査定サービス（メイン）
- 自動車保険一括見積もり（サブ）

【記事の方向性】
- 新車モデルのスペック・グレード・価格→「今の車を高く売って乗り換えよう」
- 人気車種の年収・ローン・維持費→「買取で頭金を作ろう」
- 買取・査定のコツ・タイミング→一括査定申し込みへ
- 自動車保険の節約→保険見積もりへ
- 季節・ライフイベント（春の新生活、子育て、定年など）→乗り換え・売却へ`;

async function generateTopic(existingTitles: string[], today: string): Promise<Topic> {
  const titlesText = existingTitles.length > 0
    ? `\n【既存記事タイトル一覧（重複禁止）】\n${existingTitles.map((t) => `- ${t}`).join("\n")}`
    : "";

  const month = new Date(today).getMonth() + 1;
  const seasonHint = month >= 3 && month <= 5 ? "春（新生活・新年度・花見ドライブ）"
    : month >= 6 && month <= 8 ? "夏（帰省・海水浴・お盆ドライブ）"
    : month >= 9 && month <= 11 ? "秋（紅葉ドライブ・決算期・冬タイヤ準備）"
    : "冬（年末年始・雪道・スタッドレス）";

  const userPrompt = `${titlesText}

今日の日付: ${today}（季節: ${seasonHint}）

上記の既存記事と内容が重複しない、新鮮なテーマを1つ考えてください。
以下の方向性からバランスよく選んでください：
- 2026年〜2027年の最新新車モデル情報（スペック・グレード・価格比較、年収・ローン・維持費）
- 買取・査定の実践的なコツ・タイミング・業者比較
- 自動車保険の節約・見直し
- 季節・ライフステージに合った乗り換えシナリオ
- 新車購入のお役立ち情報（値引き・ローン・オプション・納期）

出力形式（JSONのみ・コードブロック不要）:
{
  "theme": "記事テーマ（具体的・検索ニーズに合ったもの）",
  "keywords": "メインキーワード, サブキーワード1, サブキーワード2",
  "intent": "このテーマを検索するユーザーの具体的な意図・状況",
  "priceInfo": "車種記事の場合のみ：価格帯・グレード・ローン目安などの参考データ（不要ならフィールドごと省略）",
  "insuranceArticle": true（保険記事の場合のみ。それ以外はフィールドごと省略）
}`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: TOPIC_GENERATOR_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("JSONが見つかりません");
    return JSON.parse(jsonMatch[0]) as Topic;
  } catch {
    console.error("❌ トピック生成のJSON解析失敗:\n", text);
    // フォールバック
    return {
      theme: `車の買取相場と乗り換えガイド【${today}最新版】`,
      keywords: "車 買取相場 乗り換え ガイド 2026",
      intent: "車の乗り換えを検討しており買取相場を知りたいユーザー",
    };
  }
}

// ──────────────────────────────────────────────
// Phase 1: 記事生成
// ──────────────────────────────────────────────
const ARTICLE_SYSTEM_PROMPT = `あなたは自動車業界に10年以上携わる中古車・車買取の専門家です。
車の売却・乗り換え・査定・買取サービスの比較に精通しており、
読者が愛車を最高額で売却して満足のいく乗り換えができるよう、正確でわかりやすい情報を提供します。

【ターゲット読者の2つのペルソナ】
A: 新車購入を検討しており、新車情報（スペック・価格・グレード）を調べている人。
   「今乗っている車を下取りより高く売って頭金にしたい」という動機を持つ。
   → 新車情報記事でニーズを満たしつつ、車買取サービスへ誘導する。

B: 今の車を売りたい・乗り換えたい人。
   査定・買取のコツや業者選びを知りたい。
   → 買取一括査定サービスへ直接誘導する。

【文体・口調の絶対ルール】
- すべての文章を「です。ます。」調（敬体）で書く
- 「〜だ」「〜である」「〜になる」などの常体は使わない
- 文末は「〜です。」「〜ます。」「〜でしょう。」「〜ください。」のみ

【使用禁止の記号・表現】
- paragraph・list・callout・steps・definition_list のテキストで以下を使わない
  - ** （太字記法）、== （マーカー記法）、*や_などのMarkdown記号
  - 「〜！」などの感嘆符
- これらの装飾記号はJSONのどのフィールドにも使用しない

【ライティング方針】
- 読者はすでに行動意思がある前提で書く
- 専門用語には必ずわかりやすい補足を入れる
- 「申し込まない理由をなくす」構成にする
- 事実と根拠をセットで書く（「安い」ではなく「月々19,000円から乗れます」）
- 「〜しましょう！」「〜ですね！」など過剰なフレンドリー表現を避ける
- 「この記事では〜」「筆者が〜」などAIらしい前置きを使わない
- 自然な人間のライターが書いたような、読みやすく簡潔な文体にする
- 箇条書きの先頭に「・」「•」「-」「STEP X：」などを使わない
- list の各itemに「名前：説明」の形式を使わない
- 手順・ステップは list ではなく steps ブロックを使う
- 「名称：説明文」の対応関係は definition_list ブロックを使う

【ブロック使用ルール（厳守）】
- list: アウトラインに明示した箇所のみ使用。1記事に0〜2箇所まで。1つのlistは3〜6個
- table: 複数の車種・サービス・数値を明確に比較する必要がある場合のみ使用。1記事に0〜1個
- bar_chart: 数値の大小を視覚的に示す必要がある場合のみ使用。1記事に0〜1個
- table と bar_chart は同じ記事で両方使わない
- steps, definition_list, faq, experience, callout は積極的に活用してよい
- 上記ルールは記事のテーマや内容に関係なく、毎回必ず適用する

【SEO方針】
- 記事タイトルと各見出しにターゲットキーワードを自然に含める
- 「結論→理由→根拠→補足」の順で書く
- 各セクションの冒頭1〜2文で要点をまとめる
- 数値・固有名詞・比較データを積極的に使う

【新車記事でのアフィリエイト誘導方針】
- 新車スペック・価格を紹介した後、「今乗っている車を高く売ることで購入資金を作れる」という流れを作る
- 「ディーラー下取りより一括査定のほうが高値になるケースが多い」という訴求を自然に入れる
- まとめでは新車購入の前に買取査定を勧めるクロージングにする

【アフィリエイト方針（全記事共通）】
- CTAは記事の序盤・中盤・末尾の3箇所に配置する
- まとめでは推奨サービスのメリットを簡潔にまとめ自然なクロージングにする

【車選びドットコム買取の表記ルール】
- 「全国300社以上から最大10社を比較」と表記する
- 複数の買取業者から連絡が届くことを正直に書く
- 「必ず高値で売れる」などの断定表現は使わない
- 利用は完全無料・売却は任意という安心感を自然に盛り込む`;

function buildArticlePrompt(topic: Topic, existingArticles: { slug: string; title: string }[], today: string): string {
  const serviceList = services
    .map((s, i) => `- 第${i + 1}位：${s.name}（${s.label}・serviceIndex: ${i}）`)
    .join("\n");

  const priceSection = topic.priceInfo
    ? `\n【車両価格・購入費用の参考データ（記事内で必ず活用すること）】\n${topic.priceInfo}\n`
    : "";

  const relatedSection = existingArticles.length > 0
    ? `\n【内部リンク用・既存記事（関連する記事があれば related_articles ブロックで挿入）】\n${existingArticles.map((a) => `- slug: "${a.slug}" | タイトル: ${a.title}`).join("\n")}\n`
    : "";

  const ctaServiceIndex = topic.insuranceArticle ? 3 : 0;
  const ctaNote = topic.insuranceArticle
    ? `CTAは service_cta（serviceIndex: 3）を序盤・中盤・末尾に配置`
    : `CTAは service_cta（serviceIndex: 0）を序盤・中盤・末尾に配置`;

  return `以下の記事テーマで、自動車アフィリエイト記事を作成してください。

【記事テーマ】
${topic.theme}

【ターゲットキーワード】
${topic.keywords}

【読者の検索意図】
${topic.intent}
${priceSection}${relatedSection}
【推奨するサービス（アフィリエイト誘導先）】
${serviceList}

【記事構成の必須要件】
1. 冒頭に「この記事でわかること」をcalloutブロックで提示
2. ${ctaNote}（序盤・中盤・末尾の3箇所）
3. 記事末尾付近に必ずfaqブロックを1つ設置（3〜5問）
4. experienceブロックを1〜2箇所、自然な位置に配置
5. まとめセクションで推奨サービスへの申し込みを自然にクロージング

【記事の分量・品質要件】
- 見出し（heading2）は5〜8個
- 具体的な数値・金額・年式・車名を積極的に盛り込む
- 本文はparagraph・heading・steps・definition_list・calloutを中心に構成する
- list・table・bar_chartは必要性を厳しく判断してから使う（不要なら使わない）

【出力形式】
以下のJSON形式のみで出力してください。コードブロック（\`\`\`json）で囲むこと。

{
  "slug": "記事のURLスラッグ（英小文字・ハイフン区切り）",
  "title": "記事タイトル（32文字以内・キーワードを含む）",
  "excerpt": "記事の要約（120文字以内・検索結果に表示される説明文・キーワードを自然に含める）",
  "category": "カテゴリ名（車買取 / 乗り換え / 査定コツ / 一括査定 / 軽自動車 / SUV / EV / 節約術 / 自動車保険 / 新車情報 のいずれか）",
  "emoji": "記事内容に合う絵文字1つ",
  "publishedAt": "${today}",
  "content": [
    { "type": "callout", "emoji": "📋", "text": "この記事でわかること（3〜4項目・プレーンテキスト）" },
    { "type": "heading2", "text": "見出し（プレーンテキスト）" },
    { "type": "paragraph", "text": "本文テキスト（です。ます。調・装飾記号なし）" },
    { "type": "service_cta", "serviceIndex": ${ctaServiceIndex} },
    { "type": "steps", "items": [{ "title": "ステップのタイトル", "description": "ステップの説明文" }] },
    { "type": "definition_list", "items": [{ "term": "名称・項目名", "description": "説明文" }] },
    { "type": "callout", "emoji": "⚠️", "text": "注意・ポイント" },
    { "type": "heading3", "text": "小見出し" },
    { "type": "faq", "items": [{ "question": "よくある質問", "answer": "回答文（です。ます。調・2〜4文）" }] },
    { "type": "experience", "text": "編集部の体験談（です。ます。調・具体的な数値を含む）", "result": "結果を1文で" },
    { "type": "related_articles", "items": [{ "slug": "既存記事のslug", "title": "既存記事のタイトル" }] }
  ]
}

【list・table・bar_chartの使用判断基準】
- list: 「〜な5つのポイント」「チェックリスト」など、明示的に箇条書きが自然な場合のみ使用。1記事に最大2箇所
- table: 複数の車種・サービスを同じ項目で比較する場合のみ使用。1記事に最大1個
- bar_chart: 速度・評価スコアなど数値の大小を視覚化する場合のみ使用。1記事に最大1個
- table と bar_chart は同一記事で両方使わない
- bar_chartのcolor: bg-blue-400 / bg-red-400 / bg-green-400 / bg-orange-400 / bg-gray-400`;
}

// ──────────────────────────────────────────────
// メイン処理
// ──────────────────────────────────────────────
async function main(): Promise<void> {
  const today = new Date().toISOString().split("T")[0];
  const existingArticles = getExistingArticles();
  const existingTitles = existingArticles.map((a) => a.title);

  console.log(`\n🔍 Phase 0: トピック生成中...`);
  console.log(`   既存記事数: ${existingArticles.length}件`);

  const topic = await generateTopic(existingTitles, today);
  console.log(`✅ テーマ決定: ${topic.theme}`);
  console.log(`   キーワード: ${topic.keywords}`);
  console.log(`   生成日: ${today}\n`);

  console.log(`📝 Phase 1: 記事生成中...`);
  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: ARTICLE_SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildArticlePrompt(topic, existingArticles, today) }],
  });

  const text = response.content[0].type === "text" ? response.content[0].text : "";

  const match = text.match(/```json\n([\s\S]*?)\n```/);
  if (!match) {
    console.error("❌ JSONの抽出に失敗しました。レスポンス:\n", text);
    process.exit(1);
  }

  const article = JSON.parse(match[1]);
  article.authorId = topic.insuranceArticle ? "sato-misaki" : "yamada-kenta";

  // related_articles を既存記事のみに絞り込む
  const existingSlugs = getExistingSlugs();
  if (Array.isArray(article.content)) {
    for (const block of article.content) {
      if (block.type === "related_articles" && Array.isArray(block.items)) {
        block.items = block.items.filter((item: { slug: string }) => existingSlugs.has(item.slug));
      }
    }
    article.content = article.content.filter(
      (block: { type: string; items?: unknown[] }) =>
        block.type !== "related_articles" || (Array.isArray(block.items) && block.items.length > 0)
    );
  }

  // スラッグの日本語・特殊文字を除去
  let slug = (article.slug as string)
    .replace(/[^\x00-\x7F]/g, "")
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || `article-${Date.now()}`;
  article.slug = slug;

  let outputPath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (fs.existsSync(outputPath)) {
    slug = `${slug}-${Date.now()}`;
    article.slug = slug;
    outputPath = path.join(ARTICLES_DIR, `${slug}.json`);
    console.log(`⚠️  スラッグが重複したため変更: ${slug}`);
  }

  // サムネイル画像生成
  if (process.env.GOOGLE_AI_API_KEY) {
    const imageUrl = await generateArticleImage(slug, article.title, article.category);
    if (imageUrl) article.imageUrl = imageUrl;
  } else {
    console.log("ℹ️  GOOGLE_AI_API_KEY が未設定のため、画像生成をスキップします");
  }

  // 保存
  fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(article, null, 2), "utf-8");

  console.log(`✅ 記事を保存しました: content/articles/${slug}.json`);
  console.log(`   タイトル : ${article.title}`);
  console.log(`   カテゴリ : ${article.category}`);
  console.log(`   本文ブロック数: ${(article.content as unknown[]).length}`);

  await notifyIndexNow(slug);
}

async function notifyIndexNow(slug: string): Promise<void> {
  const SITE = "https://kurumacow.com";
  const KEY = "e9c3417bb7fc82edc55185015589377b";
  const url = `${SITE}/blog/${slug}/`;

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "kurumacow.com",
        key: KEY,
        keyLocation: `${SITE}/${KEY}.txt`,
        urlList: [url],
      }),
    });
    if (res.ok || res.status === 202) {
      console.log(`🔍 IndexNow 通知送信: ${url} (${res.status})`);
    } else {
      console.warn(`⚠️  IndexNow 通知失敗: ${res.status}`);
    }
  } catch (err) {
    console.warn("⚠️  IndexNow 通知エラー（スキップ）:", (err as Error).message);
  }
}

main().catch((err) => {
  console.error("エラー:", err);
  process.exit(1);
});
