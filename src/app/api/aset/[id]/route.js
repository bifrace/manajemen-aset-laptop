// src/app/api/aset/[id]/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(req, { params }) {
  try {
    const body = await req.json();
    const id = parseInt(params.id, 10);
    const updated = await prisma.aset.update({
      where: { id },
      data: {
        nama: body.nama,
        deskripsi: body.deskripsi,
        lokasi: body.lokasi,
        status: body.status,
      },
    });
    return NextResponse.json(updated);
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = parseInt(params.id, 10);
    await prisma.aset.delete({ where: { id } });
    return NextResponse.json({ message: "Aset dihapus" });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
