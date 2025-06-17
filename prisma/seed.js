import prisma from "../src/lib/prisma.js";
import bcrypt from "bcrypt";

async function main() {
  const hashed = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashed,
    },
  });

  console.log("✅ Admin created: admin / admin123");
}

main().finally(() => prisma.$disconnect());
