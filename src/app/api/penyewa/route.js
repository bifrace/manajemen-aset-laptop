import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function GET() {
  const data = await prisma.penyewa.findMany({
    include: { transaksi: true },
  });
  return NextResponse.json(data);
}

export async function POST(req) {
  const body = await req.json();
  const data = await prisma.penyewa.create({
    data: {
      nama: body.nama,
      kontak: body.kontak,
      identitas: body.identitas,
    },
  });
  return NextResponse.json(data);
}
