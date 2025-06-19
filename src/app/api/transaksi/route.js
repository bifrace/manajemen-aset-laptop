import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma"; // ✅ BENAR


// Ambil semua transaksi
export async function GET() {
  const data = await prisma.transaksi.findMany({
    include: {
      aset: true,
      penyewa: true,
    },
    orderBy: { id: "desc" },
  });
  return NextResponse.json(data);
}

// Buat transaksi penyewaan baru
export async function POST(req) {
  const body = await req.json();
  try {
    const transaksi = await prisma.transaksi.create({
      data: {
        asetId: body.asetId,
        penyewaId: body.penyewaId,
        tanggalPinjam: new Date(),
        status: "disewa",
      },
    });

    // Update status aset menjadi "disewa"
    await prisma.aset.update({
      where: { id: body.asetId },
      data: { status: "disewa" },
    });

    return NextResponse.json(transaksi);
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat transaksi" }, { status: 400 });
  }
}
