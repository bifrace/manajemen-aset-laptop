import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export async function POST(req) {
  const { username, password } = await req.json();

  const admin = await prisma.admin.findUnique({ where: { username } });
  if (!admin) return NextResponse.json({ error: "User tidak ditemukan" }, { status: 401 });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return NextResponse.json({ error: "Password salah" }, { status: 401 });

  const token = jwt.sign({ id: admin.id, username: admin.username }, JWT_SECRET, {
    expiresIn: "1d",
  });

  const response = NextResponse.json({ message: "Login berhasil" });
  response.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
