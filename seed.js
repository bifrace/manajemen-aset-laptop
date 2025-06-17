import { PrismaClient } from './src/generated/prisma/index.js'; // ✅ Sesuaikan path client hasil generate
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.admin.create({
    data: {
      username: "admin",
      password: hashedPassword,
    },
  });

  console.log("✅ Admin created: admin / admin123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
