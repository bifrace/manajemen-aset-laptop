import 'dotenv/config'; // untuk bisa baca .env saat pakai ts-node
import clientPromise from "../app/lib/mongodb";

async function testMongo() {
  try {
    const client = await clientPromise;
    const db = client.db("admin"); // bisa ganti ke nama database kamu
    const result = await db.command({ ping: 1 });
    console.log("✅ MongoDB connected:", result);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

testMongo();
