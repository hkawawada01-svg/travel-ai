import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

// フォントを動的に取得するヘルパー
async function getFont(text: string) {
    const API = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&text=${encodeURIComponent(text)}`;
    const css = await (
        await fetch(API, {
            headers: {
                // TTF または WOFF を取得するためのレガシーUser-Agent
                "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
            }
        })
    ).text();
    const resource = css.match(/src: url\((.+)\) format\('(woff|truetype)'\)/);
    if (!resource) return null;
    const res = await fetch(resource[1]);
    return res.arrayBuffer();
}

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        const type = searchParams.get('type') || 'Unknown';
        const typeName = searchParams.get('typeName') || '旅人';
        const emoji = searchParams.get('emoji') || '✈️';
        const dest = searchParams.get('dest') || '世界中のどこか';
        const color = searchParams.get('color') || 'from-cyan-500 to-blue-600';

        // 描画するすべての文字列からユニークな文字セットを抽出する
        const allText = 'AI旅行先診断あなたにぴったりの旅行先は...find-my-trip-ai.comで無料診断📍' + type + typeName + dest + emoji;
        const uniqueChars = Array.from(new Set(allText.split(''))).join('');
        const fontData = await getFont(uniqueChars);

        // Convert Tailwind gradients...
        let bgGradient = 'linear-gradient(135deg, #0ea5e9, #2563eb)'; // Default cyan-to-blue
        if (color.includes('rose') || color.includes('pink')) bgGradient = 'linear-gradient(135deg, #fb7185, #e11d48)';
        if (color.includes('emerald') || color.includes('green')) bgGradient = 'linear-gradient(135deg, #34d399, #059669)';
        if (color.includes('amber') || color.includes('yellow')) bgGradient = 'linear-gradient(135deg, #fbbf24, #d97706)';
        if (color.includes('purple') || color.includes('indigo')) bgGradient = 'linear-gradient(135deg, #c084fc, #6366f1)';
        if (color.includes('slate') || color.includes('gray')) bgGradient = 'linear-gradient(135deg, #94a3b8, #475569)';

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: bgGradient,
                        fontFamily: '"Noto Sans JP", sans-serif',
                        position: 'relative',
                    }}
                >
                    {/* Background Pattern Elements */}
                    <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>
                    <div style={{ position: 'absolute', bottom: -150, right: -50, width: 500, height: 500, borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}></div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'rgba(255, 255, 255, 0.95)',
                            padding: '60px 80px',
                            borderRadius: '40px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                            width: '85%',
                            maxWidth: '1000px',
                        }}
                    >
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#64748b', letterSpacing: '0.1em', marginBottom: '10px' }}>
                            AI旅行先診断
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                            <div style={{ fontSize: '80px', marginRight: '20px' }}>{emoji}</div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '30px', fontWeight: 'bold', color: '#94a3b8' }}>{type}型</div>
                                <div style={{ fontSize: '42px', fontWeight: '900', color: '#1e293b' }}>{typeName}</div>
                            </div>
                        </div>

                        <div style={{ fontSize: '28px', color: '#64748b', marginTop: '20px', marginBottom: '10px' }}>
                            あなたにぴったりの旅行先は...
                        </div>

                        <div
                            style={{
                                fontSize: dest.length > 15 ? '56px' : '72px',
                                fontWeight: '900',
                                color: '#0f172a',
                                textAlign: 'center',
                                lineHeight: 1.2
                            }}
                        >
                            📍 {dest}
                        </div>

                        <div style={{ marginTop: '40px', fontSize: '24px', fontWeight: 'bold', color: '#0284c7', background: '#e0f2fe', padding: '12px 30px', borderRadius: '100px' }}>
                            find-my-trip-ai.com で無料診断
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
                ...(fontData && {
                    fonts: [
                        {
                            name: 'Noto Sans JP',
                            data: fontData,
                            style: 'normal',
                            weight: 700,
                        },
                    ],
                }),
            }
        );
    } catch (e: any) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
