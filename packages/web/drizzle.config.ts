import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

if (!process.env.DATABASE_URL)
  throw new Error('DATABASE_URL is not set')

export default defineConfig({
  dialect: 'sqlite',
  casing: 'snake_case',
  dbCredentials: { url: process.env.DATABASE_URL },
  schema: './src/lib/server/db/schema.ts',
  strict: true,
  verbose: false,
})
