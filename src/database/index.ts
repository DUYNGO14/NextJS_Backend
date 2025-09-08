import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient({
  datasourceUrl:
    process.env.NODE_ENV === "production"
      ? process.env.PRISMA_ACCELERATE_URL
      : process.env.DATABASE_URL,
  log: ["info"],
});

const db =
  process.env.NODE_ENV === "production"
    ? prisma.$extends(withAccelerate())
    : prisma;

export default db as PrismaClient; 