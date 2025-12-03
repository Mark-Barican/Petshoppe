import { PrismaClient } from "@prisma/client";
import { getDatabaseUrl } from "./env";

<<<<<<< HEAD
<<<<<<< HEAD
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
=======
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
const databaseUrl = getDatabaseUrl();

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

const createClient = () =>
<<<<<<< HEAD
>>>>>>> f4c0b518f790dd226d4a428698a44b109e98390f
=======
>>>>>>> d7e1328f736a776113c8a92ee9221726aeb22ee3
  new PrismaClient({
    datasources: { db: { url: databaseUrl ?? "" } },
    log: ["query", "error", "warn"],
  });

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
