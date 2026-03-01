'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RecentResult {
  destination: string;
  type: string;
  emoji: string;
}

export default function HomePage() {
  const [recentResults, setRecentResults] = useState<RecentResult[]>([]);

  useEffect(() => {
    fetch('/api/recent')
      .then((r) => r.json())
      .then((data) => setRecentResults(data.results || []));
  }, []);

  return (
    <main>

      {/* ===== HERO ===== */}
      {/* 背景色は画像の空色と合わせることで画像の横が自然に埋まる */}
      <section style={{
        background: 'linear-gradient(180deg, #0e7490 0%, #0891b2 30%, #7dd3fc 65%, #87ceeb 100%)',
        paddingTop: '80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '40px', left: '-80px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />

        {/* Bubble animation keyframes */}
        <style>{`
          @keyframes bubbleRise {
            0%   { transform: translateY(0) scale(1); opacity: 0; }
            10%  { opacity: 0.55; }
            85%  { opacity: 0.25; }
            100% { transform: translateY(-120vh) scale(1.1); opacity: 0; }
          }
        `}</style>

        {/* Rising bubbles */}
        {[
          { size: 60, left: '8%', delay: '0s', dur: '8s' },
          { size: 40, left: '20%', delay: '1.5s', dur: '10s' },
          { size: 80, left: '35%', delay: '3s', dur: '12s' },
          { size: 30, left: '50%', delay: '0.8s', dur: '9s' },
          { size: 55, left: '62%', delay: '2.2s', dur: '11s' },
          { size: 70, left: '75%', delay: '4s', dur: '9.5s' },
          { size: 35, left: '88%', delay: '1s', dur: '13s' },
          { size: 45, left: '15%', delay: '5s', dur: '10s' },
          { size: 90, left: '45%', delay: '6s', dur: '14s' },
          { size: 25, left: '80%', delay: '2.8s', dur: '8.5s' },
        ].map((b, i) => (
          <div key={i} style={{
            position: 'absolute',
            bottom: '-100px',
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1.5px solid rgba(255,255,255,0.3)',
            animation: `bubbleRise ${b.dur} ${b.delay} linear infinite`,
            pointerEvents: 'none',
            zIndex: 0,
          }} />
        ))}

        {/* Text content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '0 24px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '8px 20px', borderRadius: '100px', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.25)' }}>
            <span>✨</span>
            <span style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em' }}>AI 旅人タイプ診断 — 無料</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', fontWeight: 900, lineHeight: 1.1, color: 'white', marginBottom: '20px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
            まだ知らない自分の旅が、<br />
            <span style={{ color: '#fde68a' }}>ある。</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', lineHeight: 1.85, maxWidth: '500px', margin: '0 auto 36px' }}>
            あなたが本当に行きたい場所を、AIが一緒に探します。<br />
            あなたも気づいていなかった旅先が、きっと見つかる。
          </p>

          <Link href="/quiz">
            <button style={{
              background: '#f97316',
              color: 'white',
              fontSize: '1.2rem',
              fontWeight: 700,
              padding: '18px 48px',
              borderRadius: '100px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(249,115,22,0.5)',
              fontFamily: "'Outfit', 'Noto Sans JP', sans-serif",
            }}>
              旅行先を診断する →
            </button>
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginTop: '12px', marginBottom: '0px' }}>所要時間：約3分 / 無料 / 登録不要</p>
        </div>

        {/* 画像: mask-imageで上部のみ背景に溶け込む、左右・下はそのまま */}
        <div style={{ width: '100%', lineHeight: 0, marginTop: '8px', display: 'flex', justifyContent: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.png"
            alt="旅人たちの世界"
            style={{
              width: '100%',
              maxWidth: '620px',
              height: 'auto',
              display: 'block',
              maskImage: [
                'linear-gradient(to bottom, transparent 0%, black 15%)',
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              ].join(', '),
              maskComposite: 'intersect',
              WebkitMaskImage: [
                'linear-gradient(to bottom, transparent 0%, black 15%)',
                'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
              ].join(', '),
              WebkitMaskComposite: 'source-in',
            }}
          />
        </div>
      </section>






      {/* ===== TICKER ===== */}
      <section style={{ background: '#f0fdf4', borderTop: '2px solid #d1fae5', borderBottom: '2px solid #d1fae5', padding: '16px 0', overflow: 'hidden' }}>
        <p style={{ textAlign: 'center', color: '#059669', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '12px' }}>
          🌏 みんなの診断結果
        </p>
        <div style={{ overflow: 'hidden' }}>
          <div className="ticker-track">
            {[...recentResults, ...recentResults].map((item, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', padding: '10px 20px', borderRadius: '100px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', flexShrink: 0, border: '1px solid #d1fae5' }}>
                <span style={{ fontSize: '1.2rem' }}>{item.emoji}</span>
                <div>
                  <p style={{ color: '#059669', fontSize: '0.72rem', fontWeight: 700, margin: 0 }}>{item.type}</p>
                  <p style={{ color: '#1f2937', fontSize: '0.88rem', fontWeight: 600, margin: 0, whiteSpace: 'nowrap' }}>{item.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ background: 'white', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: '#0e7490', marginBottom: '8px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
            この診断、ここが違う
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '48px', fontSize: '1rem' }}>
            旅行先を「直感」で選ぶのは悪くない。でもAIが引き出す「潜在的な好み」はもっと面白い。
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { emoji: '🧬', title: '旅人タイプ診断', desc: 'あなたの旅行スタイルを4つの軸で独自分析。16タイプの旅人キャラクターとして判定します', bg: '#eff6ff', accent: '#2563eb' },
              { emoji: '🌏', title: '「なにそこ！？」な提案', desc: 'ガイドブックに載っていない秘境から個性的な都市まで。思いがけない旅先が見つかります', bg: '#f0fdf4', accent: '#16a34a' },
              { emoji: '🤖', title: 'AIが正直すぎる', desc: 'やさしい案内から正直すぎる辛口まで、診断スタイルを選べます。まさかの旅行先を提案することも！？', bg: '#fff7ed', accent: '#ea580c' },
            ].map((f) => (
              <div key={f.title} style={{ background: f.bg, borderRadius: '20px', padding: '32px 28px' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>{f.emoji}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: f.accent, marginBottom: '10px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>{f.title}</h3>
                <p style={{ color: '#4b5563', fontSize: '0.9rem', lineHeight: 1.75, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TYPE PREVIEW ===== */}
      <section style={{ background: '#f8fafc', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 800, color: '#1f2937', marginBottom: '8px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
            16タイプの旅人、あなたはどれ？
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '40px' }}>4つの軸の組み合わせで、あなたの旅を分析します</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '500px', margin: '0 auto 40px' }}>
            {[
              { axis: '冒険度', a: '🏖️ 安心・快適', b: '🌋 秘境・未知' },
              { axis: 'スタイル', a: '🧳 ひとり旅', b: '👫 みんなと' },
              { axis: '環境', a: '🌿 自然・田舎', b: '🏙️ 都市・街' },
              { axis: '計画性', a: '📋 きっちり派', b: '🎲 ノープラン派' },
            ].map((row) => (
              <div key={row.axis} style={{ background: 'white', borderRadius: '16px', padding: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
                <p style={{ color: '#9ca3af', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{row.axis}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '4px' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{row.a}</span>
                  <span style={{ background: '#fce7f3', color: '#9d174d', padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{row.b}</span>
                </div>
              </div>
            ))}
          </div>

          <Link href="/quiz">
            <button style={{ background: '#0891b2', color: 'white', fontSize: '1.1rem', fontWeight: 700, padding: '16px 44px', borderRadius: '100px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 24px rgba(8,145,178,0.35)', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
              自分のタイプを調べる →
            </button>
          </Link>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section style={{ background: 'linear-gradient(135deg, #f97316, #fb923c)', padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 800, color: 'white', marginBottom: '12px', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
          さあ、旅に出よう
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '32px', fontSize: '1rem' }}>
          あなたが気づいていなかった旅先が、答えを待っています
        </p>
        <Link href="/quiz">
          <button style={{ background: 'white', color: '#ea580c', fontSize: '1.1rem', fontWeight: 700, padding: '16px 44px', borderRadius: '100px', border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.15)', fontFamily: "'Outfit', 'Noto Sans JP', sans-serif" }}>
            無料で診断する →
          </button>
        </Link>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ background: '#0f172a', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <Link href="/types" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>16タイプの旅人一覧</Link>
          <Link href="/articles" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>旅行のお悩み解決コラム</Link>
          <Link href="/privacy" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>プライバシーポリシー</Link>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSchC1riak4QihhbX6ak6tbphbEbQadQViFRvuYDR6unMl7hdA/viewform" target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', fontSize: '0.8rem', textDecoration: 'none' }}>お問い合わせ</a>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '4px 0' }}>© 2025 AI旅行先診断. All rights reserved.</p>
        <p style={{ color: '#64748b', fontSize: '0.78rem', margin: '4px 0' }}>※ 旅行先への安全確認は必ずご自身でお願いいたします。</p>
      </footer>
    </main>
  );
}
