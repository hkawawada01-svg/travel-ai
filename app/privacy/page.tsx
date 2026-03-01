import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 border-b pb-4">
                    プライバシーポリシー・免責事項
                </h1>

                <div className="space-y-8 text-slate-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">1. アクセス解析ツールについて</h2>
                        <p>
                            当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を利用しています。
                            このGoogle Analyticsはトラフィックデータの収集のためにCookieを使用しています。
                            このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
                            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
                            この規約に関して、詳しくは<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Analytics利用規約</a>をご覧ください。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">2. 広告の配信について</h2>
                        <p>
                            当サイトは、Amazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、Amazonアソシエイト・プログラムの参加者です。
                            また、その他ASP（アフィリエイト・サービス・プロバイダ）が提供するアフィリエイトプログラムに参加しており、商品やサービスを紹介することがあります。これらのリンク先で得られたトラブル等について、当サイトは一切の責任を負いかねます。
                            （※Google AdSenseの審査通過後は、Google AdSenseによる広告配信も行います。）
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">3. 免責事項</h2>
                        <p>
                            当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
                            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
                        </p>
                        <p className="mt-2">
                            また、AIを用いた診断結果についてはエンターテイメント目的であり、その正確性や妥当性を保証するものではありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-slate-800 mb-3">4. プライバシーポリシーの変更について</h2>
                        <p>
                            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
                            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t text-center">
                    <Link href="/" className="text-cyan-600 hover:text-cyan-800 font-medium hover:underline">
                        &larr; トップページへ戻る
                    </Link>
                </div>
            </div>
        </div>
    );
}
