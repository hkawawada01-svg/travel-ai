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
        const keyword = searchParams.get('keyword') || dest;
        const tagline = searchParams.get('tagline') || 'まだ知らない自分の旅が、ある。';

        // 描画するすべての文字列からユニークな文字セットを抽出する
        const allText = 'あなたの旅人タイプは...型『』そんなあなたにおすすめなのは📍' + type + typeName + dest + emoji + tagline + 'RESULTTRAVELERBESTRECOMMENDATIONAIPLANNERfind-my-trip-ai.com';
        const uniqueChars = Array.from(new Set(allText.split(''))).join('');
        const fontData = await getFont(uniqueChars);

        const bgUrl = `https://loremflickr.com/1200/630/${encodeURIComponent(keyword)},landscape/all`;

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
                        backgroundColor: '#0f172a',
                        fontFamily: '"Noto Sans JP", sans-serif',
                        position: 'relative',
                        padding: '40px',
                    }}
                >
                    {/* Background Blur Image */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={bgUrl}
                        alt="bg"
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            opacity: 0.6,
                        }}
                    />

                    {/* White Card */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'white',
                            width: '90%',
                            height: '85%',
                            borderRadius: '32px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                            padding: '40px 60px',
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        {/* Decorative Top Bar */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '12px', background: 'linear-gradient(90deg, #0ea5e9, #2563eb)' }}></div>

                        {/* Top Section */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: '#64748b', letterSpacing: '0.1em' }}>RESULT: TRAVELER TYPE</div>
                                <div style={{ fontSize: '48px', fontWeight: 900, color: '#1e293b', marginTop: '4px' }}>{typeName}</div>
                                <div style={{ fontSize: '22px', fontWeight: 700, color: '#0ea5e9', marginTop: '8px' }}>『{tagline}』</div>
                            </div>
                            <div style={{ fontSize: '100px', lineHeight: 1 }}>{emoji}</div>
                        </div>

                        {/* Recommendation Mid Bar */}
                        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '24px 0' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#64748b', marginBottom: '8px' }}>BEST RECOMMENDATION</div>
                                <div style={{ fontSize: dest.length > 12 ? '48px' : '64px', fontWeight: 900, color: '#0f172a', lineHeight: 1.1 }}>
                                    📍 {dest}
                                </div>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div style={{ fontSize: '18px', fontWeight: 700, color: '#94a3b8' }}>Type ID: {type}</div>
                                <div style={{ fontSize: '24px', fontWeight: 900, color: '#334155' }}>AI TRAVEL PLANNER</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f1f5f9', padding: '12px 24px', borderRadius: '100px' }}>
                                <div style={{ fontSize: '20px', fontWeight: 900, color: '#2563eb' }}>find-my-trip-ai.com</div>
                            </div>
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
