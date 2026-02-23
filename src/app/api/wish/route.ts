import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendWishEmails } from '@/lib/email';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();
    const { purpose, usage, requirements, email } = body;

    if (!purpose || !usage || !requirements || !email) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const wish = await prisma.wish.create({
      data: {
        customerEmail: email,
        purpose,
        usage,
        requirements,
        userId: session?.user?.id || null, // Link to user if logged in
      },
    });

    try {
      await sendWishEmails(email, purpose, usage, requirements);
    } catch (e) {
      console.error('Failed to send email:', e);
    }

    return NextResponse.json({ success: true, wish });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const wishes = await prisma.wish.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json({ wishes });
}
