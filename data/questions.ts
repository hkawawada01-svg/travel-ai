export type QuestionType = 'yesno' | 'multi' | 'slider' | 'select';

export interface Question {
    id: string;
    type: QuestionType;
    emoji: string;
    question: string;
    subtext?: string;
    options?: { value: string; label: string; emoji?: string }[];
    min?: number;
    max?: number;
    minLabel?: string;
    maxLabel?: string;
}

export const questions: Question[] = [
    // === YES / NO ===
    {
        id: 'q_flight',
        type: 'yesno',
        emoji: '✈️',
        question: '飛行機12時間以上もOK？',
        subtext: '「足がむくむのも旅の醍醐味」くらいに思えるか',
    },
    {
        id: 'q_niche',
        type: 'yesno',
        emoji: '🗺️',
        question: '観光客がほぼいない「穴場」の方が好き？',
        subtext: 'Instagramにほぼ出てこない場所のこと',
    },
    {
        id: 'q_solo',
        type: 'yesno',
        emoji: '🧳',
        question: 'ひとり旅、あり？',
        subtext: '誰とも予定を合わせなくていい自由と孤独',
    },
    {
        id: 'q_itinerary',
        type: 'yesno',
        emoji: '📋',
        question: '旅行前に詳しい計画を立てる方？',
        subtext: 'Excelで行程表を作ったことがある人はYES',
    },
    {
        id: 'q_nopower',
        type: 'yesno',
        emoji: '🕯️',
        question: '電気・水道が整ってない宿でも耐えられる？',
        subtext: 'ロウソクと手桶で3日過ごせるか',
    },
    {
        id: 'q_nomenu',
        type: 'yesno',
        emoji: '🐛',
        question: '虫・カエル・タランチュラが料理として出てきても食べられる？',
        subtext: 'タイの屋台で普通に売ってます',
    },
    {
        id: 'q_toilet',
        type: 'yesno',
        emoji: '🕳️',
        question: 'トイレが「穴」でも大丈夫？',
        subtext: 'もちろん紙はない。覚悟はいいか',
    },
    {
        id: 'q_truck',
        type: 'yesno',
        emoji: '🚛',
        question: 'ガタガタ道を4時間、トラックの荷台に乗って移動、あり？',
        subtext: 'これが唯一の移動手段の場合',
    },
    {
        id: 'q_lizard',
        type: 'yesno',
        emoji: '🦎',
        question: '朝起きたら部屋にトカゲがいても「まあいいか」と思える？',
        subtext: '南国ではわりとよくある光景です',
    },
    {
        id: 'q_nonet',
        type: 'yesno',
        emoji: '📵',
        question: '旅行中、3日間完全にインターネットなしでも大丈夫？',
        subtext: 'SNSも地図アプリもなし。紙の地図だけ',
    },
    {
        id: 'q_nolang',
        type: 'yesno',
        emoji: '🤷',
        question: '現地語も英語も通じず、ジェスチャーだけで乗り切れる？',
        subtext: '笑顔とボディランゲージは世界共通',
    },
    {
        id: 'q_alcohol',
        type: 'yesno',
        emoji: '🍻',
        question: '旅先でお酒を楽しみたい？',
        subtext: 'NGの国・地域もあるので確認のため',
    },
    {
        id: 'q_smelly',
        type: 'yesno',
        emoji: '🤢',
        question: '発酵した臭い食べ物（ドリアン・臭豆腐レベル）もいける？',
        subtext: '地元の人が「これ絶品！」と出してくる系',
    },
    {
        id: 'q_mystery',
        type: 'yesno',
        emoji: '🍢',
        question: '屋台の謎の肉串、素材を聞かずに食べられる？',
        subtext: '聞いた方が幸せかどうかはわからない',
    },
    {
        id: 'q_wildlife',
        type: 'yesno',
        emoji: '🦁',
        question: '野生動物と間近で遭遇したい？',
        subtext: 'サファリや自然保護区在来種との遭遇',
    },

    // === SLIDER ===
    {
        id: 'q_budget',
        type: 'select',
        emoji: '💰',
        question: '旅行の予算感は？（航空券＋宿 合計）',
        options: [
            { value: 'under5', label: '〜5万円', emoji: '🪙' },
            { value: 'under10', label: '5〜10万円', emoji: '💵' },
            { value: 'under20', label: '10〜20万円', emoji: '💳' },
            { value: 'under30', label: '20〜30万円', emoji: '💎' },
            { value: 'over30', label: '30万円〜', emoji: '✨' },
        ],
    },
    {
        id: 'q_days',
        type: 'select',
        emoji: '📅',
        question: '旅行日数は？',
        options: [
            { value: 'short', label: '3日以内', emoji: '⚡' },
            { value: 'week', label: '4〜7日', emoji: '🌤️' },
            { value: 'twoweeks', label: '8〜14日', emoji: '🌍' },
            { value: 'long', label: '2週間以上', emoji: '🗺️' },
        ],
    },
    {
        id: 'q_adventure',
        type: 'slider',
        emoji: '🎢',
        question: 'あなたの冒険度は？',
        min: 0,
        max: 4,
        minLabel: '快適リゾート派',
        maxLabel: '秘境探検家',
    },
    {
        id: 'q_comfort',
        type: 'slider',
        emoji: '🛏️',
        question: '移動や宿のキツさへの耐性は？',
        min: 0,
        max: 4,
        minLabel: '楽さ最優先',
        maxLabel: 'キツくてもOK',
    },

    // === MULTI SELECT ===
    {
        id: 'q_purpose',
        type: 'multi',
        emoji: '🎯',
        question: '旅に求めるものを全部選んで',
        options: [
            { value: 'relax', label: 'リフレッシュ・癒し', emoji: '🛁' },
            { value: 'history', label: '歴史・文化・遺跡', emoji: '🏛️' },
            { value: 'food', label: 'グルメ・食の冒険', emoji: '🍜' },
            { value: 'nature', label: '大自然・絶景', emoji: '🏔️' },
            { value: 'night', label: 'ナイトライフ', emoji: '🎶' },
            { value: 'art', label: '芸術・アート', emoji: '🎨' },
            { value: 'sport', label: 'アクティビティ・スポーツ', emoji: '🏄' },
            { value: 'local', label: '地元の人との交流', emoji: '🤝' },
            { value: 'spiritual', label: '信仰・精神的な体験', emoji: '🕌' },
        ],
    },
    {
        id: 'q_scenery',
        type: 'multi',
        emoji: '🌄',
        question: '好きな風景を全部選んで',
        options: [
            { value: 'sea', label: '海・ビーチ', emoji: '🏖️' },
            { value: 'mountain', label: '山・高地', emoji: '⛰️' },
            { value: 'desert', label: '砂漠', emoji: '🏜️' },
            { value: 'forest', label: '森・ジャングル', emoji: '🌳' },
            { value: 'rural', label: '田園・農村・草原', emoji: '🌾' },
            { value: 'city', label: '都市の街並み・夜景', emoji: '🌆' },
            { value: 'snow', label: '雪景色', emoji: '❄️' },
            { value: 'river', label: '川・湖・滝', emoji: '🏞️' },
        ],
    },
    {
        id: 'q_activities',
        type: 'multi',
        emoji: '🎒',
        question: '体験したいアクティビティを全部選んで',
        options: [
            { value: 'hiking', label: 'トレッキング・登山', emoji: '🥾' },
            { value: 'diving', label: 'ダイビング・シュノーケリング', emoji: '🤿' },
            { value: 'cycling', label: 'サイクリング', emoji: '🚴' },
            { value: 'cooking', label: '現地料理教室', emoji: '👨‍🍳' },
            { value: 'animal', label: '動物乗り体験（ラクダ・馬など）', emoji: '🐪' },
            { value: 'cave', label: '洞窟探検', emoji: '🔦' },
            { value: 'stargazing', label: '星空観察', emoji: '🌠' },
            { value: 'shopping', label: 'ショッピング・市場巡り', emoji: '🛍️' },
            { value: 'nightlife', label: 'バー・クラブ・ナイトライフ', emoji: '🎵' },
        ],
    },
    {
        id: 'q_avoid',
        type: 'multi',
        emoji: '🚫',
        question: 'どうしても避けたい環境は？（正直に）',
        options: [
            { value: 'heat', label: '40℃超えの酷暑', emoji: '🌡️' },
            { value: 'cold', label: '氷点下の極寒', emoji: '🥶' },
            { value: 'bugs', label: '虫が大量にいる環境', emoji: '🦟' },
            { value: 'crowd', label: '観光客だらけの場所', emoji: '👥' },
            { value: 'unsafe', label: 'ちょっとでも治安が心配な場所', emoji: '🚨' },
        ],
    },
    {
        id: 'q_season',
        type: 'select',
        emoji: '🌸',
        question: '行きたい季節は？',
        options: [
            { value: 'spring', label: '春（3〜5月）', emoji: '🌸' },
            { value: 'summer', label: '夏（6〜8月）', emoji: '☀️' },
            { value: 'autumn', label: '秋（9〜11月）', emoji: '🍂' },
            { value: 'winter', label: '冬（12〜2月）', emoji: '❄️' },
            { value: 'any', label: 'どこでもいい', emoji: '🌀' },
        ],
    },
    {
        id: 'q_mode',
        type: 'select',
        emoji: '🎭',
        question: 'AIのコメントスタイルは？',
        subtext: '診断結果のコメントの口調を選んでください',
        options: [
            { value: 'normal', label: 'やさしい旅人モード', emoji: '🕊️' },
            { value: 'spicy', label: '辛口ガイドモード', emoji: '🔥' },
            { value: 'funny', label: 'ツッコミ芸人モード', emoji: '🤣' },
        ],
    },
];
