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
        const allText = 'あなたの旅人タイプは...型『』そんなあなたにおすすめなのは📍' + type + typeName + dest + emoji + tagline;
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
                        justifyContent: 'center',
                        fontFamily: '"Noto Sans JP", sans-serif',
                        position: 'relative',
                        backgroundColor: '#0f172a',
                    }}
                >
                    {/* Background Image */}
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
                            opacity: 0.45,
                        }}
                    />

                    {/* Content Overlay */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '60px 80px',
                            position: 'relative',
                            zIndex: 10,
                            height: '100%',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* Top half: traveler type */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontSize: '32px', color: '#e2e8f0', marginBottom: '16px', fontWeight: 700, letterSpacing: '0.05em' }}>
                                あなたの旅人タイプは...
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <div style={{ fontSize: '72px', marginRight: '24px' }}>{emoji}</div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ fontSize: '28px', color: '#cbd5e1', fontWeight: 700, marginBottom: '4px' }}>{type}型</div>
                                    <div style={{ fontSize: '56px', color: '#ffffff', fontWeight: 900 }}>{typeName}</div>
                                </div>
                            </div>
                            <div style={{ fontSize: '28px', color: '#cbd5e1', marginTop: '16px', fontWeight: 700 }}>
                                『{tagline}』
                            </div>
                        </div>

                        {/* Bottom half: recommendation */}
                        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', background: 'rgba(0,0,0,0.65)', padding: '40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <div style={{ fontSize: '28px', color: '#e2e8f0', marginBottom: '12px', fontWeight: 700 }}>
                                そんなあなたにおすすめなのは
                            </div>
                            <div style={{ fontSize: dest.length > 15 ? '56px' : '72px', color: '#ffffff', fontWeight: 900, lineHeight: 1.2 }}>
                                📍 {dest}
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
