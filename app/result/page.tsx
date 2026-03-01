'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Spot { name: string; description: string; }
interface MainDestination {
    name: string; emoji: string; reason: string;
    spots: Spot[]; budget: string; bestSeason: string;
    warningNote: string | null; searchQuery: string;
}
interface SubDestination { name: string; emoji: string; reason: string; }
interface Recommendation {
    mainDestination: MainDestination;
    subDestinations: SubDestination[];
    personalComment: string;
    isJapanOnly: boolean;
}
interface TravelerType {
    id: string; name: string; emoji: string;
    tagline: string; description: string; color: string;
}
interface ResultData {
    typeId: string;
    travelerType: TravelerType;
    recommendation: Recommendation;
}


export default function ResultPage() {
    const [data, setData] = useState<ResultData | null>(null);
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');
    const [imageUrl, setImageUrl] = useState<string>('');

    useEffect(() => {
        setOrigin(window.location.origin);
        const stored = sessionStorage.getItem('travelResult');
        if (stored) {
            const parsed = JSON.parse(stored);
            setData(parsed);

            // 画像検索（Unsplash Sourceは終了しているため、LoremFlickrに変更）
            if (parsed.recommendation?.mainDestination?.searchQuery) {
                const keyword = encodeURIComponent(parsed.recommendation.mainDestination.searchQuery.split(' ')[0]);
                // キーワードに関連するFlickrのフリー画像を取得
                setImageUrl(`https://loremflickr.com/800/600/${keyword},travel/all`);
            }
        }
    }, []);

    const handleShare = async () => {
        const shareUrl = `${origin}/share?type=${data?.travelerType.id}&dest=${encodeURIComponent(data?.recommendation.mainDestination.name || '')}`;
        const text = data
            ? `🌍 AI旅行先診断の結果\n\n私の旅人タイプ：${data.travelerType.emoji} ${data.travelerType.name}\nおすすめ旅行先：${data.recommendation.mainDestination.emoji} ${data.recommendation.mainDestination.name}\n\nあなたも診断してみて！`
            : '';
        if (navigator.share) {
            navigator.share({ title: 'AI旅行先診断の結果', text, url: shareUrl });
        } else {
            navigator.clipboard.writeText(`${text}\n${shareUrl}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!data) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0e7490 0%, #87ceeb 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                <p style={{ color: 'white', fontSize: '1rem' }}>結果データがありません</p>
                <Link href="/quiz">
                    <button style={{ background: '#f97316', color: 'white', padding: '14px 32px', borderRadius: '100px', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                        診断をやり直す
                    </button>
                </Link>
            </div>
        );
    }

    const { travelerType, recommendation } = data;
    const { mainDestination: dest, subDestinations, personalComment } = recommendation;
    const tweetText = encodeURIComponent(`🌍 AI旅行先診断結果\n旅人タイプ：${travelerType.emoji}${travelerType.name}\nおすすめ：${dest.emoji}${dest.name}\n\n`);

    const card = (children: React.ReactNode, style?: React.CSSProperties) => (
        <div style={{ background: 'rgba(255,255,255,0.92)', borderRadius: '24px', padding: '28px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', ...style }}>
            {children}
        </div>
    );

    return (
        <main style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0e7490 0%, #0891b2 25%, #87ceeb 60%, #e0f4fb 100%)', paddingBottom: '60px' }}>

            {/* タイプヘッダー */}
            <section style={{ padding: '60px 20px 40px', textAlign: 'center', maxWidth: '560px', margin: '0 auto' }}>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.8rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    あなたの旅人タイプ
                </p>
                <div style={{ fontSize: '4rem', marginBottom: '12px' }}>{travelerType.emoji}</div>
                <h1 style={{ color: 'white', fontSize: 'clamp(1.8rem, 5vw, 2.8rem)', fontWeight: 900, marginBottom: '8px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
                    {travelerType.name}
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '24px', fontSize: '1rem' }}>{travelerType.tagline}</p>

                {/* AIコメント */}
                <div style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', borderRadius: '20px', padding: '20px', border: '1px solid rgba(255,255,255,0.25)', textAlign: 'left' }}>
                    <p style={{ color: 'white', fontSize: '0.95rem', lineHeight: 1.8 }}>💬 {personalComment}</p>
                </div>
            </section>

            <div style={{ maxWidth: '560px', margin: '0 auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                {/* メイン旅行先 */}
                {card(<>
                    <p style={{ color: '#0891b2', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                        🎯 おすすめ旅行先
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <span style={{ fontSize: '3rem' }}>{dest.emoji}</span>
                        <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, color: '#0e7490', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
                            {dest.name}
                        </h2>
                    </div>

                    {imageUrl && (
                        <div style={{ width: '100%', height: '200px', borderRadius: '16px', overflow: 'hidden', marginBottom: '16px', position: 'relative', backgroundColor: '#e2e8f0' }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imageUrl}
                                alt={dest.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://images.unsplash.com/photo-1488085061387-422e29b40080?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
                                }}
                            />
                        </div>
                    )}

                    <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '16px' }}>{dest.reason}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px' }}>
                        {[
                            { icon: '💰', label: '予算目安', value: dest.budget },
                            { icon: '🌸', label: 'ベストシーズン', value: dest.bestSeason },
                        ].map((item) => (
                            <div key={item.label} style={{ background: '#f0fdf4', borderRadius: '14px', padding: '12px' }}>
                                <p style={{ color: '#059669', fontSize: '0.72rem', fontWeight: 700, marginBottom: '4px' }}>{item.icon} {item.label}</p>
                                <p style={{ color: '#1f2937', fontSize: '0.85rem', fontWeight: 600 }}>{item.value}</p>
                            </div>
                        ))}
                    </div>

                    {dest.warningNote && (
                        <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '12px', padding: '12px', marginBottom: '16px', fontSize: '0.82rem', color: '#c2410c' }}>
                            ⚠️ {dest.warningNote}
                        </div>
                    )}

                    <h3 style={{ color: '#0e7490', fontWeight: 700, marginBottom: '10px', fontSize: '0.95rem' }}>📍 おすすめスポット</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                        {dest.spots.map((spot, i) => (
                            <div key={i} style={{ background: '#f8fafc', borderRadius: '14px', padding: '14px', border: '1px solid #e2e8f0' }}>
                                <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1e293b', marginBottom: '4px' }}>{spot.name}</p>
                                <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6 }}>{spot.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* アフィリエイトCTA */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a href="https://www.trip.com/flights/?locale=ja-jp" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'block', padding: '16px', borderRadius: '16px', background: 'linear-gradient(135deg, #f97316, #fb923c)', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', fontSize: '0.95rem' }}>
                            ✈️ 航空券の最安値を調べる
                        </a>
                        <a href={`https://www.booking.com/search.ja.html?ss=${encodeURIComponent(dest.searchQuery)}`} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'block', padding: '14px', borderRadius: '16px', background: '#003580', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', fontSize: '0.9rem' }}>
                            🏨 ホテルを探す（Booking.com）
                        </a>
                        <a href="https://travel.rakuten.co.jp/" target="_blank" rel="noopener noreferrer"
                            style={{ display: 'block', padding: '14px', borderRadius: '16px', background: '#bf0000', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', fontSize: '0.9rem' }}>
                            🗺️ ツアーを探す（楽天トラベル）
                        </a>
                    </div>
                </>)}

                {/* サブ旅行先 */}
                {card(<>
                    <h2 style={{ color: '#0e7490', fontWeight: 800, marginBottom: '16px', fontSize: '1rem' }}>🌏 こちらもおすすめ</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {subDestinations.map((sub, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '2rem' }}>{sub.emoji}</span>
                                <div>
                                    <p style={{ fontWeight: 700, color: '#0e7490', marginBottom: '4px', fontSize: '0.95rem' }}>{sub.name}</p>
                                    <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.6 }}>{sub.reason}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>)}

                {/* シェア */}
                {card(<>
                    <h2 style={{ fontWeight: 800, color: '#1e293b', marginBottom: '6px', textAlign: 'center', fontSize: '1.1rem' }}>結果をシェアする 🎉</h2>
                    <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center', marginBottom: '20px' }}>友達にも旅人タイプを診断させよう</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${tweetText}&url=${encodeURIComponent(`${origin}/share?type=${travelerType.id}&dest=${encodeURIComponent(dest.name)}`)}`}
                            target="_blank" rel="noopener noreferrer"
                            style={{ display: 'block', padding: '14px', borderRadius: '14px', background: '#000', color: 'white', fontWeight: 700, textAlign: 'center', textDecoration: 'none', fontSize: '0.95rem' }}
                        >
                            𝕏 でシェア
                        </a>
                        <button onClick={handleShare}
                            style={{ padding: '14px', borderRadius: '14px', border: '2px solid #e2e8f0', background: 'white', color: '#374151', fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem' }}>
                            {copied ? '✓ コピーしました！' : '🔗 リンクをコピー'}
                        </button>
                    </div>
                </>)}

                {/* もう一度 */}
                <div style={{ textAlign: 'center', paddingTop: '16px', paddingBottom: '32px' }}>
                    <Link href="/quiz">
                        <button style={{
                            padding: '16px 40px',
                            borderRadius: '100px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            fontWeight: 800,
                            cursor: 'pointer',
                            fontSize: '1.05rem',
                            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
                            transition: 'all 0.2s ease',
                            width: '100%',
                            maxWidth: '300px'
                        }}>
                            🔄 もう一度診断する
                        </button>
                    </Link>
                </div>

            </div>
        </main>
    );
}
