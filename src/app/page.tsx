import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade-up">
      {/* Hero 區塊 */}
      <div className="hero-section">
        <div className="hero-badge delay-1">✨ 客製化軟體開發新體驗</div>

        <h1 className="hero-title delay-1">
          把你的想法<br />
          <span className="text-gradient">變成真實系統</span>
        </h1>

        <p className="hero-subtitle delay-2">
          只要描述需求，我們將在 <strong style={{ color: 'white' }}>一週內</strong> 為您打造
          <br />專屬的軟體模擬預覽，親眼見證想法成真。
        </p>

        <div className="hero-actions delay-3">
          <Link href="/wish" className="btn-primary">
            立即許願 🚀
          </Link>
          <Link href="/register" className="btn-secondary">
            免費註冊
          </Link>
        </div>

        <div className="hero-stats delay-3">
          <div className="hero-stat">
            <strong>100%</strong>
            <span>免費體驗</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <strong>7 天</strong>
            <span>交付預覽</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <strong>0</strong>
            <span>前期費用</span>
          </div>
        </div>
      </div>

      {/* 流程說明 */}
      <div className="section-title delay-2">
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>三步驟，輕鬆上線</h2>
        <p className="text-secondary">從提出需求到看到成品，整個過程簡單透明。</p>
      </div>

      <div className="features-grid delay-3">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>描述你的需求</h3>
          <p className="text-secondary">
            詳細說明你遇到的問題與期望系統如何解決，越具體越好。
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚙️</div>
          <h3>工程師評估規劃</h3>
          <p className="text-secondary">
            資深工程師接手後在後台進行系統架構設計與開發可行性評估。
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎯</div>
          <h3>取得 MVP 預覽</h3>
          <p className="text-secondary">
            一週內收到含模擬資料的完整系統預覽網址，親身體驗操作流程。
          </p>
        </div>
      </div>

      {/* CTA 區塊 */}
      <div className="cta-section delay-3">
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>準備好了嗎？</h2>
        <p className="text-secondary" style={{ marginBottom: '2rem', fontSize: '1.1rem' }}>
          現在就提交你的需求，讓我們一起把它變成現實。
        </p>
        <Link href="/register" className="btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 3rem' }}>
          立即免費開始 →
        </Link>
      </div>
    </div>
  );
}

