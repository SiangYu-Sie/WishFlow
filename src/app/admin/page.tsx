import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminWishList from './AdminWishList';

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  const [wishes, totalUsers] = await Promise.all([
    prisma.wish.findMany({
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { name: true, email: true } } },
    }),
    prisma.user.count(),
  ]);

  const pending = wishes.filter(w => w.status === 'pending').length;
  const done = wishes.filter(w => w.status === 'done').length;

  return (
    <div className="mt-8 animate-fade-up">
      {/* 標題列 */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            🔑 管理員後台
          </p>
          <h2 style={{ fontSize: '2.2rem' }}>
            歡迎，<span className="text-gradient">{session.user.name || session.user.email}</span>
          </h2>
        </div>
        <Link href="/admin/users" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
          👥 用戶管理
        </Link>
      </div>

      {/* 統計卡片 */}
      <div className="stats-grid mb-8">
        <div className="stat-card">
          <p className="stat-label">總許願數</p>
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
        <div className="stat-card">
          <p className="stat-label">註冊用戶</p>
          <p className="stat-value" style={{ color: '#60a5fa' }}>{totalUsers}</p>
        </div>
      </div>

      {/* 許願列表 */}
      <div className="delay-1 animate-fade-up">
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
          所有許願紀錄
        </h3>
        <AdminWishList initialWishes={wishes as any} />
      </div>
    </div>
  );
}
