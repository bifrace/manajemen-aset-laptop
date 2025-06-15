import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(plain: string, hash: string) {
  return await bcrypt.compare(plain, hash);
}

export function createToken(payload: object) {
  return jwt.sign(payload, SECRET, { expiresIn: "1h" });
}
