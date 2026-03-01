export type TravelerTypeId =
    | 'CSNP' | 'CSNF' | 'CSUP' | 'CSUF'
    | 'CGNP' | 'CGNF' | 'CGUP' | 'CGUF'
    | 'WSNP' | 'WSNF' | 'WSUP' | 'WSUF'
    | 'WGNP' | 'WGNF' | 'WGUP' | 'WGUF';

export interface TravelerType {
    id: TravelerTypeId;
    name: string;
    emoji: string;
    tagline: string;
    description: string;
    primaryDestinations: string[];
    color: string;
}

export const travelerTypes: Record<TravelerTypeId, TravelerType> = {
    WSNF: {
        id: 'WSNF',
        name: '孤独な地平線ウォーカー',
        emoji: '🌄',
        tagline: '地図のない場所を、ひとりで歩く自由人',
        description: 'あなたが求めているのは旅行じゃなくて、たぶん"逃亡"だ。Wi-Fiよりも星空を選び、ガイドブックより地元のおじいさんの話を信じる。計画は邪魔なものだと知っている。なんならバスを乗り間違えてたどり着いた村の方が、目的地より100倍面白いと知っている。その直感、大事にしろ。',
        primaryDestinations: ['モンゴル・ゴビ砂漠', 'エチオピア・オモ渓谷', 'キルギスの草原', 'パプアニューギニア高地'],
        color: 'from-amber-900 to-amber-600',
    },
    WSNP: {
        id: 'WSNP',
        name: '緻密な秘境探検家',
        emoji: '🗺️',
        tagline: '計画は命綱。でも目的地は誰も知らない場所',
        description: '秘境に行きたいが、無計画で死にたくはない。それは至極まっとうな判断だ。あなたはルートを10回調べてから、あえて誰も行かない場所を選ぶ。リスクは管理するが、冒険は諦めない。その慎重さが、生還率を上げる。',
        primaryDestinations: ['ブータン・ハ渓谷', 'タジキスタン・パミール高原', 'イエメン・ソコトラ島（注意書きあり）', 'ミャンマー・チン州'],
        color: 'from-emerald-900 to-emerald-600',
    },
    WSUF: {
        id: 'WSUF',
        name: '都市の迷走者',
        emoji: '🌆',
        tagline: '世界の路地裏に、意味もなく迷い込む',
        description: 'どこに行くか決めないまま空港に着く。それがあなたのスタイル。地図も使わず、ただ面白そうな路地を選び続ける。観光地は通り過ぎ、地元民しかいない食堂に座る。旅の最後には「なんかよかった」という感想しかないが、それで十分だ。',
        primaryDestinations: ['ジョージア・トビリシ', 'モロッコ・フェズの旧市街', 'ベトナム・ホイアン', 'ポルトガル・ポルト'],
        color: 'from-violet-900 to-violet-600',
    },
    WSUP: {
        id: 'WSUP',
        name: 'アンダーグラウンド・シティハンター',
        emoji: '🏙️',
        tagline: 'ガイドブックが黒塗りにした都市を制覇する',
        description: 'メジャーな観光地には目もくれない。最高の旅先は、普通の旅行者が「え、そこ行けるの？」と目を見開く場所だ。念入りに調べて、ガイドが知らない路地の店を予約する。旅の準備時間は旅の時間より長い。',
        primaryDestinations: ['イラン・シーラーズ', 'ウズベキスタン・サマルカンド', 'コソボ・プリシュティナ', 'アルバニア・ベラト'],
        color: 'from-indigo-900 to-indigo-600',
    },
    CSNF: {
        id: 'CSNF',
        name: '内向きノマド',
        emoji: '☕',
        tagline: 'ひとりで、ゆっくり、深く沈む旅をする',
        description: 'ツアーも混雑も要らない。カフェの片隅でその街を観察しながら半日潰せる人間だ。計画なんて立てたらその通りにしなきゃいけないからしない。気分で動き、気分で帰る。「効率的な旅」という概念を憎んでいる。',
        primaryDestinations: ['スロベニア・リュブリャナ', 'コロンビア・メデジン', 'チェコ・オロモウツ', '台湾・台南'],
        color: 'from-rose-900 to-rose-600',
    },
    CSNP: {
        id: 'CSNP',
        name: '静寂の庭園旅行者',
        emoji: '🌸',
        tagline: '美しい場所を、ひとりで、正しく味わう',
        description: '事前調査は完璧。混雑を避けた時間帯に行き、一番いい角度から写真を撮ることを知っている。一見計画的に見えるが、その実あなたは「静かに美しいものを独占したい」だけだ。その欲求は正直で、清らかだ。',
        primaryDestinations: ['日本・奥出雲', 'スロバキア・バンスカー・ビストリツァ', 'ラトビア・チェーシス', 'ニュージーランド南島'],
        color: 'from-pink-900 to-pink-600',
    },
    CSUF: {
        id: 'CSUF',
        name: '風まかせ一人旅人',
        emoji: '🍃',
        tagline: '行き先も日数も「なんとなく」で全部決まる',
        description: '旅の哲学はシンプルだ。「なんとかなる」。実際なんとかなってきた。帰りのチケットは持っているが、使う気があるかは旅に行ってから考える。安全圏の中での最大限の自由を探している。',
        primaryDestinations: ['バルカン半島一周', 'バルト三国', 'メキシコ・オアハカ', 'ペルー・クスコ周辺'],
        color: 'from-teal-900 to-teal-600',
    },
    CSUP: {
        id: 'CSUP',
        name: 'ソロ・アーバン・パーフェクショニスト',
        emoji: '🏛️',
        tagline: 'ひとりで都市を完全攻略する',
        description: 'ひとり旅を選ぶのは、自分のペースで全てを制覇したいからだ。美術館を全フロア見て、レストランを事前予約して、最高のホテルを最安値で取る。旅を「完成させる」という感覚がある。',
        primaryDestinations: ['スペイン・ビルバオ', 'オーストリア・ウィーン', 'シンガポール', '韓国・釜山'],
        color: 'from-cyan-900 to-cyan-600',
    },
    WGNF: {
        id: 'WGNF',
        name: '無計画冒険隊長',
        emoji: '🎒',
        tagline: '友達を巻き込んで、とんでもないところに連れて行く',
        description: 'あなたが「面白い旅しようよ」と言った瞬間、みんなが少し不安になる。でも最終的には最高の経験になる。計画ゼロで秘境に友達を連れ込む能力は、特殊技能だ。謝らなくていい。',
        primaryDestinations: ['カザフスタン・アルマティ', 'ナミビア・エトーシャ', 'ルーマニア・マラムレシュ', 'ラオス・シーパンドン'],
        color: 'from-orange-900 to-orange-600',
    },
    WGNP: {
        id: 'WGNP',
        name: '秘境ガイド（自称）',
        emoji: '🧭',
        tagline: 'チームで秘境を攻略する、計画型冒険家',
        description: '友達を危険な目に遭わせたくないから、しっかり調べる。でも行き先は普通じゃない。旅が終わった後、みんなが「また行きたい」と言う旅を設計できる人間だ。あなたは隠れた名ガイドだ。',
        primaryDestinations: ['スリランカ内陸部', 'エクアドル・アマゾン', 'グルジア・スワネティ地方', 'フィリピン・バタネス諸島'],
        color: 'from-lime-900 to-lime-600',
    },
    WGUF: {
        id: 'WGUF',
        name: '旅するパーティーピープル',
        emoji: '🎉',
        tagline: '友達と、成り行きで、世界中を騒がせる',
        description: '計画なんてその場で決まる。でも友達がいれば怖くない。気付いたら誰も知らない村で地元民と乾杯している。その適応力と社交性は、旅の最強スキルだ。',
        primaryDestinations: ['コロンビア・カルタヘナ', 'セネガル・ダカール', 'ジャマイカ・キングストン', 'ポルトガル・リスボン'],
        color: 'from-yellow-900 to-yellow-600',
    },
    WGUP: {
        id: 'WGUP',
        name: '都市型冒険グループリーダー',
        emoji: '🌍',
        tagline: '非主流の都市を、みんなと攻略する企画者',
        description: 'みんなが「ハワイ」と言っているとき、あなたは「ジョージアはどう？」と言う。最初は反対されても、帰る頃には「連れてきてありがとう」と言わせる自信がある。その自信、正しい。',
        primaryDestinations: ['アルメニア・エレバン', 'ボスニア・サラエボ', '北マケドニア・スコピエ', 'アゼルバイジャン・バクー'],
        color: 'from-red-900 to-red-600',
    },
    CGNF: {
        id: 'CGNF',
        name: '仲良しのんびり旅団',
        emoji: '🌅',
        tagline: '友達と、とくに何もせず、最高に過ごす',
        description: '旅の目的は「何かをすること」じゃなく「誰かと時間を過ごすこと」だとわかっている。観光なんて半分でいい。残りはカフェでだらだら話す。それが最高の旅だと知っている。',
        primaryDestinations: ['クロアチア・スプリット', 'ギリシャ・ロードス島', 'トルコ・ボドルム', 'バリ島・チャングー'],
        color: 'from-sky-900 to-sky-600',
    },
    CGNP: {
        id: 'CGNP',
        name: 'インスタ映え幹事マスター',
        emoji: '📸',
        tagline: '完璧な旅程と完璧な写真で、全員を満足させる',
        description: '旅行計画を立てるのが旅の楽しみの半分を占めるあなた。グループLINEに詳細スプレッドシートを送りつけ、誰よりも早く「おすすめホテル3選」を調査し終えている。カオスより安定。でも写真だけはいつも最高。',
        primaryDestinations: ['バルセロナ', '台北', 'バンコク・プーケット', 'ドバイ'],
        color: 'from-fuchsia-900 to-fuchsia-600',
    },
    CGUF: {
        id: 'CGUF',
        name: '旅の社交王',
        emoji: '🥳',
        tagline: '友達と行けばどこでも最高になる',
        description: '正直、どこでもいい。友達と一緒なら。でもせっかくだから飯が美味くて夜が面白い場所がいい。そのくらいの希望は言っていい。あなたがいるだけで旅のテンションが上がる、それは才能だ。',
        primaryDestinations: ['メキシコ・メキシコシティ', '香港', 'スペイン・マドリード', 'ベトナム・ホーチミン'],
        color: 'from-purple-900 to-purple-600',
    },
    CGUP: {
        id: 'CGUP',
        name: 'ラグジュアリー・トラベルプランナー',
        emoji: '✨',
        tagline: '最高の場所に、完璧な計画で、仲間を連れていく',
        description: '妥協しない。ホテルも、レストランも、移動手段も。でもそれは自分だけじゃなく一緒に行く人全員のために。あなたが幹事になった旅は、必ず成功する。費用がかかるが、価値がある。',
        primaryDestinations: ['モルディブ（非メジャー島）', 'タヒチ・ボラボラ', 'スイス・ツェルマット', 'セーシェル'],
        color: 'from-amber-800 to-amber-500',
    },
};

export function calcTravelerType(answers: Record<string, string | string[] | number>): TravelerTypeId {
    let adventureScore = 0; // higher = W
    let groupScore = 0;     // higher = G
    let natureScore = 0;    // higher = N
    let planScore = 0;      // higher = P

    // 冒険度
    if (answers.q_flight === 'yes') adventureScore++;
    if (answers.q_niche === 'yes') adventureScore += 2;
    if (answers.q_nomenu === 'yes') adventureScore++;
    if (answers.q_toilet === 'yes') adventureScore++;
    if (answers.q_nopower === 'yes') adventureScore++;
    if (answers.q_nonet === 'yes') adventureScore++;
    if (answers.q_truck === 'yes') adventureScore++;
    if (answers.q_lizard === 'yes') adventureScore++;
    if (typeof answers.q_adventure === 'number') adventureScore += answers.q_adventure as number;

    // グループ度
    if (answers.q_solo === 'no') groupScore += 3;
    else groupScore -= 2;

    // 自然度
    const scenery = answers.q_scenery as string[] || [];
    if (scenery.includes('mountain') || scenery.includes('forest') || scenery.includes('rural')) natureScore += 2;
    if (scenery.includes('city') || scenery.includes('night')) natureScore -= 2;

    const activities = answers.q_activities as string[] || [];
    if (activities.includes('hiking') || activities.includes('stargazing') || activities.includes('cave')) natureScore += 2;
    if (activities.includes('nightlife') || activities.includes('shopping')) natureScore -= 2;

    // 計画性
    if (answers.q_itinerary === 'yes') planScore += 3;
    else planScore -= 2;

    const adventureType = adventureScore >= 4 ? 'W' : 'C';
    const groupType = groupScore >= 1 ? 'G' : 'S';
    const envType = natureScore >= 1 ? 'N' : 'U';
    const planType = planScore >= 1 ? 'P' : 'F';

    return `${adventureType}${groupType}${envType}${planType}` as TravelerTypeId;
}
