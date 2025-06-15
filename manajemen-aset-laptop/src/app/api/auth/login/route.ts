import { NextRequest, NextResponse } from "next/server";
import { Admin } from "@/app/models/Admin";
import { connectDB } from "@/app/lib/mongodb";  
import { comparePasswords, createToken } from "@/app/lib/auth";

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ success: false, message: "Admin not found" });
  }

  const isMatch = await comparePasswords(password, admin.password);
  if (!isMatch) {
    return NextResponse.json({ success: false, message: "Incorrect password" });
  }

  const token = createToken({ id: admin._id, email: admin.email });
  return NextResponse.json({ success: true, token });
}
