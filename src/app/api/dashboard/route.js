import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [totalAset, asetTersedia, asetDisewa, asetRusak] = await Promise.all([
      prisma.aset.count(),
      prisma.aset.count({ where: { status: "tersedia" } }),
      prisma.aset.count({ where: { status: "disewa" } }),
      prisma.aset.count({ where: { status: "rusak" } }),
    ]);

    const totalPenyewa = await prisma.penyewa.count();
    const transaksiAktif = await prisma.transaksi.count({ where: { status: "disewa" } });
    const transaksiSelesai = await prisma.transaksi.count({ where: { status: "selesai" } });

    const logTerbaru = await prisma.transaksi.findMany({
      take: 5,
      orderBy: { tanggalPinjam: "desc" },
      include: {
        aset: true,
        penyewa: true,
      },
    });

    return NextResponse.json({
      statistik: {
        totalAset,
        asetTersedia,
        asetDisewa,
        asetRusak,
        totalPenyewa,
        transaksiAktif,
        transaksiSelesai,
      },
      logTerbaru,
    });
  } catch (err) {
    return NextResponse.json({ error: "Gagal ambil data dashboard" }, { status: 500 });
  }
}
