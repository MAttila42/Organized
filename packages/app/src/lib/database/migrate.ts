import { useDatabase } from '.'

export type ProxyMigrator = (migrationQueries: string[]) => Promise<void>

type FetchType = typeof window.fetch

export async function migrate(fetch: FetchType) {
  const res = await fetch('/migrations/meta/_journal.json')
  const data = await res.json()
  let migrations = data.entries.map((entry: any) => entry.tag)

  migrations = migrations.sort((a: string, b: string) => {
    const aHash = a.slice(0, 4)
    const bHash = b.slice(0, 4)

    if (aHash && bHash)
      return aHash.localeCompare(bHash)

    return 0
  })

  const migrationTableCreate = /* sql */ `
    CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash text NOT NULL UNIQUE,
      created_at numeric
    )
  `

  const { sqlite } = await useDatabase()
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
      const res = await fetch(`/migrations/${hash}.sql`)
      const data = await res.text()

      if (data) {
        sqlite.execute(data, [])
        sqlite.execute(
        /* sql */ `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
          [hash, Date.now()],
        )
      }
    }
  }

  return Promise.resolve()
}
