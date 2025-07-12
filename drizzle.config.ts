import process from 'node:process'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'sqlite',
  casing: 'snake_case',
  dbCredentials: {
    url: `file:${process.env.APPDATA}/app.organized/sqlite.db`,
  },
  out: './static/migrations',
  schema: './src/lib/database/schema',
  strict: true,
  verbose: false,
})
