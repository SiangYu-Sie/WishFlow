import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center animate-fade-up mt-12 text-center" style={{ minHeight: '80vh' }}>
      
      <div 
        style={{
          display: 'inline-block',
          padding: '0.4rem 1rem',
          borderRadius: '100px',
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          marginBottom: '2rem',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#60a5fa'
        }}
        className="delay-1"
      >
        ✨ 系統客製化新體驗
      </div>

      <h1 style={{ fontSize: '4.5rem', letterSpacing: '-2px', marginBottom: '1.5rem', maxWidth: '800px', lineHeight: '1.1' }} className="delay-1">
        把你的夢想化作<br/>
        <span className="text-gradient">真實軟體系統</span>
      </h1>
      
      <p className="text-secondary delay-2" style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '3rem', lineHeight: '1.6' }}>
        只要告訴我們需求，我們將在 <strong style={{color:'white'}}>一週內</strong> 為您免費打造專屬的軟體模擬預覽。不再瞎子摸象，親眼見證你的想法成真。
      </p>
      
      <div className="flex gap-4 mb-8 delay-3">
        <Link href="/wish" className="btn-primary">
          立即許願 🚀
        </Link>
        <Link href="/register" className="btn-secondary">
          註冊會員
        </Link>
      </div>

      <div className="flex flex-wrap justify-center gap-6 mt-12 delay-3" style={{width: '100%'}}>
        <div className="glass-card" style={{ flex: '1 1 300px', textAlign: 'left' }}>
          <div style={{fontSize: '2rem', marginBottom: '1rem'}}>1️⃣</div>
          <h3 className="mb-2">描述你的痛點</h3>
          <p className="text-secondary" style={{fontSize: '0.95rem'}}>
            詳細描述您碰到什麼問題，需要系統怎麼幫你解決。
          </p>
        </div>
        <div className="glass-card" style={{ flex: '1 1 300px', textAlign: 'left' }}>
          <div style={{fontSize: '2rem', marginBottom: '1rem'}}>2️⃣</div>
          <h3 className="mb-2">架構與評估</h3>
          <p className="text-secondary" style={{fontSize: '0.95rem'}}>
            我們的資深工程師會在後台進行系統架構規劃與評估。
          </p>
        </div>
        <div className="glass-card" style={{ flex: '1 1 300px', textAlign: 'left' }}>
          <div style={{fontSize: '2rem', marginBottom: '1rem'}}>3️⃣</div>
          <h3 className="mb-2">獲得 MVP 預覽</h3>
          <p className="text-secondary" style={{fontSize: '0.95rem'}}>
            一週內即刻收到含有模擬資料的系統預覽網址，體驗完整流程。
          </p>
        </div>
      </div>
    </div>
  );
}
