import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  const wishes = await prisma.wish.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
  });

  const pending = wishes.filter(w => w.status === 'pending').length;
  const done = wishes.filter(w => w.status === 'done').length;

  return (
    <div className="mt-8 animate-fade-up">
      {/* 歡迎列 */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>👋 歡迎回來</p>
          <h2 style={{ fontSize: '2.2rem' }}>
            <span className="text-gradient">{session.user.name || session.user.email}</span>
          </h2>
          <p className="text-secondary mt-2">這裡是你的許願控制台，追蹤所有提案進度。</p>
        </div>
        <Link href="/wish" className="btn-primary" style={{ padding: '0.8rem 1.8rem', fontSize: '1rem', whiteSpace: 'nowrap' }}>
          ＋ 新增許願
        </Link>
      </div>

      {/* 個人統計 */}
      {wishes.length > 0 && (
        <div className="stats-grid mb-8">
          <div className="stat-card">
            <p className="stat-label">總計</p>
            <p className="stat-value text-gradient">{wishes.length}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">評估中</p>
            <p className="stat-value" style={{ color: '#facc15' }}>{pending}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">已完成</p>
            <p className="stat-value" style={{ color: '#34d399' }}>{done}</p>
          </div>
        </div>
      )}

      {/* 許願列表 */}
      <div className="flex flex-col gap-4 delay-1 animate-fade-up">
        {wishes.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '5rem 2rem' }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>📭</div>
            <h3 style={{ marginBottom: '0.75rem' }}>你還沒有任何許願</h3>
            <p className="text-secondary mb-8">描述你的需求，讓我們幫你打造專屬系統！</p>
            <Link href="/wish" className="btn-primary">
              立即許願 🚀
            </Link>
          </div>
        ) : (
          wishes.map((wish: any) => (
            <div key={wish.id} className="admin-wish-card">
              <div className="flex justify-between items-start mb-4">
                <h3 style={{ fontSize: '1.2rem', flex: 1, marginRight: '1rem' }}>{wish.purpose}</h3>
                <span className={`status-badge ${wish.status === 'pending' ? 'status-pending' : 'status-success'}`}>
                  {wish.status === 'pending' ? '⌛ 評估中' : '✅ 已完成'}
                </span>
              </div>

              <div className="wish-content-box mb-4">
                <div className="mb-3">
                  <p className="text-secondary" style={{ fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>具體用途</p>
                  <p style={{ lineHeight: '1.6' }}>{wish.usage}</p>
                </div>
                <div>
                  <p className="text-secondary" style={{ fontSize: '0.8rem', marginBottom: '0.3rem', textTransform: 'uppercase', letterSpacing: '1px' }}>詳細需求</p>
                  <p style={{ lineHeight: '1.6', whiteSpace: 'pre-line' }}>{wish.requirements}</p>
                </div>
              </div>

              <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                🕒 {new Date(wish.createdAt).toLocaleString('zh-TW')}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

