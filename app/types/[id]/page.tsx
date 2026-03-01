import { notFound } from 'next/navigation';
import Link from 'next/link';
import { travelerTypes, TravelerTypeId } from '@/data/travelerTypes';

export function generateStaticParams() {
    return Object.keys(travelerTypes).map((id) => ({
        id: id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const typeId = id as TravelerTypeId;
    const t = travelerTypes[typeId];

    if (!t) return { title: 'Not Found' };

    return {
        title: `${t.name} (${t.id}) の特徴とおすすめ旅行先 | AI旅行先診断`,
        description: t.description,
    };
}

export default async function TypeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const typeId = id.toUpperCase() as TravelerTypeId;
    const t = travelerTypes[typeId];

    if (!t) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            {/* Header Hero */}
            <header className={`pt-24 pb-16 px-4 bg-gradient-to-br ${t.color} text-white`}>
                <div className="max-w-3xl mx-auto text-center">
                    <div className="text-xl font-bold opacity-80 mb-2 tracking-widest">{t.id}タイプ</div>
                    <div className="text-7xl mb-6 bg-white/20 inline-block p-6 rounded-full shadow-lg backdrop-blur-sm">
                        {t.emoji}
                    </div>
                    <h1 className="text-3xl sm:text-5xl font-black mb-4 font-outfit leading-tight drop-shadow-md">
                        {t.name}
                    </h1>
                    <p className="text-lg sm:text-2xl font-medium opacity-90 drop-shadow">
                        〜 {t.tagline} 〜
                    </p>
                </div>
            </header>

            {/* Content Body */}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-16">

                {/* Intro / Description */}
                <section>
                    <h2 className={`text-2xl font-bold mb-6 text-slate-800 border-l-4 pl-4 border-transparent`} style={{ borderImage: 'linear-gradient(to bottom, currentColor, transparent) 1 100%' }}>
                        {t.name}とはどんな旅人？
                    </h2>
                    <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line bg-slate-50 p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                        {t.description}
                    </p>
                </section>

                {/* Destinations (Teaser) */}
                <section>
                    <h2 className="text-2xl font-bold mb-6 text-slate-800 border-l-4 pl-4 border-slate-300">
                        {t.name}に絶対おすすめの旅行先は？
                    </h2>
                    <p className="text-slate-600 mb-6 font-medium">
                        このタイプのあなたが最も輝く、または心が満たされる可能性が高い国や都市が存在します。
                        しかし、同じ「{t.name}」タイプでも、あなたの現在の気分や予算、選ぶ選択肢によって、パーフェクトな行先は変わってきます。
                    </p>

                    <div className="bg-slate-100 rounded-2xl p-8 text-center border-2 border-dashed border-slate-300 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-[2px]"></div>
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <span className="text-4xl">🔒</span>
                            <h3 className="text-xl font-bold text-slate-700">あなた専用の旅行先は、AI診断の中で公開！</h3>
                            <p className="text-slate-600 font-medium mb-4">世界中から厳選された、あなたを満たす最高の目的地をお教えします。</p>
                            <Link href="/quiz">
                                <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-10 rounded-full shadow-lg transition-transform hover:scale-105">
                                    いますぐAI旅行先診断を受ける（無料）
                                </button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Characteristics Analysis */}
                <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl">
                    <h2 className="text-2xl font-bold mb-6 text-cyan-400">
                        【AIによる深掘り分析】なぜこの場所が合うのか？
                    </h2>
                    <p className="text-slate-300 leading-relaxed mb-6">
                        あなたの回答傾向は、「{t.id.split('').join('・')}」という4つの要素の組み合わせから成り立っています。
                        一般的な観光地やパッケージツアーでは満たされない「固有のこだわり」を持つあなたにとって、旅とは消費するものではなく、自分と向き合う、あるいは最高の仲間としか作れない時間を創出するためのものです。
                    </p>
                    <div className="bg-black/30 rounded-xl p-6 text-center">
                        <p className="text-lg font-bold mb-4">
                            あなたも、自分の本当の旅人タイプをAIに聞きたいですか？
                        </p>
                        <Link href="/quiz">
                            <button className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                                AI旅行先診断を無料で受ける →
                            </button>
                        </Link>
                    </div>
                </section>

            </article>

            {/* Link Back */}
            <div className="text-center pb-20">
                <Link href="/types">
                    <button className="text-cyan-700 hover:text-cyan-900 font-bold underline">
                        &larr; 16タイプの旅人一覧へ戻る
                    </button>
                </Link>
            </div>
        </main>
    );
}
