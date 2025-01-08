import { PrismaClient } from '@prisma/client'

const prismaGlobal = global as unknown as { prisma: PrismaClient }

export const prisma =
  prismaGlobal.prisma ||
  new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    }
  })

if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma = prisma 