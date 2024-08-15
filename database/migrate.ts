import { sqlite } from 'db'
import { useFetch } from '@vueuse/core'

export type ProxyMigrator = (migrationQueries: string[]) => Promise<void>

export async function migrate() {
  const { data } = await useFetch('/migrations/meta/_journal.json').json()
  let migrations = data.value.entries.map((entry: any) => entry.tag)

  migrations = migrations.sort((a: string, b: string) => {
    const aHash = a.slice(0, 4)
    const bHash = b.slice(0, 4)

    if (aHash && bHash) {
      return aHash.localeCompare(bHash)
    }

    return 0
  })

  const migrationTableCreate = /* sql */ `
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash text NOT NULL UNIQUE,
      created_at numeric
    )
  `

  await sqlite.execute(migrationTableCreate, [])

  for (const hash of migrations) {
    const dbMigrations = (await sqlite.select(
      /* sql */ `SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC`,
    )) as unknown as { id: number, hash: string, created_at: number }[]

    const hasBeenRun = (hash: string) =>
      dbMigrations.find((dbMigration) => {
        return dbMigration?.hash === hash
      })

    if (hash && hasBeenRun(hash) === undefined) {
      const { data } = await useFetch(`/migrations/${hash}.sql`).text()

      if (data.value) {
        sqlite.execute(data.value, [])
        sqlite.execute(
        /* sql */ `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
          [hash, Date.now()],
        )
      }
    }
  }

  return Promise.resolve()
}
