import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/app/models/Admin";
import { connectDB } from "@/app/lib/mongodb";
import { hashPassword } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return NextResponse.json({ success: false, message: "Admin already exists" });
  }

  const hashedPassword = await hashPassword(password);
  const newAdmin = new Admin({ email, password: hashedPassword });
  await newAdmin.save();

  return NextResponse.json({ success: true, message: "Admin registered" });
}
