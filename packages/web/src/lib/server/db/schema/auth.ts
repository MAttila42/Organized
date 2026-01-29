import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const Users = sqliteTable('users', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text(),
  email: text().unique(),
  emailVerified: integer({ mode: 'boolean' }),
  image: text(),
  createdAt: integer({ mode: 'timestamp' }).$defaultFn(() => new Date()),
  updatedAt: integer({ mode: 'timestamp' }).$defaultFn(() => new Date()),
})

export type SelectUser = typeof Users.$inferSelect
export type InsertUser = typeof Users.$inferInsert

export const Accounts = sqliteTable(
  'accounts',
  {
    userId: text()
      .notNull()
      .references(() => Users.id, { onDelete: 'cascade' }),
    type: text().notNull(),
    provider: text().notNull(),
    providerAccountId: text().notNull(),
    refreshToken: text(),
    accessToken: text(),
    expiresAt: integer(),
    tokenType: text(),
    scope: text(),
    idToken: text(),
    sessionState: text(),
    createdAt: integer({ mode: 'timestamp' }).$defaultFn(() => new Date()),
  },
  account => [
    primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  ],
)

export type SelectAccount = typeof Accounts.$inferSelect
export type InsertAccount = typeof Accounts.$inferInsert
