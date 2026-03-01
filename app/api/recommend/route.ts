import { NextRequest, NextResponse } from 'next/server';
import { geminiModel } from '@/lib/gemini';
import { travelerTypes, calcTravelerType } from '@/data/travelerTypes';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { answers } = body;

    if (!answers) {
      return NextResponse.json({ error: 'answers required' }, { status: 400 });
    }

    const typeId = calcTravelerType(answers);
    const travelerType = travelerTypes[typeId];

    const mode = answers.q_mode || 'normal';
    const budget = answers.q_budget || 'under10';
    const days = answers.q_days || 'week';
    const purpose = (answers.q_purpose || []).join(', ');
    const avoid = (answers.q_avoid || []).join(', ');

    const modeInstruction = mode === 'spicy'
      ? 'あなたは辛口で毒舌な旅行ガイドです。褒めるより鋭いツッコミを入れながらも、的確な提案をします。ため口で話し、ちょっと失礼なくらいのコメントを入れてください。'
      : mode === 'funny'
        ? 'あなたはお笑い芸人スタイルの旅行ガイドです。ボケとツッコミを交えながら、笑えるコメントで旅行先を提案します。'
        : 'あなたは親切で情熱的な旅行ガイドです。ユーザーの旅行先への期待感を高めるような温かいコメントをします。';

    const prompt = `
${modeInstruction}

ユーザーの旅人タイプは「${travelerType.name}（${typeId}型）」です。
タイプの説明：${travelerType.description}

ユーザーの条件：
- 予算：${budget}
- 旅行日数：${days}
- 求めるもの：${purpose || 'なし'}
- 避けたい環境：${avoid || 'なし'}

以下のJSON形式で、パーソナライズされた旅行先の提案を返してください。

必ず以下の条件を守ること：
- 【重要】絶対に実在する国・都市・エリア・施設のみを提案すること（架空の地名や施設名は絶対に禁止）。
- メイン旅行先は1つ（国・都市・エリア）
- サブ旅行先は2つ（少しだけ違うテイストで）
- 危険地域（戦争中の国など）は除外か、個人の責任で注意書きを追加
- 提案先は「意外だけど知ってる」と「完全にニッチ」を混ぜること
- 国内（日本）のみで満足しそうなユーザーには、ユニークなコメントを追加

JSONのみを返してください（コードブロック不要）：
{
  "mainDestination": {
    "name": "旅行先の正式名称（例：ジョージア共和国・トビリシ）",
    "emoji": "国旗or関連絵文字",
    "reason": "なぜこの旅行先があなたにぴったりなのか（200字程度）",
    "spots": [
      { "name": "スポット名", "description": "50字程度の説明" },
      { "name": "スポット名", "description": "50字程度の説明" },
      { "name": "スポット名", "description": "50字程度の説明" }
    ],
    "budget": "予算目安（例：往復航空券8〜12万円、宿1泊3,000〜6,000円）",
    "bestSeason": "おすすめ時期",
    "warningNote": "危険・注意がある場合のみ記載（なければnull）",
    "searchQuery": "Trip.comやBooking.comで検索するための英語キーワード（例：Tbilisi Georgia hotel）"
  },
  "subDestinations": [
    {
      "name": "サブ旅行先1",
      "emoji": "絵文字",
      "reason": "100字程度"
    },
    {
      "name": "サブ旅行先2",
      "emoji": "絵文字",
      "reason": "100字程度"
    }
  ],
  "personalComment": "旅人タイプに合わせたパーソナルコメント（${mode === 'spicy' ? '辛口・毒舌で' : mode === 'funny' ? '笑えるボケツッコミで' : '温かく'}200〜300字）",
  "isJapanOnly": false
}
`;

    const result = await geminiModel.generateContent(prompt);
    const text = result.response.text();

    // JSON部分を抽出
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
    }

    const recommendation = JSON.parse(jsonMatch[0]);

    return NextResponse.json({
      typeId,
      travelerType,
      recommendation,
    });
  } catch (error: any) {
    console.error('Recommend API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to generate recommendation',
        details: error?.message || String(error)
      },
      { status: 500 }
    );
  }
}
