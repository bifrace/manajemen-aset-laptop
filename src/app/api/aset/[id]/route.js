import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(req, context) {
  try {
    const body = await req.json();
    const { id } = await context.params; // ⛏ fix: await context.params

    const updated = await prisma.aset.update({
      where: { id: parseInt(id, 10) },
      data: {
        nama: body.nama,
        deskripsi: body.deskripsi,
        lokasi: body.lokasi,
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Gagal update aset:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // ⛏ fix: await context.params

    await prisma.aset.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: "Aset dihapus" });
  } catch (error) {
    console.error("Gagal hapus aset:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
