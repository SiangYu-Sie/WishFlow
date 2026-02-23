import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  const wishes = await prisma.wish.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { name: true, email: true }
      }
    }
  });

  return (
    <div className="mt-8 animate-fade-up">
      <div className="mb-12 border-b pb-6" style={{ borderColor: 'var(--glass-border)' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
          <span className="text-gradient">超級管理員</span> 控制台 🔒
        </h2>
        <p className="text-secondary" style={{ fontSize: '1.1rem' }}>掌握全球系統許願脈動，準備開發新專案。</p>
      </div>

      <div className="flex flex-col gap-6 delay-1 animate-fade-up">
        {wishes.length === 0 ? (
          <div className="glass-card text-center py-12">
            <h3 className="mb-4">清單空空如也</h3>
            <p className="text-secondary">還沒有任何許願進來，坐等接案！</p>
          </div>
        ) : (
          wishes.map((wish: any) => (
            <div key={wish.id} className="glass-card flex flex-col gap-4" style={{ padding: '2rem' }}>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 style={{ fontSize: '1.4rem' }}>{wish.purpose}</h3>
                  <p className="text-secondary text-sm mt-1">
                    提案者：{wish.user?.name || '訪客'} ({wish.customerEmail})
                  </p>
                </div>
                <span className={`status-badge ${wish.status === 'pending' ? 'status-pending' : 'status-success'}`}>
                  {wish.status === 'pending' ? '尚未處理 🚀' : '已結案 ✅'}
                </span>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="mb-4 flex flex-col gap-1">
                  <strong className="text-secondary">【具體用途】</strong>
                  <p>{wish.usage}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <strong className="text-secondary">【詳細需求】</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>{wish.requirements}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                  🕒 建立時間：{new Date(wish.createdAt).toLocaleString()}
                </p>
                {wish.status === 'pending' && (
                  <button className="btn-primary" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem' }}>
                    標記為已處理
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
