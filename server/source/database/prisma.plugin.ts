import { Elysia } from "elysia";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const name: string = "prisma.plugin";

const url = process.env.POSTGRES_URL ?? "";
const adapter = new PrismaPg({ connectionString: url });

export const PrismaPlugin = new Elysia({ name })
  .decorate("prisma", new PrismaClient({ adapter }));