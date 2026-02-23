'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MakeWish() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({ 
    purpose: '', 
    usage: '', 
    requirements: '', 
    email: '' 
  });
  
  const [loading, setLoading] = useState(false);

  if (status === 'loading') return <div className="flex justify-center mt-12"><div className="spinner"></div></div>;
  if (!session) {
    router.push('/login');
    return null;
  }

  if (!form.email && session.user?.email) {
    setForm(f => ({ ...f, email: session.user.email as string }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch('/api/wish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setLoading(false);

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('發生錯誤，許願失敗');
    }
  };

  return (
    <div className="flex justify-center mt-8 animate-fade-up">
      <div className="glass-card" style={{ width: '100%', maxWidth: '650px', padding: '3rem' }}>
        <div className="text-center mb-12">
          <div style={{fontSize: '3rem', marginBottom: '1rem'}}>✨</div>
          <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>許下你的願望</h2>
          <p className="text-secondary" style={{fontSize: '1.1rem', lineHeight: '1.6'}}>
            詳細描述您的系統需求，我們將在後台進行評估，<br/>
            並於一週內為您提供免費的模擬預覽網址。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="form-group">
            <label>聯絡信箱 (我們將發送預覽網址至此)</label>
            <input 
              type="email" 
              required 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>1. 系統目的</label>
            <input 
              placeholder="例如：想要一個幫公司員工紀錄每日工時的系統" 
              value={form.purpose} 
              required
              onChange={e => setForm({ ...form, purpose: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>2. 具體用途</label>
            <input 
              placeholder="例如：取代目前的紙本打卡，能自動計算員工月時數" 
              value={form.usage} 
              required
              onChange={e => setForm({ ...form, usage: e.target.value })} 
            />
          </div>

          <div className="form-group mb-8">
            <label>3. 詳細需求與功能期待</label>
            <textarea 
              placeholder="把您想得到的全部列出來... 越詳細越好！" 
              rows={6}
              value={form.requirements} 
              required
              onChange={e => setForm({ ...form, requirements: e.target.value })} 
              style={{ resize: 'vertical' }}
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{width: '100%', borderRadius: '12px'}} disabled={loading}>
            {loading ? <span className="spinner" /> : '送出您的願望 ✨'}
          </button>
        </form>
      </div>
    </div>
  );
}
