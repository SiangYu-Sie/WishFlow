'use client';
import { useState } from 'react';

interface User {
  id: string;
  name: string | null;
  email: string;
  role: string;
  _count: { wishes: number };
}

export default function AdminUserList({ initialUsers, currentUserId }: { initialUsers: User[]; currentUserId: string }) {
  const [users, setUsers] = useState(initialUsers);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const toggleRole = async (id: string, currentRole: string) => {
    setLoadingId(id);
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    if (res.ok) {
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    }
    setLoadingId(null);
  };

  const deleteUser = async (id: string, email: string) => {
    if (!confirm(`確定要刪除用戶「${email}」嗎？此操作無法還原。`)) return;
    setLoadingId(id);
    const res = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
    setLoadingId(null);
  };

  return (
    <div className="flex flex-col gap-3">
      {users.map(user => (
        <div key={user.id} className="admin-wish-card">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="user-avatar">
                {(user.name || user.email).charAt(0).toUpperCase()}
              </div>
              <div>
                <p style={{ fontWeight: 600, marginBottom: '0.2rem' }}>{user.name || '(未設定名稱)'}</p>
                <p className="text-secondary" style={{ fontSize: '0.9rem' }}>{user.email}</p>
                <p className="text-secondary" style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                  已提交 {user._count.wishes} 個許願
                </p>
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <span className={`status-badge ${user.role === 'admin' ? 'status-admin' : 'status-user'}`}>
                {user.role === 'admin' ? '🔑 管理員' : '👤 一般用戶'}
              </span>
              {user.id !== currentUserId && (
                <>
                  <button
                    className={user.role === 'admin' ? 'btn-outline-small' : 'btn-success-small'}
                    disabled={loadingId === user.id}
                    onClick={() => toggleRole(user.id, user.role)}
                  >
                    {loadingId === user.id
                      ? <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }} />
                      : user.role === 'admin' ? '降為一般用戶' : '升為管理員'}
                  </button>
                  <button
                    className="btn-danger-small"
                    disabled={loadingId === user.id}
                    onClick={() => deleteUser(user.id, user.email)}
                  >
                    🗑
                  </button>
                </>
              )}
              {user.id === currentUserId && (
                <span className="text-secondary" style={{ fontSize: '0.85rem' }}>(目前登入)</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
