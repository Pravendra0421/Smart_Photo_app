import { PrismaClient } from "../generated/prisma/index.js";

// Create a singleton instance of PrismaClient for ES modules
let prisma: PrismaClient;

// Use a more ES module-friendly approach
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
  }
  prisma = globalForPrisma.prisma;
}

export default prisma;
