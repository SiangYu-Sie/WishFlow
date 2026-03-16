'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#star_grad)"/>
          <defs>
            <linearGradient id="star_grad" x1="12" y1="2" x2="12" y2="21.02" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6"/>
              <stop offset="1" stopColor="#3B82F6"/>
            </linearGradient>
          </defs>
        </svg>
        <span>WishFlow</span>
      </Link>

      <div className="nav-links">
        {session ? (
          <>
            <Link href="/wish" className={`nav-item${pathname === '/wish' ? ' nav-active' : ''}`}>
              ✨ 許願
            </Link>
            <Link href="/dashboard" className={`nav-item${pathname === '/dashboard' ? ' nav-active' : ''}`}>
              控制台
            </Link>
            {session.user?.role === 'admin' && (
              <Link
                href="/admin"
                className={`nav-item nav-admin${pathname.startsWith('/admin') ? ' nav-active' : ''}`}
              >
                🔑 後台管理
              </Link>
            )}
            <div className="nav-user">
              <span className="nav-user-name">{session.user?.name || session.user?.email}</span>
              <button className="nav-btn" onClick={() => signOut({ callbackUrl: '/' })}>
                登出
              </button>
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className={`nav-item${pathname === '/login' ? ' nav-active' : ''}`}>
              登入
            </Link>
            <Link href="/register" className="nav-btn-cta">
              免費註冊
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

