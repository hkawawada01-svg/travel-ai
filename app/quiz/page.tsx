'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';

export default function QuizPage() {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string | string[] | number>>({});
    const [multiSelected, setMultiSelected] = useState<string[]>([]);
    const [sliderValue, setSliderValue] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const current = questions[currentIndex];
    const progress = Math.round(((currentIndex) / questions.length) * 100);

    const handleNext = useCallback(
        (overrideAnswers?: Record<string, string | string[] | number>) => {
            const finalAnswers = overrideAnswers ?? answers;
            if (currentIndex >= questions.length - 1) {
                submitAnswers(finalAnswers);
            } else {
                setCurrentIndex((i) => i + 1);
                setMultiSelected([]);
                setSliderValue(2);
            }
        },
        [currentIndex, answers]
    );

    const recordAndNext = (id: string, value: string | string[] | number) => {
        const updated = { ...answers, [id]: value };
        setAnswers(updated);
        handleNext(updated);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            setCurrentIndex((i) => i - 1);
            setMultiSelected([]);
            setSliderValue(2);
        }
    };

    const submitAnswers = async (finalAnswers: Record<string, string | string[] | number>) => {
        setIsLoading(true);
        setError('');
        try {
            const res = await fetch('/api/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers: finalAnswers }),
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("API error response:", data);
                throw new Error(`${data.error}: ${data.details || 'Unknown error'}`);
            }

            sessionStorage.setItem('travelResult', JSON.stringify(data));
            router.push('/result');
        } catch (err: any) {
            console.error(err);
            setError(`結果の生成に失敗しました: ${err.message}`);
            setIsLoading(false);
        }
    };

    // ===== ローディング画面 =====
    if (isLoading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(180deg, #0e7490 0%, #0891b2 40%, #87ceeb 100%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                padding: '24px', textAlign: 'center',
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '24px', animation: 'spin 2s linear infinite' }}>🌍</div>
                <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
                    AIがあなたの旅先を分析中…
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>
                    世界中の旅行先からあなたにぴったりの場所を探しています
                </p>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    // ===== メイン画面 =====
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0e7490 0%, #0891b2 30%, #87ceeb 70%, #e0f4fb 100%)',
            display: 'flex', flexDirection: 'column',
        }}>

            {/* プログレスバー */}
            <div style={{ padding: '16px 20px 12px', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}>
                <div style={{ maxWidth: '520px', margin: '0 auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem' }}>
                            質問 {currentIndex + 1} / {questions.length}
                        </span>
                        <span style={{ color: 'white', fontSize: '0.8rem', fontWeight: 700 }}>{progress}%</span>
                    </div>
                    <div style={{ height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '100px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%', width: `${progress}%`,
                            background: 'linear-gradient(to right, #f97316, #fbbf24)',
                            borderRadius: '100px',
                            transition: 'width 0.4s ease',
                        }} />
                    </div>
                </div>
            </div>

            {/* 質問エリア */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
                <div style={{ width: '100%', maxWidth: '520px' }}>

                    {error && (
                        <div style={{ marginBottom: '16px', padding: '16px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '16px', color: '#fca5a5', textAlign: 'center', fontSize: '0.9rem' }}>
                            {error}
                            <button onClick={() => submitAnswers(answers)} style={{ marginLeft: '12px', textDecoration: 'underline', background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer' }}>再試行</button>
                        </div>
                    )}

                    {/* カード */}
                    <div style={{
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '28px',
                        padding: '36px 28px',
                        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    }}>
                        {/* 質問ヘッダー */}
                        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                            <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>{current.emoji}</div>
                            <h2 style={{
                                fontSize: 'clamp(1.1rem, 3.5vw, 1.4rem)',
                                fontWeight: 800, lineHeight: 1.4,
                                color: '#0e7490',
                                marginBottom: '8px',
                                fontFamily: "'Outfit', 'Noto Sans JP', sans-serif",
                            }}>
                                {current.question}
                            </h2>
                            {current.subtext && (
                                <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}>{current.subtext}</p>
                            )}
                        </div>

                        {/* YES / NO */}
                        {current.type === 'yesno' && (
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => recordAndNext(current.id, 'yes')}
                                    style={{
                                        flex: 1, padding: '20px 12px',
                                        borderRadius: '20px',
                                        border: '2.5px solid #22c55e',
                                        background: '#f0fdf4',
                                        color: '#16a34a',
                                        fontSize: '1.2rem', fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.18s',
                                        fontFamily: "'Outfit', 'Noto Sans JP', sans-serif",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#22c55e'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#f0fdf4'; e.currentTarget.style.color = '#16a34a'; }}
                                >
                                    ✓ YES
                                </button>
                                <button
                                    onClick={() => recordAndNext(current.id, 'no')}
                                    style={{
                                        flex: 1, padding: '20px 12px',
                                        borderRadius: '20px',
                                        border: '2.5px solid #ef4444',
                                        background: '#fef2f2',
                                        color: '#dc2626',
                                        fontSize: '1.2rem', fontWeight: 800,
                                        cursor: 'pointer',
                                        transition: 'all 0.18s',
                                        fontFamily: "'Outfit', 'Noto Sans JP', sans-serif",
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ef4444'; e.currentTarget.style.color = 'white'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#dc2626'; }}
                                >
                                    ✗ NO
                                </button>
                            </div>
                        )}

                        {/* SELECT */}
                        {current.type === 'select' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {current.options?.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => recordAndNext(current.id, opt.value)}
                                        style={{
                                            width: '100%', padding: '16px 20px',
                                            borderRadius: '16px',
                                            border: '2px solid #e2e8f0',
                                            background: 'white',
                                            color: '#1e293b',
                                            fontSize: '1rem', fontWeight: 600,
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            display: 'flex', alignItems: 'center', gap: '14px',
                                            transition: 'all 0.18s',
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#0891b2'; e.currentTarget.style.background = '#e0f4fb'; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'white'; }}
                                    >
                                        <span style={{ fontSize: '1.6rem' }}>{opt.emoji}</span>
                                        <span>{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* MULTI */}
                        {current.type === 'multi' && (
                            <div>
                                <p style={{ color: '#64748b', fontSize: '0.82rem', textAlign: 'center', marginBottom: '16px' }}>複数選択OK（選ばなくてもOK）</p>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
                                    {current.options?.map((opt) => {
                                        const isSelected = multiSelected.includes(opt.value);
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => setMultiSelected(isSelected
                                                    ? multiSelected.filter((v) => v !== opt.value)
                                                    : [...multiSelected, opt.value]
                                                )}
                                                style={{
                                                    padding: '12px 14px',
                                                    borderRadius: '14px',
                                                    border: `2px solid ${isSelected ? '#0891b2' : '#e2e8f0'}`,
                                                    background: isSelected ? '#e0f4fb' : 'white',
                                                    color: isSelected ? '#0e7490' : '#334155',
                                                    fontSize: '0.88rem', fontWeight: 600,
                                                    cursor: 'pointer',
                                                    display: 'flex', alignItems: 'center', gap: '8px',
                                                    transition: 'all 0.15s',
                                                }}
                                            >
                                                <span>{opt.emoji}</span>
                                                <span>{opt.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => recordAndNext(current.id, multiSelected)}
                                    style={{
                                        width: '100%', padding: '16px',
                                        borderRadius: '16px', border: 'none',
                                        background: 'linear-gradient(135deg, #0891b2, #0e7490)',
                                        color: 'white', fontSize: '1rem', fontWeight: 700,
                                        cursor: 'pointer',
                                        fontFamily: "'Outfit', 'Noto Sans JP', sans-serif",
                                    }}
                                >
                                    次へ →
                                </button>
                            </div>
                        )}

                        {/* SLIDER */}
                        {current.type === 'slider' && (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8rem', color: '#64748b' }}>
                                    <span>{current.minLabel}</span>
                                    <span>{current.maxLabel}</span>
                                </div>
                                <input
                                    type="range"
                                    min={current.min}
                                    max={current.max}
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(Number(e.target.value))}
                                    style={{ width: '100%', marginBottom: '8px', accentColor: '#0891b2' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                                    {Array.from({ length: (current.max ?? 4) + 1 }, (_, i) => (
                                        <span key={i} style={{ fontSize: '0.75rem', color: i === sliderValue ? '#0891b2' : '#cbd5e1', fontWeight: i === sliderValue ? 700 : 400 }}>
                                            {i === sliderValue ? '●' : '○'}
                                        </span>
                                    ))}
                                </div>
                                <button
                                    onClick={() => recordAndNext(current.id, sliderValue)}
                                    style={{
                                        width: '100%', padding: '16px',
                                        borderRadius: '16px', border: 'none',
                                        background: 'linear-gradient(135deg, #0891b2, #0e7490)',
                                        color: 'white', fontSize: '1rem', fontWeight: 700,
                                        cursor: 'pointer',
                                        fontFamily: "'Outfit', 'Noto Sans JP', sans-serif",
                                    }}
                                >
                                    次へ →
                                </button>
                            </div>
                        )}
                    </div>

                    {/* 戻るボタン */}
                    {currentIndex > 0 && (
                        <button
                            onClick={handleBack}
                            style={{
                                marginTop: '16px', width: '100%', padding: '12px',
                                background: 'none', border: 'none',
                                color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem',
                                cursor: 'pointer',
                            }}
                        >
                            ← 前の質問に戻る
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
