import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req, context) {
  try {
    const { id } = context.params; // dapatkan id dari context
    const body = await req.json();

    const aset = await prisma.aset.update({
      where: { id: parseInt(id) },
      data: {
        merek: body.merek,
        serial: body.serial,
        kondisi: body.kondisi,
        status: body.status,
      },
    });

    return NextResponse.json(aset);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json({ error: "Gagal update aset" }, { status: 500 });
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = context.params;

    await prisma.aset.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Aset dihapus" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: "Gagal hapus aset" }, { status: 400 });
  }
}
