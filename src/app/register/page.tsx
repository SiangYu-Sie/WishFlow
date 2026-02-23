'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    setLoading(false);
    
    if (res.ok) {
      alert('🌟 註冊成功！請登入');
      router.push('/login');
    } else {
      const { error } = await res.json();
      alert(`註冊失敗：${error}`);
    }
  };

  return (
    <div className="flex justify-center items-center mt-12 animate-fade-up">
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem' }}>
        <h2 className="text-center text-gradient mb-8" style={{ fontSize: '2rem' }}>免費註冊 🚀</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="form-group">
            <label>如何稱呼您</label>
            <input 
              placeholder="例：工程師小明" 
              value={form.name} 
              required
              onChange={e => setForm({ ...form, name: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>聯絡信箱</label>
            <input 
              type="email" 
              required 
              placeholder="name@example.com" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
            />
          </div>

          <div className="form-group mb-8">
            <label>密碼</label>
            <input 
              type="password" 
              required 
              placeholder="********" 
              value={form.password} 
              onChange={e => setForm({ ...form, password: e.target.value })} 
            />
          </div>
          
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? <span className="spinner" /> : '立即建立帳號'}
          </button>
        </form>

        <p className="text-center mt-6 text-secondary text-sm">
          已有帳號嗎？ <Link href="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>前往登入</Link>
        </p>
      </div>
    </div>
  );
}
