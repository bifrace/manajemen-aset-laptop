// src/app/api/aset/delete.js
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function DELETE(req) {
  const body = await req.json();
  const deleted = await prisma.aset.delete({
    where: { id: body.id },
  });
  return NextResponse.json(deleted);
}
