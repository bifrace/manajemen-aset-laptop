import { prisma } from "@/app/lib/prisma";

export async function PUT(req, { params }) {
  const body = await req.json();
  const data = await prisma.aset.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return Response.json(data);
}

export async function DELETE(req, { params }) {
  await prisma.aset.delete({ where: { id: Number(params.id) } });
  return Response.json({ message: "Aset deleted" });
}
