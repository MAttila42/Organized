import { env } from '$env/dynamic/private'
import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'

const isDev = env.NODE_ENV === 'development'

const client = createClient({
  url: isDev
    ? env.DATABASE_URL_LOCAL!
    : env.DATABASE_URL_REMOTE!,
  authToken: env.DATABASE_AUTH_TOKEN!,
})

export const db = drizzle(client)
