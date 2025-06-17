import { NextResponse } from "next/server";
import prisma from "@/generated/prisma";

// Update transaksi saat pengembalian (status: selesai)
export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  try {
    const transaksi = await prisma.transaksi.update({
      where: { id },
      data: {
        status: "selesai",
        tanggalKembali: new Date(),
      },
      include: { aset: true },
    });

    // Update status aset jadi "tersedia" lagi
    await prisma.aset.update({
      where: { id: transaksi.asetId },
      data: { status: "tersedia" },
    });

    return NextResponse.json(transaksi);
  } catch (error) {
    return NextResponse.json({ error: "Gagal menyelesaikan transaksi" }, { status: 400 });
  }
}

// Hapus transaksi (opsional)
export async function DELETE(req, { params }) {
  const id = parseInt(params.id);
  try {
    await prisma.transaksi.delete({ where: { id } });
    return NextResponse.json({ message: "Transaksi dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus transaksi" }, { status: 400 });
  }
}
