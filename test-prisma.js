import { PrismaClient } from './src/generated/prisma/index.js'

const prisma = new PrismaClient()

async function run() {
  const data = await prisma.transaksi.findMany()
  console.log(data)
}

run()
