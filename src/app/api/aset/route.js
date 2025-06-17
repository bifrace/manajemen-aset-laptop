import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const aset = await prisma.aset.findMany({
      include: { transaksi: true }
    });
    return NextResponse.json(aset);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Gagal mengambil data aset' }, { status: 500 });
  }
}
