import { redirect } from 'next/navigation';
import { travelerTypes, TravelerTypeId } from '@/data/travelerTypes';

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const type = params.type as string;
    const dest = params.dest as string;
    const keyword = (params.keyword as string) || dest;

    // タイプコードから型データを取り出す
    const typeId = type as TravelerTypeId;
    const t = travelerTypes[typeId];

    if (!t || !dest) {
        return {
            title: 'AI旅行先診断 | まだ知らない自分の旅が、ある。',
            description: 'AIがあなたの旅人タイプと最適な旅行先を分析します。',
        };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://find-my-trip-ai.com';

    // OG画像のURLを組み立てる
    const ogImageUrl = new URL(`${siteUrl}/api/og`);
    ogImageUrl.searchParams.set('type', t.id);
    ogImageUrl.searchParams.set('typeName', t.name);
    ogImageUrl.searchParams.set('emoji', t.emoji);
    ogImageUrl.searchParams.set('dest', dest);
    ogImageUrl.searchParams.set('keyword', keyword);
    ogImageUrl.searchParams.set('tagline', t.tagline);
    // color is not heavily used in new design, but kept for compatibility
    ogImageUrl.searchParams.set('color', t.color);

    const title = `AI旅行先診断結果：私は【${t.name}】タイプ！おすすめは【${dest}】`;
    const description = `AIが弾き出した私にぴったりの旅行先は「${dest}」でした！あなたも今すぐ無料で診断してみよう✈️`;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: 'website',
            url: `${siteUrl}/share?type=${type}&dest=${encodeURIComponent(dest)}&keyword=${encodeURIComponent(keyword)}`,
            images: [
                {
                    url: ogImageUrl.toString(),
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [ogImageUrl.toString()],
        },
    };
}

export default async function ShareRedirectPage() {
    // ユーザーがXなどのリンクを踏んでここにアクセスしてきたら、
    // 自動的に診断のトップページ（または個別解説のtypesページ）にリダイレクトさせる
    redirect('/');
}
