// src/app/api/aset/put.js
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function PUT(req) {
  const body = await req.json();
  const updated = await prisma.aset.update({
    where: { id: body.id },
    data: body,
  });
  return NextResponse.json(updated);
}
