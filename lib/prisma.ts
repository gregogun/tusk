import { PrismaClient } from '@prisma/client';

const prismaClientPropertyName = `__prevent-name-collision__prisma`;
type GlobalThisWithPrismaClient = typeof globalThis & {
  [prismaClientPropertyName]: PrismaClient;
};

const getPrismaClient = () => {
  if (process.env.NODE_ENV === `production`) {
    return new PrismaClient();
  }
  const newGlobalThis = globalThis as GlobalThisWithPrismaClient;
  if (!newGlobalThis[prismaClientPropertyName]) {
    newGlobalThis[prismaClientPropertyName] = new PrismaClient();
  }
  return newGlobalThis[prismaClientPropertyName];
};

export const prisma = getPrismaClient();
