import type { Metadata } from 'next';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site.netlify.app';

export const metadata: Metadata = {
  title: 'AI旅行先診断 | まだ知らない自分の旅が、ある。',
  description: 'あなたが本当に行きたい場所を、AIが一緒に探します。旅人タイプ診断で、気づいていなかった旅先が見つかる。約3分、無料、登録不要。',
  keywords: '旅行先診断, AI旅行, 旅行先おすすめ, 旅人タイプ, 一人旅, 旅行先が決まらない, AI診断',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'AI旅行先診断 | まだ知らない自分の旅が、ある。',
    description: 'あなたが本当に行きたい場所を、AIが一緒に探します。旅人タイプ診断で、気づいていなかった旅先が見つかる。',
    type: 'website',
    url: siteUrl,
    siteName: 'AI旅行先診断',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'AI旅行先診断 — まだ知らない自分の旅が、ある。',
      },
    ],
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI旅行先診断 | まだ知らない自分の旅が、ある。',
    description: 'あなたが本当に行きたい場所をAIが一緒に探します。約3分・無料・登録不要。',
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#0891b2" />

        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-049XV04SXD"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-049XV04SXD', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
