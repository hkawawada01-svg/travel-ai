import Link from 'next/link';
import { travelerTypes } from '@/data/travelerTypes';

export const metadata = {
    title: '16タイプの旅人一覧 | AI旅行先診断',
    description: '旅行スタイルを4つの軸で分析した全16タイプの旅人キャラクターの一覧です。あなたの隠れた旅行の傾向や、最適な目的地を見つけましょう。',
};

export default function TypesIndexPage() {
    const typesList = Object.values(travelerTypes);

    return (
        <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto flex flex-col gap-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight font-outfit">
                        16タイプの旅人辞典
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        「冒険度」「旅スタイル」「環境」「計画性」の4つの軸から分類される、全16パターンの旅人タイプ。
                        それぞれの特徴やおすすめの旅行先を詳しく解説します。まずは自分のタイプを診断してみましょう！
                    </p>
                    <div className="pt-4">
                        <Link href="/quiz">
                            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                                AI診断をはじめる
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {typesList.map((t) => (
                        <Link key={t.id} href={`/types/${t.id}`}>
                            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all h-full border border-slate-100 flex flex-col group cursor-pointer">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform origin-left">
                                    {t.emoji}
                                </div>
                                <div className="text-xs font-bold text-slate-400 mb-1">{t.id}</div>
                                <h2 className={`text-lg font-bold mb-2 bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}>
                                    {t.name}
                                </h2>
                                <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                                    {t.tagline}
                                </p>
                                <div className="mt-4 text-cyan-600 text-sm font-bold flex items-center gap-1">
                                    詳細を見る <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <Link href="/">
                        <button className="text-slate-500 hover:text-slate-800 font-medium underline">
                            トップページへ戻る
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
