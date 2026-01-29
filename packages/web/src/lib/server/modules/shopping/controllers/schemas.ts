import { t } from 'elysia'

export const listPayloadSchema = t.Object({
  name: t.String({ minLength: 1 }),
  description: t.Optional(t.String()),
  color: t.Optional(t.String()),
})

export const listUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  description: t.Optional(t.String()),
  color: t.Optional(t.String()),
})

export const listIdParams = t.Object({
  listId: t.String({ minLength: 1 }),
})

export const itemPayloadSchema = t.Object({
  name: t.String({ minLength: 1 }),
  quantity: t.Optional(t.String()),
  unit: t.Optional(t.String()),
  description: t.Optional(t.String()),
})

export const itemUpdateSchema = t.Object({
  name: t.Optional(t.String()),
  quantity: t.Optional(t.String()),
  unit: t.Optional(t.String()),
  description: t.Optional(t.String()),
  inCart: t.Optional(t.Number()),
})

export const itemIdParams = t.Object({
  itemId: t.String({ minLength: 1 }),
})
