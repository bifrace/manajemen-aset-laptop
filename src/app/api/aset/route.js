import { NextResponse } from 'next/server';
import { prisma } from "@/app/lib/prisma";

export async function POST(req) {
  try {
    const body = await req.json();
    const aset = await prisma.aset.create({
      data: {
        nama: body.nama,
        lokasi: body.lokasi,
        deskripsi: body.deskripsi,
        status: body.status,
      },
    });
    return NextResponse.json(aset);
  } catch (error) {
    console.error("Gagal menambahkan aset:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
