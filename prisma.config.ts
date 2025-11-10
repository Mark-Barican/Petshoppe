import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma", // path to your Prisma schema
  migrations: {
    path: "./prisma/migrations", // where migration files will be stored
  },
  datasource: {
    url: process.env.DATABASE_URL!, // your PostgreSQL connection string
  },
});
