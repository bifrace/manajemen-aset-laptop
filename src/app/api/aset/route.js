import { PrismaClient } from '@/generated/prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Ambil semua aset
export async function GET() {
  try {
    const aset = await prisma.aset.findMany({
      orderBy: { id: 'desc' }, // opsional: tampilkan data terbaru di atas
    });
    return NextResponse.json(aset);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: 'Gagal mengambil data aset' }, { status: 500 });
  }
}

// Tambah aset baru
export async function POST(req) {
  try {
    const body = await req.json();
    const { merek, serial, kondisi, status } = body;

    const newAset = await prisma.aset.create({
      data: { merek, serial, kondisi, status },
    });

    return NextResponse.json(newAset);
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json({ error: 'Gagal menambah data aset' }, { status: 500 });
  }
}
