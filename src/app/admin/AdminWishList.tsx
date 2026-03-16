'use client';
import { useState } from 'react';

interface Wish {
  id: string;
  purpose: string;
  usage: string;
  requirements: string;
  status: string;
  createdAt: string;
  customerEmail: string;
  user?: { name?: string | null; email?: string | null } | null;
}

export default function AdminWishList({ initialWishes }: { initialWishes: Wish[] }) {
  const [wishes, setWishes] = useState(initialWishes);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'done'>('all');

  const filtered = filter === 'all' ? wishes : wishes.filter(w => w.status === filter);

  const toggleStatus = async (id: string, currentStatus: string) => {
    setLoadingId(id);
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    const res = await fetch(`/api/wish/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      setWishes(prev => prev.map(w => w.id === id ? { ...w, status: newStatus } : w));
    }
    setLoadingId(null);
  };

  const deleteWish = async (id: string) => {
    if (!confirm('確定要刪除這筆許願嗎？')) return;
    setDeletingId(id);
    const res = await fetch(`/api/wish/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setWishes(prev => prev.filter(w => w.id !== id));
    }
    setDeletingId(null);
  };

  return (
    <div>
      {/* 篩選標籤 */}
      <div className="flex gap-2 mb-6">
        {(['all', 'pending', 'done'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={filter === f ? 'filter-tab active' : 'filter-tab'}
          >
            {f === 'all' ? `全部 (${wishes.length})` : f === 'pending' ? `評估中 (${wishes.filter(w => w.status === 'pending').length})` : `已完成 (${wishes.filter(w => w.status === 'done').length})`}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.length === 0 ? (
          <div className="glass-card text-center" style={{ padding: '4rem 2rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
            <h3 className="mb-2">目前沒有紀錄</h3>
            <p className="text-secondary">此分類下暫無資料。</p>
          </div>
        ) : (
          filtered.map((wish) => (
            <div key={wish.id} className="admin-wish-card">
              <div className="flex justify-between items-start mb-4">
                <div style={{ flex: 1, marginRight: '1rem' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.4rem' }}>{wish.purpose}</h3>
                  <div className="flex gap-3 items-center flex-wrap">
                    <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      👤 {wish.user?.name || '訪客'}
                    </span>
                    <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      📧 {wish.customerEmail}
                    </span>
                    <span className="text-secondary" style={{ fontSize: '0.85rem' }}>
                      🕒 {new Date(wish.createdAt).toLocaleString('zh-TW')}
                    </span>
                  </div>
                </div>
                <span className={`status-badge ${wish.status === 'pending' ? 'status-pending' : 'status-success'}`}>
                  {wish.status === 'pending' ? '評估中' : '已完成'}
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

              <div className="flex gap-3 justify-end">
                <button
                  className="btn-danger-small"
                  disabled={deletingId === wish.id}
                  onClick={() => deleteWish(wish.id)}
                >
                  {deletingId === wish.id ? <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }} /> : '🗑 刪除'}
                </button>
                <button
                  className={wish.status === 'pending' ? 'btn-success-small' : 'btn-outline-small'}
                  disabled={loadingId === wish.id}
                  onClick={() => toggleStatus(wish.id, wish.status)}
                >
                  {loadingId === wish.id
                    ? <span className="spinner" style={{ width: '14px', height: '14px', borderWidth: '2px' }} />
                    : wish.status === 'pending' ? '✅ 標記完成' : '↩ 重設待處理'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
