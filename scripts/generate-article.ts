/**
 * 記事自動生成スクリプト（kurumacow 自動車アフィリエイト）
 *
 * 使い方:
 *   npx tsx scripts/generate-article.ts          # topics[0] で生成
 *   npx tsx scripts/generate-article.ts 3        # topics[3] で生成
 */

import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { topics } from "./topics";
import { services } from "../lib/data";
import { generateArticleImage } from "./generate-image";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const ARTICLES_DIR = path.join(process.cwd(), "content/articles");

// ──────────────────────────────────────────────
// システムプロンプト
// ──────────────────────────────────────────────
const SYSTEM_PROMPT = `あなたは自動車業界に10年以上携わる中古車・車買取の専門家です。
車の売却・乗り換え・査定・買取サービスの比較に精通しており、
読者が愛車を最高額で売却して満足のいく乗り換えができるよう、正確でわかりやすい情報を提供します。

【ターゲット読者】
車の乗り換えを具体的に検討しているユーザー。
「今の車をできるだけ高く売りたい」「どの買取業者がいいか知りたい」「乗り換えで損したくない」という意思があり、
一括査定サービスへの申し込みを決める段階にある。

【文体・口調の絶対ルール】
- すべての文章を「です。ます。」調（敬体）で書く。「〜だ」「〜である」「〜になる」などの常体は使わない
- 読者への呼びかけは「あなた」ではなく「ご自身」「お客様」または主語を省く
- 文末は「〜です。」「〜ます。」「〜でしょう。」「〜ください。」のみ使用する

【使用禁止の記号・表現】
- paragraph・list・callout・steps・definition_list のテキストで以下を使わない
  - ** （アスタリスク2つによる太字記法）
  - == （イコール2つによるマーカー記法）
  - * や _ などのMarkdown装飾記号一切
  - 「〜！」などの感嘆符
  - 「〜笑」「（笑）」などのくだけた表現
- これらの装飾記号はJSON内のどのフィールドにも使用しない

【ライティング方針】
- 読者はすでに行動意思がある前提で書く
- 専門用語には必ずわかりやすい補足を入れる
- 押しつけがましくならず自然に背中を押す（「〜すべきです」ではなく「〜がおすすめです」）
- 「申し込まない理由をなくす」構成にする
- 事実と根拠をセットで書く（「安い」ではなく「月々19,000円から乗れます」）
- キャンペーン情報は自然に触れる程度にとどめ過度な煽りは避ける
- 「〜しましょう！」「〜ですね！」など過剰なフレンドリー表現を避ける
- 「この記事では〜」「筆者が〜」などAIらしい前置きを使わない
- 自然な人間のライターが書いたような、読みやすく簡潔な文体にする
- 箇条書きの先頭に「・」「•」「-」「STEP X：」などを使わない（itemsの配列に入れるだけ）
- list の各itemに「名前：説明」の"タイトル＋コロン＋説明"形式を使わない
- list は1記事3〜4箇所まで。1つのlistは3〜6個に抑える
- 手順・ステップは list ではなく steps ブロックを使う
- 「名称：説明文」の対応関係は definition_list ブロックを使う

【テキスト装飾ルール】
- paragraph・list・callout・steps・definition_list のテキストには装飾記法を一切使わない（プレーンテキストのみ）
- heading2 / heading3 / table / bar_chart のテキストも同様にプレーンテキストのみ

【SEO方針】
- 記事タイトルと各見出しにターゲットキーワードを自然に含める
- 「結論→理由→根拠→補足」の順で書く
- 各セクションの冒頭1〜2文で要点をまとめる
- 数値・固有名詞・比較データを積極的に使う

【アフィリエイト方針】
- 記事テーマに最も適したサービスを自然に訴求する
- CTAは記事の序盤・中盤・末尾の3箇所に配置する
- まとめでは推奨サービスのメリットを簡潔にまとめ自然なクロージングにする`;

// ──────────────────────────────────────────────
// ユーザープロンプト構築
// ──────────────────────────────────────────────
function buildUserPrompt(topic: (typeof topics)[0], today: string): string {
  const serviceList = services
    .map(
      (s, i) =>
        `- 第${i + 1}位：${s.name}（${s.label}・serviceIndex: ${i}）`
    )
    .join("\n");

  return `以下の記事テーマで、自動車アフィリエイト記事を作成してください。

【記事テーマ】
${topic.theme}

【ターゲットキーワード】
${topic.keywords}

【読者の検索意図】
${topic.intent}

【推奨するサービス（アフィリエイト誘導先）】
${serviceList}

【記事構成の必須要件】
1. 冒頭に「この記事でわかること」をcalloutブロックで提示
2. 序盤（導入後）に service_cta（serviceIndex: 0）を1回挿入
3. 本文中盤に service_cta（serviceIndex: 0 or 1）を1〜2回挿入
4. 末尾のまとめの直前に service_cta（serviceIndex: 0）を挿入
5. まとめセクションで推奨サービスへの申し込みを自然にクロージング

【出力形式】
以下のJSON形式のみで出力してください。コードブロック（\`\`\`json）で囲むこと。

{
  "slug": "記事のURLスラッグ（英小文字・ハイフン区切り）",
  "title": "記事タイトル（32文字以内・キーワードを含む）",
  "excerpt": "記事の要約（60文字以内・検索結果に表示される説明文）",
  "category": "カテゴリ名（車買取 / 乗り換え / 査定コツ / 一括査定 / 軽自動車 / SUV / EV / 節約術 のいずれか）",
  "emoji": "記事内容に合う絵文字1つ",
  "publishedAt": "${today}",
  "content": [
    { "type": "callout", "emoji": "📋", "text": "この記事でわかること（箇条書き形式で3〜4項目・プレーンテキストのみ）" },
    { "type": "heading2", "text": "見出し（プレーンテキストのみ）" },
    { "type": "paragraph", "text": "本文テキスト（装飾記号なし・です。ます。調）" },
    { "type": "list", "items": ["箇条書き1（プレーンテキスト）", "箇条書き2（プレーンテキスト）"] },
    { "type": "service_cta", "serviceIndex": 0 },
    { "type": "steps", "items": [{ "title": "ステップのタイトル", "description": "ステップの説明文" }] },
    { "type": "definition_list", "items": [{ "term": "名称・項目名", "description": "説明文" }] },
    { "type": "table", "headers": ["比較項目", "サービスA", "サービスB"], "rows": [["月額料金", "〇〇円", "〇〇円"]] },
    { "type": "bar_chart", "title": "グラフタイトル", "items": [{ "label": "項目名", "value": 897, "unit": "Mbps", "color": "bg-blue-400" }] },
    { "type": "heading3", "text": "小見出し" }
  ]
}

【MOTA車買取に関する表記ルール（厳守）】
- 「最大20社」と表記する（45社は誤り）
- 「電話ラッシュなし」は必ず「数十社からの電話ラッシュなし（※最多で上位3社からの電話はあります）」と注釈付きで書く
- 「査定額」ではなく「概算査定額」と表記する
- 「最高額で売れる」「必ず高値で売れる」などの断定表現は使わない
- 「高値で売ろう」「高く売りたい方へ」などの訴求表現はOK
- 「平均〇万円UP」「平均〇〇円高く売れた」など具体的な金額を根拠なく記載しない
- 数値を使う場合は「ディーラー下取りより高値になるケースが多い」などの表現にとどめる

【表・グラフの使用ガイドライン】
- table と bar_chart は必要な記事にだけ使う
- 複数サービスや車種を比較する記事には table が効果的
- 数値の大小を視覚的に見せる場合のみ bar_chart を使う
- bar_chart の color は bg-blue-400 / bg-red-400 / bg-green-400 / bg-orange-400 / bg-gray-400 のいずれか
- 1記事に table と bar_chart は合計1〜2個まで`;
}

// ──────────────────────────────────────────────
// メイン処理
// ──────────────────────────────────────────────
function getUsedTopicIndices(): Set<number> {
  if (!fs.existsSync(ARTICLES_DIR)) return new Set();
  const used = new Set<number>();
  for (const file of fs.readdirSync(ARTICLES_DIR)) {
    if (!file.endsWith(".json")) continue;
    try {
      const data = JSON.parse(fs.readFileSync(path.join(ARTICLES_DIR, file), "utf-8"));
      if (typeof data.topicIndex === "number") used.add(data.topicIndex);
    } catch { /* skip */ }
  }
  return used;
}

async function generateArticle(topicIndex: number): Promise<void> {
  const topic = topics[topicIndex];
  if (!topic) {
    console.error(`トピックが見つかりません: index ${topicIndex}`);
    process.exit(1);
  }

  // 同じトピックの記事が既に存在する場合はスキップ
  const usedIndices = getUsedTopicIndices();
  if (usedIndices.has(topicIndex)) {
    console.log(`⏭️  トピック[${topicIndex}]「${topic.theme}」の記事は既に生成済みです。スキップします。`);
    process.exit(0);
  }

  const today = new Date().toISOString().split("T")[0];
  console.log(`\n📝 記事生成開始: ${topic.theme}`);
  console.log(`   キーワード: ${topic.keywords}`);
  console.log(`   生成日: ${today}\n`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8192,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: buildUserPrompt(topic, today) }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  // JSONを抽出
  const match = text.match(/```json\n([\s\S]*?)\n```/);
  if (!match) {
    console.error("❌ JSONの抽出に失敗しました。レスポンス:\n", text);
    process.exit(1);
  }

  const article = JSON.parse(match[1]);
  article.topicIndex = topicIndex;

  // スラッグの重複チェック
  let slug = article.slug as string;

  let outputPath = path.join(ARTICLES_DIR, `${slug}.json`);
  if (fs.existsSync(outputPath)) {
    slug = `${slug}-${Date.now()}`;
    article.slug = slug;
    outputPath = path.join(ARTICLES_DIR, `${slug}.json`);
    console.log(`⚠️  スラッグが重複したため変更: ${slug}`);
  }

  // サムネイル画像生成（GOOGLE_AI_API_KEY がある場合のみ）
  if (process.env.GOOGLE_AI_API_KEY) {
    const imageUrl = await generateArticleImage(slug, article.title, article.category);
    if (imageUrl) {
      article.imageUrl = imageUrl;
    }
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
  console.log(`\n次のステップ:`);
  console.log(`  npm run build  → ビルド確認`);
  console.log(`  git add content/articles/${slug}.json && git commit -m "add article" && git push`);
}

// エントリポイント
const topicIndex = parseInt(process.argv[2] ?? "0", 10);
generateArticle(topicIndex).catch((err) => {
  console.error("エラー:", err);
  process.exit(1);
});
