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

  // 防止管理員自己降權
  if (session.user.id === params.id) {
    return NextResponse.json({ error: '無法修改自己的權限' }, { status: 400 });
  }

  const { role } = await req.json();

  if (!['admin', 'user'].includes(role)) {
    return NextResponse.json({ error: '無效角色' }, { status: 400 });
  }

  const user = await prisma.user.update({
    where: { id: params.id },
    data: { role },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json({ success: true, user });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    return NextResponse.json({ error: '無權限' }, { status: 401 });
  }

  if (session.user.id === params.id) {
    return NextResponse.json({ error: '無法刪除自己的帳號' }, { status: 400 });
  }

  await prisma.user.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
