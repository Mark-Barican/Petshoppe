import { PrismaClient } from "@prisma/client";
import { getDatabaseUrl } from "./env";

<<<<<<< HEAD
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
=======
const databaseUrl = getDatabaseUrl();

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const createClient = () =>
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
  new PrismaClient({
    datasources: { db: { url: databaseUrl ?? "" } },
    log: ["query", "error", "warn"],
  });

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
