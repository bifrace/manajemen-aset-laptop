// src/app/api/aset/route.js
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const data = await prisma.aset.findMany();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Gagal mengambil aset:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { nama, deskripsi, lokasi, status } = await req.json();
    const created = await prisma.aset.create({
      data: { nama, deskripsi, lokasi, status }
    });
    return NextResponse.json(created);
  } catch (error) {
    console.error("Gagal menambahkan aset:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
