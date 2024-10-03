import { PrismaClient } from "@prisma/client";

// create prisma client object once
const prisma = new PrismaClient();

export function getPrisma() {
  return prisma;
}
