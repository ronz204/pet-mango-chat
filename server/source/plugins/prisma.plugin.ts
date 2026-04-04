import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { Elysia } from "elysia";

const url = process.env.POSTGRES_URL ?? "";
const adapter = new PrismaPg({ connectionString: url });

export const PrismaPlugin = new Elysia({ name: "prisma" })
  .decorate("prisma", new PrismaClient({ adapter }));
