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

【自動車保険記事の執筆ガイドライン】
- 保険料の目安は「年齢・車種・等級によって異なる」と明記し、具体的な金額は断定しない
- 一括見積もりのメリット（複数社比較で保険料を下げられる可能性）を自然に訴求する
- 乗り換えや新車購入のタイミングが保険見直しの好機であることを組み込む
- 「必ず安くなる」などの断定表現は使わず「安くなる可能性があります」と表現する
- インズウェブは無料で最大20社以上を比較できるサービスとして紹介する

【車種別・年収・ローン記事の執筆ガイドライン】
- 年収の目安は「車両価格の0.5倍以内が年収」という一般的な指標を使う
- ローン計算は「車両価格×1.1（諸費用込み）÷ 返済月数」で概算を示す
- 維持費の目安：自動車税・任意保険・ガソリン代・車検費用を年間費用として概算を示す
- 具体的な価格データが提供されている場合はそれを必ず活用する
- 「この年収なら買える・難しい」という明確な判断軸を示す
- 乗り換えにあたって「今乗っている車を売って頭金にする」という流れを自然に組み込む

【アフィリエイト方針】
- 記事テーマに最も適したサービスを自然に訴求する
- CTAは記事の序盤・中盤・末尾の3箇所に配置する
- まとめでは推奨サービスのメリットを簡潔にまとめ自然なクロージングにする`;

// ──────────────────────────────────────────────
// ユーザープロンプト構築
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

function buildUserPrompt(topic: (typeof topics)[0], today: string): string {
  const serviceList = services
    .map(
      (s, i) =>
        `- 第${i + 1}位：${s.name}（${s.label}・serviceIndex: ${i}）`
    )
    .join("\n");

  const priceSection = topic.priceInfo
    ? `\n【車両価格・購入費用の参考データ（記事内で必ず活用すること）】\n${topic.priceInfo}\n`
    : "";

  const existingArticles = getExistingArticles();
  const relatedSection = existingArticles.length > 0
    ? `\n【内部リンク用・既存記事一覧（関連する記事があれば related_articles ブロックで自然な位置に挿入すること）】\n${existingArticles.map((a) => `- slug: "${a.slug}" | タイトル: ${a.title}`).join("\n")}\n`
    : "";

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

${topic.insuranceArticle ? `【記事構成の必須要件】
1. 冒頭に「この記事でわかること」をcalloutブロックで提示
2. 序盤（導入後）に service_cta（serviceIndex: 3）を1回挿入
3. 本文中盤に service_cta（serviceIndex: 3）を1〜2回挿入
4. 末尾のまとめの直前に service_cta（serviceIndex: 3）を挿入
5. まとめセクションで保険一括見積もりへの申し込みを自然にクロージング` : `【記事構成の必須要件】
1. 冒頭に「この記事でわかること」をcalloutブロックで提示
2. 序盤（導入後）に service_cta（serviceIndex: 0）を1回挿入
3. 本文中盤に service_cta（serviceIndex: 0 or 1）を1〜2回挿入
4. 末尾のまとめの直前に service_cta（serviceIndex: 0）を挿入
5. まとめセクションで推奨サービスへの申し込みを自然にクロージング`}

【記事の分量・品質要件】
- 本文の合計文字数は2,500文字以上を目標にする
- 見出し（heading2）は5〜8個用意し、各セクションに十分な情報量を持たせる
- 具体的な数値・金額・年式・車名を積極的に盛り込む
- 読者が「この記事を読んで損した」と感じない情報密度を保つ
- 記事の末尾付近に必ずFAQブロック（よくある質問）を1つ設置する（3〜5問）

【体験談ブロック（experience）の必須要件】
- 記事内に必ず1〜2箇所、experienceブロックを自然な位置に配置する
- 編集部または著者が実際にサービスを使った・調査した体験として書く
- 具体的な数値を含める（例：査定額の差額、所要時間、電話件数、比較社数など）
- 「です。ます。」調の一人称で、リアルで参考になる内容にする
- resultフィールドには結果を簡潔に1文で書く（例：「ディーラー下取りより17万円高い査定額が提示されました」）

【出力形式】
以下のJSON形式のみで出力してください。コードブロック（\`\`\`json）で囲むこと。

{
  "slug": "記事のURLスラッグ（英小文字・ハイフン区切り）",
  "title": "記事タイトル（32文字以内・キーワードを含む）",
  "excerpt": "記事の要約（120文字以内・検索結果に表示される説明文・キーワードを自然に含める）",
  "category": "カテゴリ名（車買取 / 乗り換え / 査定コツ / 一括査定 / 軽自動車 / SUV / EV / 節約術 / 自動車保険 のいずれか）",
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
    { "type": "heading3", "text": "小見出し" },
    { "type": "related_articles", "items": [{ "slug": "既存記事のslug", "title": "既存記事のタイトル" }] },
    { "type": "faq", "items": [{ "question": "よくある質問の文章", "answer": "回答文（です。ます。調・2〜4文）" }] },
    { "type": "experience", "text": "編集部の体験談（です。ます。調・2〜4文・具体的な数値を含む）", "result": "結果を1文で（省略可）" }
  ]
}

【車選びドットコム買取に関する表記ルール（厳守）】
- 「全国300社以上から最大10社を比較」と表記する
- 複数社から電話が来る可能性があることを正直に書く（「複数の買取業者から連絡が届きます」）
- 「必ず高値で売れる」などの断定表現は使わない
- 「高値で売ろう」「高く売りたい方へ」などの訴求表現はOK
- 「平均〇万円UP」など具体的な金額を根拠なく記載しない
- 数値を使う場合は「ディーラー下取りより高値になるケースが多い」などの表現にとどめる
- 利用は完全無料・売却は任意という安心感を自然に盛り込む

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

function findNextTopicIndex(requested: number): number {
  const used = getUsedTopicIndices();
  // 指定インデックスが未使用ならそのまま使う
  if (!used.has(requested)) return requested;
  // 使用済みならインデックス0から順に未使用を探す
  for (let i = 0; i < topics.length; i++) {
    if (!used.has(i)) return i;
  }
  return -1; // 全トピック生成済み
}

async function generateArticle(requestedIndex: number): Promise<void> {
  const topicIndex = findNextTopicIndex(requestedIndex);

  if (topicIndex === -1) {
    console.log("✅ 全トピックの記事が生成済みです。スキップします。");
    process.exit(0);
  }

  if (topicIndex !== requestedIndex) {
    console.log(`ℹ️  トピック[${requestedIndex}]は生成済みのため、次の未使用トピック[${topicIndex}]を使用します。`);
  }

  const topic = topics[topicIndex];
  if (!topic) {
    console.error(`トピックが見つかりません: index ${topicIndex}`);
    process.exit(1);
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
  article.authorId = topic.insuranceArticle ? "sato-misaki" : "yamada-kenta";

  // related_articles を既存記事のみに絞り込む
  const existingSlugs = getExistingSlugs();
  if (Array.isArray(article.content)) {
    for (const block of article.content) {
      if (block.type === "related_articles" && Array.isArray(block.items)) {
        block.items = block.items.filter((item: { slug: string }) => existingSlugs.has(item.slug));
      }
    }
    // items が空になった related_articles ブロックを除去
    article.content = article.content.filter(
      (block: { type: string; items?: unknown[] }) =>
        block.type !== "related_articles" || (Array.isArray(block.items) && block.items.length > 0)
    );
  }

  // スラッグの日本語・特殊文字を除去（英小文字・数字・ハイフンのみ許可）
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

  // IndexNow 通知（デプロイ後に検索エンジンへ通知）
  await notifyIndexNow(slug);

  console.log(`\n次のステップ:`);
  console.log(`  npm run build  → ビルド確認`);
  console.log(`  git add content/articles/${slug}.json && git commit -m "add article" && git push`);
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

// エントリポイント
const topicIndex = parseInt(process.argv[2] ?? "0", 10);
generateArticle(topicIndex).catch((err) => {
  console.error("エラー:", err);
  process.exit(1);
});
