import { notFound } from 'next/navigation';
import Link from 'next/link';
import { articles } from '@/data/articles';
import ReactMarkdown from 'react-markdown';

export function generateStaticParams() {
    return Object.keys(articles).map((id) => ({
        id: id,
    }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
    const article = articles[params.id];
    if (!article) return { title: 'Not Found' };

    return {
        title: `${article.title} | AI旅行先診断 コラム`,
        description: article.description,
    };
}

export default function ArticleDetailPage({ params }: { params: { id: string } }) {
    const article = articles[params.id];

    if (!article) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50">
            {/* Header Hero */}
            <header className="pt-24 pb-16 px-4 bg-white border-b border-slate-200 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="text-xs font-bold text-slate-400 mb-4 tracking-wider">{article.date}</div>
                    <div className="text-7xl mb-6 inline-block">
                        {article.emoji}
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-black mb-6 text-slate-800 leading-tight">
                        {article.title}
                    </h1>
                </div>
            </header>

            {/* Content Body */}
            <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
                <div className="prose prose-lg prose-slate max-w-none 
                    prose-h2:text-2xl prose-h2:font-bold prose-h2:text-slate-800 prose-h2:border-b-2 prose-h2:border-cyan-100 prose-h2:pb-2 prose-h2:mt-12
                    prose-p:text-slate-600 prose-p:leading-relaxed
                    prose-a:text-cyan-600 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-slate-800">
                    <ReactMarkdown>
                        {article.content}
                    </ReactMarkdown>
                </div>

                {/* Call To Action (Quiz) */}
                <div className="mt-16 bg-gradient-to-br from-cyan-600 to-cyan-500 rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                    <div className="relative z-10">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-4">記事を読んでも決められない…？</h2>
                        <p className="text-cyan-50 text-lg mb-8 max-w-xl mx-auto">
                            そんな時は、AIに任せてみませんか？
                            30の質問に直感で答えるだけで、あなたの深層心理を分析し、最適な旅行先をご提案します。
                        </p>
                        <Link href="/quiz">
                            <button className="bg-white text-cyan-600 hover:bg-slate-50 font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105 text-lg">
                                AI旅行先診断を無料で受ける →
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Link Back */}
                <div className="text-center mt-12 pb-12 border-b border-slate-200">
                    <Link href="/articles">
                        <button className="text-slate-500 hover:text-slate-800 font-bold underline">
                            &larr; コラム一覧へ戻る
                        </button>
                    </Link>
                </div>

            </article>
        </main>
    );
}
