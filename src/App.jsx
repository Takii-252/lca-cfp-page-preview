import './App.css'
import { useState, useEffect, useRef } from 'react'
import { ChevronRight, Wrench, TrendingUp, MonitorSmartphone, Target, MessageCircle, CheckCircle, Building2, Leaf, ShieldCheck, FileCheck, Layers, Database, ClipboardCheck, TrendingDown, Box } from 'lucide-react'

// スクロールフェードインアニメーション用コンポーネント
function FadeInUp({ children, delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
            { threshold: 0.15 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(40px)',
            transition: `opacity 2.5s ease ${delay}ms, transform 2.5s ease ${delay}ms`,
            height: '100%'
        }}>
            {children}
        </div>
    );
}

// 1. お悩み解決セクション（PainPoints）
function PainPoints() {
    const points = [
        { title: '環境法規制、顧客要求に対応できる人材が不足', image: './problem_icon_1.png' },
        { title: '算定業務が属人化しており業務効率化できない', image: './problem_icon_2.png' },
        { title: '算定までで止まっており、削減取組みが進まない', image: './problem_icon_3.png' }
    ];

    return (
        <section className="pain-points section" style={{ paddingBottom: '56px' }}>
            <h2 className="section-title" style={{ fontSize: '32px', marginBottom: '64px' }}>こんなお悩み、ありませんか？</h2>

            {/* invox風に、余白を広くとった縦長カード並び */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', maxWidth: '1000px', margin: '0 auto', paddingBottom: '0' }}>
                {points.map((point, index) => (
                    <FadeInUp key={index} delay={index * 600}>
                        <div style={{
                            border: '1px solid var(--border)',
                            background: 'var(--white)',
                            padding: '40px 24px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            height: '100%'
                        }}>
                            <h3 style={{ fontSize: '15px', color: 'var(--text-main)', textAlign: 'center', lineHeight: '1.6', marginBottom: '32px', fontWeight: 'bold' }}>{point.title}</h3>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <img src={point.image} alt="お悩みアイコン" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
                            </div>
                        </div>
                    </FadeInUp>
                ))}
            </div>
        </section>
    );
}

// 2. 追従するCTAボタン（StickyCTA）
function StickyCTA() {
    const [isVisible, setIsVisible] = useState(false);

    // スクロール量が300pxを超えたらボタンを表示する（useEffectの活用）
    useEffect(() => {
        function handleScroll() {
            setIsVisible(window.scrollY > 300);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div className="sticky-cta">
            <div className="sticky-content">
                <p className="sticky-text">LCA算定に関するお悩み、まずはプロにご相談ください。</p>
                <div className="sticky-buttons">
                    <button className="btn btn-outline" onClick={() => alert('資料ダウンロード画面へ遷移します')}>
                        資料ダウンロード
                    </button>
                    <button className="btn btn-primary" onClick={() => alert('無料相談画面へ遷移します')}>
                        <MessageCircle size={18} style={{ marginRight: '8px' }} />
                        無料相談・お問い合わせ
                    </button>
                </div>
            </div>
        </div>
    );
}

// 1.5. 支援の流れ（ServiceFlow）
function ServiceFlow() {
    const steps = [
        { step: '01', title: '方針設計', desc: '実施目的、最終ゴール設定、社内合意形成支援', icon: <Target size={32} strokeWidth={1.5} /> },
        { step: '02', title: '体制構築', desc: '業務プロセス設計　現状分析', icon: <Layers size={32} strokeWidth={1.5} /> },
        { step: '03', title: 'データ収集', desc: 'SCOPE1,2,3／CFP・LCAデータ整備', icon: <Database size={32} strokeWidth={1.5} /> },
        { step: '04', title: '排出量算定', desc: '算定実施・登録・開示資料作成', icon: <ClipboardCheck size={32} strokeWidth={1.5} /> },
        { step: '05', title: '導入・定着', desc: '社内ガイドライン・システム・ツール導入支援', icon: <MonitorSmartphone size={32} strokeWidth={1.5} /> },
        { step: '06', title: '削減', desc: '工場DX支援', icon: <TrendingDown size={32} strokeWidth={1.5} /> }
    ];

    return (
        <section className="service-flow section bg-light" style={{ paddingTop: '56px', paddingBottom: '0.6px' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                <h2 className="section-title" style={{ marginBottom: '24px', lineHeight: '1.4' }}>DXと実務コンサルティングで<br />効率化・精度向上までを一貫支援</h2>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)' }}>
                    パーソルクロステクノロジーの専門エンジニアが、貴社のチームの一員として<br />
                    各フェーズに深く寄り添い、複雑な算定業務から戦略策定まで一貫してサポートします。
                </p>
            </div>

            <div className="timeline-container" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {steps.map((s, i) => (
                    <div key={i} className="timeline-item" style={{ display: 'flex', gap: '32px', position: 'relative' }}>
                        {/* 順番を示す縦線（最後の要素以外） */}
                        {i !== steps.length - 1 && (
                            <div style={{ position: 'absolute', top: '70px', left: '39px', bottom: '-40px', width: '2px', background: 'var(--primary)', opacity: '0.3', zIndex: 0 }}></div>
                        )}

                        {/* ナンバリング丸アイコン */}
                        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--white)', border: '4px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                                <span style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary)', lineHeight: '1', fontFamily: 'Arial, sans-serif' }}>{s.step}</span>
                            </div>
                        </div>

                        {/* カード部分 */}
                        <div className="step-card" style={{ flex: 1, background: 'var(--white)', padding: '32px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', position: 'relative' }}>
                            {/* 左向きの三角矢印（吹き出し風） */}
                            <div style={{ position: 'absolute', top: '32px', left: '-12px', width: '0', height: '0', borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderRight: '12px solid var(--white)' }}></div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                                <div style={{ color: 'var(--primary)', background: '#e6f2ec', padding: '16px', borderRadius: '50%', display: 'flex' }}>{s.icon}</div>
                                <div>
                                    <h3 style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--text-main)', margin: 0 }}>{s.title}</h3>
                                </div>
                            </div>
                            <div style={{ fontSize: '13px', color: 'var(--primary)', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '8px' }}>サービス提供範囲</div>
                            <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 2. 当社が選ばれる理由（統合セクション）
function ReasonsToChoose() {
    const reasons = [
        {
            title: 'GHG/LCA/CFP 専門エンジニアによる伴走型支援',
            desc: '最新の専門知識を有するエンジニアが現場に深く入り込み、データ収集から算定、削減戦略の策定までを総合的にサポートします。\n\n「請負」「派遣」「人材紹介」といった多様なご契約形態をご用意しており、貴社のリソース状況やプロジェクトフェーズに合わせた最適なチーム編成と柔軟な支援を実現します。',
            image: './reason_icon_engineer.png'
        },
        {
            title: '業務のデジタル化、ツール開発、導入支援',
            desc: '現場が継続的に業務運用できる体制を実現する為の運用設計、システム要件定義はもちろん、開発まで一貫してサポートします。',
            image: './reason_icon_calculation.png'
        },
        {
            title: '欧州環境法規制、国内外情報開示、データ連携にも対応',
            desc: '企業全体のScope1〜3の算定だけでなく、より複雑で厳密な「製品単位（CFP）」のCO2排出量可視化の開発や算定に強みを持ちます。\n\n欧州の炭素国境調整措置（CBAM）や欧州電池規則、自動車業界特有の複雑なLCA要件など、絶えず変化する国内外の最新の環境法規制に確実に対応。グローバル市場における競争力強化とリスク回避を強力にバックアップします。',
            image: './reason_icon_compliance.png'
        }
    ];

    return (
        <section className="reasons-section section" style={{ background: 'var(--bg-light)' }}>
            <h2 className="section-title">パーソルクロステクノロジーが<br />選ばれる理由</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', maxWidth: '1100px', margin: '40px auto 0' }}>
                {reasons.map((r, i) => (
                    <div key={i} className="reason-card" style={{
                        border: '3px solid var(--primary)',
                        borderRadius: '12px',
                        padding: '40px 32px',
                        background: 'var(--white)',
                        textAlign: 'left',
                        boxShadow: 'var(--shadow-md)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'center' }}>
                            <img src={r.image} alt="feature icon" style={{ width: '160px', height: '160px', objectFit: 'contain' }} />
                        </div>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-main)', marginBottom: '20px', lineHeight: '1.5', borderBottom: '2px solid var(--bg-primary)', paddingBottom: '16px', textAlign: 'center', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{r.title}</h3>
                        <p style={{ color: 'var(--text-main)', fontSize: '15px', lineHeight: '1.8', flexGrow: 1, whiteSpace: 'pre-line' }}>{r.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 3. 導入実績（Achievements）
function Achievements() {
    const achievements = [
        {
            industry: '完成車メーカー',
            image: './industry_auto_1773122610393.png',
            details: ['車両単位 CO2 算定', '材料 DB 構築', '製造、走行、廃棄原単位データ構築', '環境影響評価方法の調査分析']
        },
        {
            industry: '部品メーカー',
            image: './feature_supply_1773123157967.png',
            details: ['電池規則対応 CFP 算定', 'コンプレッサー CFP 算定', 'ハーネス製品 CFP 算定', 'アジア、欧州の再エネ、充電インフラ調査']
        },
        {
            industry: '化学メーカー',
            image: './industry_chem_1773122647243.png',
            details: ['ラベル CFP 算定', 'ポリエチレンシート CFP 算定', '活性剤、油性材の CFP 算定', 'エンジニアプラスチック CFP 算定']
        },
        {
            industry: '鉄鋼・製紙メーカー・他',
            image: './industry_steel_1773122623070.png',
            details: ['工場単位、製品単位 CO2 算定', '鉄粉新製法の排出量シミュレーション', 'ステンレス材の CBAM、EPD 用算定', '水素活用時の排出量シミュレーション']
        }
    ];

    return (
        <section className="achievements section bg-light">
            <h2 className="section-title">製造メーカーでの算定実績</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px' }}>
                完成車、部品、化学、鉄鋼・製紙など、さまざまな製造領域での算定・調査支援実績があります。
            </p>
            <div className="achievements-grid">
                {achievements.map((ach, i) => (
                    <div key={i} className="achievement-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--white)', borderRadius: 'var(--radius-md)', borderTop: 'none', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                        <div style={{ width: '100%', height: '210px', background: '#f8f9fa' }}>
                            <img src={ach.image} alt={ach.industry} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <Building2 size={24} color="var(--primary)" />
                                <div style={{ fontWeight: 'bold', fontSize: '20px' }}>{ach.industry}</div>
                            </div>
                            <ul style={{ listStyleType: 'disc', paddingLeft: '22px', color: 'var(--text-main)', fontSize: '15px', lineHeight: 1.8, margin: 0 }}>
                                {ach.details.map((detail, idx) => (
                                    <li key={idx}>{detail}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// 4. LCA/CFPとは（AboutLCA） - 解決のアンサーとして再構成
function AboutLCA() {
    const serviceItems = [
        {
            number: '01',
            title: '算定体制構築支援',
            desc: <>継続的な情報開示が可能な<br />体制構築を支援します</>,
            outcome: 'PMO＋実務代行',
            image: './feature_label_1773123144475.png',
            alt: '算定体制構築'
        },
        {
            number: '02',
            title: '算定DX',
            desc: <>貴社のリソース不足や専門領域を補完し<br />迅速なDX化を支援します</>,
            outcome: '業務生産性向上',
            image: './feature_supply_1773123157967.png',
            alt: '算定DX'
        },
        {
            number: '03',
            title: 'GHG削減×工場DX',
            desc: <>排出量データと工程データを連動させ<br />GHG削減と生産性の両立を支援します</>,
            outcome: '経営判断指標に',
            image: './feature_sim_1773123175505.png',
            alt: 'GHG削減と工場DX'
        }
    ];

    return (
        <section className="about-lca section" style={{ paddingTop: '56px', paddingBottom: '48px' }}>
            <h2 className="section-title" style={{ fontSize: '28px', color: 'var(--primary)', marginBottom: '16px' }}>そのお悩み、パーソルクロステクノロジーが解決します</h2>
            <p style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', marginBottom: '40px' }}>【算定体制構築・DX化・削減】3つの業務を継続運用できる業務に変換</p>

            <div style={{ margin: '0 auto', color: 'var(--text-main)' }}>

                {/* 支援内容をカード内に集約し、見出しの重複を避ける */}
                <div>
                    <h3 style={{ fontSize: '32px', marginBottom: '48px', color: 'var(--primary)', textAlign: 'center' }}>当社の支援で達成できる主な目的</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
                        {serviceItems.map((item, index) => (
                            <FadeInUp key={item.number} delay={index * 150}>
                                <div style={{ border: '2px solid var(--primary)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--white)', boxShadow: 'var(--shadow-sm)', height: '100%', textAlign: 'center' }}>
                                    <div style={{ background: 'var(--primary)', color: 'var(--white)', padding: '14px 16px 12px' }}>
                                        <div style={{ fontSize: '28px', lineHeight: '1', fontWeight: 'bold', marginBottom: '8px' }}>{item.number}</div>
                                        <h4 style={{ fontSize: '18px', lineHeight: '1.4', fontWeight: 'bold', margin: 0 }}>{item.title}</h4>
                                    </div>
                                    <div style={{ padding: '24px 20px 22px' }}>
                                        <div style={{ width: '190px', height: '190px', background: '#f8f9fa', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: 'var(--shadow-sm)', margin: '0 auto 20px' }}>
                                            <img src={item.image} alt={item.alt} style={{ width: '110%', height: '110%', objectFit: 'cover' }} />
                                        </div>
                                        <p style={{ fontSize: '15px', lineHeight: '1.7', minHeight: '76px', margin: '0 0 14px' }}>{item.desc}</p>
                                        <div style={{ fontSize: '22px', fontWeight: 'bold', color: 'var(--text-main)' }}>{item.outcome}</div>
                                    </div>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}



// 7. ご支援開始までの流れ（SupportFlow）
function SupportFlow() {
    const flowSteps = [
        { label: 'お問い合わせ', desc: 'お電話または問い合わせフォームよりお問い合わせください。' },
        { label: 'ヒアリング', desc: '当社の担当がご連絡。貴社の課題をヒアリングし、最適なサービスのご提案をいたします。' },
        { label: 'お見積もり・ご契約', desc: 'お見積もりをご展開し、契約を行います。' },
        { label: 'ご支援開始', desc: 'お客さまに合わせた形でのサービス支援を開始します。' }
    ];

    return (
        <section className="support-flow section bg-light">
            <h2 className="section-title">LCA/CFPのご支援開始までの流れ</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
                {flowSteps.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '24px', background: 'var(--white)', padding: '24px', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ background: 'var(--primary)', color: 'var(--white)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>
                            {i + 1}
                        </div>
                        <div>
                            <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{f.label}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '15px' }}>{f.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

// === メインのAppコンポーネント ===
function App() {
    return (
        <div className="app-container">
            {/* ヘッダー（仮） */}
            <header className="header">
                <div className="logo-area">
                    {/* 公式サイトのSVGロゴを使用 */}
                    <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="パーソルクロステクノロジー" style={{ height: '32px' }} />
                </div>
                <nav className="nav-links">
                    <a href="#service">サービス</a>
                    <a href="#case">事例</a>
                    <button className="btn btn-primary btn-sm">お問い合わせ</button>
                </nav>
            </header>

            {/* ヒーローセクション（ファーストビュー） - 全幅背景に変更 */}
            <div className="hero-section-wrapper" style={{
                position: 'relative',
                width: '100%',
                background: 'var(--secondary)',
                overflow: 'hidden',
                borderBottom: '1px solid var(--border)'
            }}>
                {/* 背景画像（右側に大きく配置し、左へグラデーションで透過させる） */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '70%',
                    height: '100%',
                    backgroundImage: 'url(./hero_bg_realistic.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'left center',
                    maskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 50%)',
                    zIndex: 0
                }}></div>

                <section className="hero-container" style={{ position: 'relative', zIndex: 1, minHeight: '600px', display: 'flex', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
                    <div className="hero-content" style={{ maxWidth: '680px', background: 'linear-gradient(90deg, rgba(244,246,248,1) 60%, rgba(244,246,248,0.7) 80%, transparent 100%)', padding: '40px 40px 40px 0', borderRadius: '8px' }}>
                        <h1 className="hero-title" style={{ fontSize: '26px', lineHeight: '1.45', marginBottom: '24px' }}>
                            パーソルクロステクノロジーの環境ソリューション<br />
                            <span className="highlight" style={{ fontSize: '38px' }}>[GHG][LCA][CFP]</span>の<br />
                            排出量算定業務コンサルティング<br />
                            業務・エネルギー生産性向上支援
                        </h1>
                        <p className="hero-text" style={{ fontSize: '18px', marginBottom: '40px', color: 'var(--text-muted)' }}>
                            環境分野のエキスパートが<br />
                            データ連携基盤構築、認証取得、削減取組みを支援します
                        </p>
                    </div>
                </section>
            </div>

            {/* お悩み解決コンポーネント（課題提示） */}
            <PainPoints />

            {/* 新規：LCA/CFPとは（解決策へのアンサー） */}
            <AboutLCA />

            {/* 配置変更：算定の5ステップ（どんなプロセスで伴走するか） */}
            <ServiceFlow />

            {/* 新規統合：当社が選ばれる理由（サービス・契約・強みを統合） */}
            <ReasonsToChoose />

            {/* 導入実績（安心感の実証） */}
            <Achievements />

            {/* 新規：支援までの流れ（行動の促進／最後のクロージング） */}
            <SupportFlow />

            {/* 追従コンポーネント */}
            <StickyCTA />
        </div>
    )
}

export default App
