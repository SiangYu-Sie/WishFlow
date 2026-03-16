import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import AdminUserList from '../AdminUserList';

export default async function AdminUsersPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      _count: { select: { wishes: true } },
    },
    orderBy: { email: 'asc' },
  });

  return (
    <div className="mt-8 animate-fade-up">
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="admin-breadcrumb mb-2">
            <Link href="/admin" className="text-secondary">後台管理</Link>
            <span className="text-secondary"> / </span>
            <span>用戶管理</span>
          </div>
          <h2 style={{ fontSize: '2rem' }}>
            用戶管理 <span className="text-gradient">({users.length} 人)</span>
          </h2>
          <p className="text-secondary mt-2">管理所有注冊用戶的帳號狀態與權限。</p>
        </div>
        <Link href="/admin" className="btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.95rem' }}>
          ← 返回後台
        </Link>
      </div>

      <AdminUserList initialUsers={users} currentUserId={session.user.id!} />
    </div>
  );
}
