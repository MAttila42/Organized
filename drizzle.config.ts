import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/database/schema.ts',
  out: './static/migrations',
  dialect: 'sqlite',
  dbCredentials: {
    url: `file:${process.env.APPDATA}/com.organized.app/sqlite.db`,
  },
  verbose: false,
  strict: true,
})
