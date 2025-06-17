import { NextResponse } from "next/server";
import prisma from "@/generated/prisma";

export async function PUT(req, { params }) {
  const id = parseInt(params.id);
  const body = await req.json();
  const data = await prisma.penyewa.update({
    where: { id },
    data: {
      nama: body.nama,
      kontak: body.kontak,
      identitas: body.identitas,
    },
  });
  return NextResponse.json(data);
}

export async function DELETE(req, { params }) {
  const id = parseInt(params.id);
  try {
    await prisma.penyewa.delete({ where: { id } });
    return NextResponse.json({ message: "Penyewa dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus penyewa" }, { status: 400 });
  }
}
