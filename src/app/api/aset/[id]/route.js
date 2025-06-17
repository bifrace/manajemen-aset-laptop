import { NextResponse } from "next/server";
import prisma from "@/generated/prisma";

export async function PUT(req, { params }) {
  const body = await req.json();
  const id = parseInt(params.id);
  const aset = await prisma.aset.update({
    where: { id },
    data: {
      nama: body.nama,
      merek: body.merek,
      serial: body.serial,
      kondisi: body.kondisi,
      status: body.status,
    },
  });
  return NextResponse.json(aset);
}

export async function DELETE(req, { params }) {
  const id = parseInt(params.id);
  try {
    await prisma.aset.delete({ where: { id } });
    return NextResponse.json({ message: "Aset dihapus" });
  } catch (error) {
    return NextResponse.json({ error: "Gagal hapus aset" }, { status: 400 });
  }
}
