import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();
export * from '@prisma/client';

prisma
  .$connect()
  .then(() => console.log('✅ Database connected'))
  .catch(() => console.log('❌ Error connecting database'));
