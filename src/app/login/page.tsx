'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    setLoading(false);

    if (res?.error) {
      alert('登入失敗，請確認信箱與密碼！');
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="flex justify-center items-center mt-12 animate-fade-up">
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2.5rem' }}>
        <h2 className="text-center text-gradient mb-8" style={{ fontSize: '2rem' }}>歡迎回來 ⚡</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
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
            {loading ? <span className="spinner" /> : '登入帳號'}
          </button>
        </form>

        <p className="text-center mt-6 text-secondary text-sm">
          還沒有帳號嗎？ <Link href="/register" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>立刻註冊</Link>
        </p>
      </div>
    </div>
  );
}
