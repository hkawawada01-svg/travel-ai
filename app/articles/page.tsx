import Link from 'next/link';
import { articles } from '@/data/articles';

export const metadata = {
    title: '旅行のお悩み解決・おすすめ情報局 | AI旅行先診断',
    description: '一人旅の不安、週末の過ごし方、治安や英語の壁など、旅行に関するお悩みを解決するコラム記事一覧です。',
};

export default function ArticlesIndexPage() {
    const articleList = Object.values(articles).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <main className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto flex flex-col gap-12">
                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight font-outfit">
                        旅のお悩み解決コラム
                    </h1>
                    <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        「どこに行けばいいかわからない」「一人旅は不安」といったお悩みから、
                        次の週末に行けるおすすめスポットまで、旅行に役立つ情報を発信しています。
                    </p>
                </div>

                {/* Article List */}
                <div className="flex flex-col gap-6">
                    {articleList.map((article) => (
                        <Link key={article.id} href={`/articles/${article.id}`}>
                            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col sm:flex-row gap-6 items-start sm:items-center group cursor-pointer">
                                <div className="text-5xl sm:text-6xl group-hover:scale-110 transition-transform origin-center bg-slate-50 p-4 rounded-2xl">
                                    {article.emoji}
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-bold text-slate-400 mb-2">{article.date}</div>
                                    <h2 className="text-xl font-bold mb-2 text-slate-800 group-hover:text-cyan-600 transition-colors leading-snug">
                                        {article.title}
                                    </h2>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {article.description}
                                    </p>
                                </div>
                                <div className="hidden sm:flex text-cyan-600 font-bold items-center gap-1 group-hover:translate-x-2 transition-transform">
                                    読む →
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="text-center pt-8 border-t border-slate-200">
                    <div className="bg-cyan-50 rounded-2xl p-8 mb-8 border border-cyan-100">
                        <h3 className="text-lg font-bold text-cyan-800 mb-2">コラムを読んでも行き先が決まらない？</h3>
                        <p className="text-slate-600 mb-6 text-sm">
                            AIがあなたの深層心理を分析して、最適な旅行先を見つけ出します。
                        </p>
                        <Link href="/quiz">
                            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105">
                                AI診断を無料で受ける
                            </button>
                        </Link>
                    </div>
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
