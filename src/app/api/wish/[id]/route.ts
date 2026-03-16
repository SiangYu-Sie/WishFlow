import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 401 });
  }

  const { status } = await req.json();

  if (!['pending', 'done'].includes(status)) {
    return NextResponse.json({ error: '無效狀態' }, { status: 400 });
  }

  const wish = await prisma.wish.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json({ success: true, wish });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 401 });
  }

  await prisma.wish.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
