import Database from '@tauri-apps/plugin-sql'
import { drizzle } from 'drizzle-orm/sqlite-proxy'

export interface SelectQueryResult {
  [key: string]: any
}

let database: ReturnType<typeof drizzle>
let sqlite: Database

export async function useDatabase() {
  if (database)
    return { database, sqlite }

  sqlite = await Database.load('sqlite:sqlite.db')

  database = drizzle(
    async (sql, params, method) => {
      let rows: any = []
      let results = []

      if (isSelectQuery(sql)) {
        rows = await sqlite.select(sql, params).catch((e) => {
          console.error('SQL Error:', e)
          return []
        })
      }
      else {
        rows = await sqlite.execute(sql, params).catch((e) => {
          console.error('SQL Error:', e)
          return []
        })
        return { rows: [] }
      }

      rows = rows.map((row: any) => {
        return Object.values(row)
      })

      results = method === 'all' ? rows : rows[0]

      return { rows: results }
    },
    { logger: false, casing: 'snake_case' },
  )

  return { database, sqlite }
}

function isSelectQuery(sql: string): boolean {
  const selectRegex = /^\s*SELECT\b/i
  return selectRegex.test(sql)
}
