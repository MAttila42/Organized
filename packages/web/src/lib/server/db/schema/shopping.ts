import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const shoppingLists = sqliteTable('shopping_lists', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  accessToken: text().$defaultFn(() => crypto.randomUUID().replaceAll(/-/g, '')),
  ownerInstanceId: text().notNull(), // Instance token of the creator
  name: text().notNull(),
  description: text(),
  color: text(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$defaultFn(() => new Date().toISOString()),
})

export const shoppingItems = sqliteTable('shopping_items', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  listId: text().notNull().references(() => shoppingLists.id, { onDelete: 'cascade' }),
  name: text().notNull(),
  quantity: text(),
  unit: text(),
  description: text(),
  inCart: integer().notNull().default(0),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
  updatedAt: text().$defaultFn(() => new Date().toISOString()),
})

// Instances that have access to a list (via accepted invites)
export const shoppingListMembers = sqliteTable('shopping_list_members', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  listId: text().notNull().references(() => shoppingLists.id, { onDelete: 'cascade' }),
  instanceId: text().notNull(), // Instance token of the member
  joinedAt: text().$defaultFn(() => new Date().toISOString()),
})

/** Generate a short 8-character invite code */
function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 8; i++)
    code += chars[Math.floor(Math.random() * chars.length)]

  return code
}

export const shoppingListInvites = sqliteTable('shopping_list_invites', {
  id: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
  listId: text().notNull().references(() => shoppingLists.id, { onDelete: 'cascade' }),
  code: text().notNull().unique().$defaultFn(generateInviteCode),
  maxUses: integer(),
  usedCount: integer().notNull().default(0),
  expiresAt: text(),
  createdAt: text().$defaultFn(() => new Date().toISOString()),
})
