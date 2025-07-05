import type { PageLoad } from './$types'
import { useDatabase } from '$lib/database'

export const load: PageLoad = async () => {
  const { database } = await useDatabase()
  const records = await database.query.test.findMany()
  return {
    database,
    records,
  }
}
