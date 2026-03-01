import { NextResponse } from 'next/server';

// 直近の診断結果（初期はモックデータ）
const recentResults = [
    { destination: 'ジョージア・トビリシの丘の上にある洞窟都市ウプリスツィヘ', type: '都市の迷走者', emoji: '🌆' },
    { destination: 'モンゴル・ゴビ砂漠のテルヒン・ツァガーン湖周辺', type: '孤独な地平線ウォーカー', emoji: '🌄' },
    { destination: 'エチオピア・ダナキル砂漠の溶岩湖と塩の砂漠', type: '緻密な秘境探検家', emoji: '🗺️' },
    { destination: 'スロベニア・ブレッド湖畔の古城と洞窟群', type: '静寂の庭園旅行者', emoji: '🌸' },
    { destination: 'キルギスタンの天山山脈・ソン・クル高原のユルタ村', type: '孤独な地平線ウォーカー', emoji: '🌄' },
    { destination: 'ポルトガル・アレンテージョ地方のコルク林の農家ホテル', type: '内向きノマド', emoji: '☕' },
    { destination: 'フィリピン・バタネス諸島の断崖と石造りの古民家集落', type: '秘境ガイド（自称）', emoji: '🧭' },
    { destination: 'アルメニア・エレバン近郊のゲガルト修道院と温泉村', type: '都市型冒険グループリーダー', emoji: '🌍' },
    { destination: 'ナミビア・エトーシャ国立公園とスケルトン・コースト', type: '無計画冒険隊長', emoji: '🎒' },
    { destination: 'スリランカ内陸部・ハパタレの茶畑と滝の秘境トレイル', type: '秘境ガイド（自称）', emoji: '🧭' },
    { destination: 'ルーマニア・マラムレシュ地方の木造教会と牧歌的農村', type: '仲良しのんびり旅団', emoji: '🌅' },
    { destination: 'コロンビア・コーヒー産地「コーヒーの三角地帯」', type: 'ソロ・アーバン・パーフェクショニスト', emoji: '🏛️' },
    { destination: 'ウズベキスタン・サマルカンドのティムール朝の遺跡群', type: 'アンダーグラウンド・シティハンター', emoji: '🏙️' },
    { destination: 'ボリビア・ウユニ塩湖の水鏡と星空', type: '仲良しのんびり旅団', emoji: '🌅' },
    { destination: 'イラン・シーラーズのナシル・オルモルク・モスク（ピンクモスク）', type: 'アンダーグラウンド・シティハンター', emoji: '🏙️' },
    { destination: 'ニュージーランド南島フィヨルドランドの秘境クルーズ', type: '緻密な秘境探検家', emoji: '🗺️' },
    { destination: 'ラオス・シーパンドン（4000の島々）のハンモックと滝', type: '旅するパーティーピープル', emoji: '🎉' },
    { destination: 'モロッコ・フェズのメディナ迷宮と革のなめし場', type: '都市の迷走者', emoji: '🌆' },
    { destination: 'アルバニア・ヒマラ海岸の廃墟バンカーと透明な海', type: '都市型冒険グループリーダー', emoji: '🌍' },
    { destination: 'タジキスタン・パミール高原越えのハイウェイ4655km', type: '緻密な秘境探検家', emoji: '🗺️' },
];

export async function GET() {
    return NextResponse.json({ results: recentResults });
}
