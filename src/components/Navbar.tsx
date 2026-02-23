'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w300.org/2000/svg">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#paint0_linear)"/>
          <defs>
            <linearGradient id="paint0_linear" x1="12" y1="2" x2="12" y2="21.02" gradientUnits="userSpaceOnUse">
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
            <Link href="/wish" className="nav-item">Make a Wish ✨</Link>
            <Link href="/dashboard" className="nav-item">Dashboard</Link>
            {session.user?.role === 'admin' && (
              <Link href="/admin" className="nav-item text-gradient" style={{fontWeight: 700}}>Admin</Link>
            )}
            <button className="nav-btn" onClick={() => signOut()}>
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="nav-item">Login</Link>
            <Link href="/register" className="nav-btn">Start Free</Link>
          </>
        )}
      </div>
    </nav>
  );
}
