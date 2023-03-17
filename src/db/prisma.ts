import { PrismaClient } from '@prisma/client'
import { env } from '@/env'

export const prisma = new PrismaClient({
  // config para habilitar logs no console apenas no ambiente de dev
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
