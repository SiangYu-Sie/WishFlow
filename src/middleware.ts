import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SECRET = process.env.NEXTAUTH_SECRET || 'fallback_secret';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: SECRET,
  });

  const { pathname } = request.nextUrl;

  // 保護 /admin — 必須是 admin 角色
  if (pathname.startsWith('/admin')) {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 保護登入後才能進的頁面
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/wish')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // 使用 regex 確保 /admin、/dashboard、/wish 本身及其子路徑都被攔截
  matcher: [
    '/admin',
    '/admin/(.*)',
    '/dashboard',
    '/dashboard/(.*)',
    '/wish',
    '/wish/(.*)',
  ],
};
