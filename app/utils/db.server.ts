import { remember } from '@epic-web/remember'
import { PrismaClient } from '@generated/prisma/client'
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3'

console.log(process.env.DATABASE_URL)

export const db = remember('db', () => {
  const adapter = new PrismaBetterSQLite3({
    url: `file:${process.env.DATABASE_PATH}`,
  })

  const client = new PrismaClient({
    adapter,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'warn' },
    ],
  })

  client.$on('query', (event) => {
    console.info(`prisma:query - ${event.duration}ms - ${event.query}`)
  })

  client.$connect()

  return client
})
