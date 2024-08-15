import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  schema: './database/schema.ts',
  out: './public/migrations',
  dbCredentials: {
    url: `${process.env.APPDATA}/com.organized.dev/sqlite.db`,
  },
  verbose: false,
  strict: true,
})
