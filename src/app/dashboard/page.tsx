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
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="mt-8 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
            哈囉, <span className="text-gradient">{session.user.name || session.user.email}</span> 👋
          </h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem' }}>歡迎來到您的個人控制台，管理所有發出的願望。</p>
        </div>
        <Link href="/wish" className="btn-primary" style={{ padding: '0.8rem 1.5rem', fontSize: '1rem' }}>
          ＋ 新增願望
        </Link>
      </div>

      <div className="flex flex-col gap-6 mt-12 delay-1 animate-fade-up">
        {wishes.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 className="mb-4">您的清單還是空的</h3>
            <p className="text-secondary mb-8">您尚未提出任何系統需求願望</p>
            <Link href="/wish" className="btn-secondary">
              立即去許願
            </Link>
          </div>
        ) : (
          wishes.map((wish: any) => (
            <div key={wish.id} className="glass-card flex flex-col gap-4" style={{ padding: '2rem' }}>
              <div className="flex justify-between items-center">
                <h3 style={{ fontSize: '1.4rem' }}>{wish.purpose}</h3>
                <span className={`status-badge ${wish.status === 'pending' ? 'status-pending' : 'status-success'}`}>
                  {wish.status === 'pending' ? '評估中 ⌛' : '處理完成 ✅'}
                </span>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="mb-4">
                  <strong className="text-secondary block mb-1">【具體用途】</strong>
                  <p>{wish.usage}</p>
                </div>
                <div>
                  <strong className="text-secondary block mb-1">【詳細需求】</strong>
                  <p style={{ whiteSpace: 'pre-line' }}>{wish.requirements}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
                  🕒 建立時間：{new Date(wish.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
