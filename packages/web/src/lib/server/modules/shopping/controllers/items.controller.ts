import { handleServiceError } from '$lib/server/utils/errors'
import { hasUpdatableField } from '$lib/server/utils/validation'
import Elysia from 'elysia'
import { ShoppingServiceError } from '../services/errors'
import { createItem, deleteItem, updateItem } from '../services/shopping-item.service'
import { withShoppingAccessToken } from '../utils/access-token'
import { itemIdParams, itemPayloadSchema, itemUpdateSchema } from './schemas'

const itemsController = withShoppingAccessToken(new Elysia({
  prefix: '/lists',
  strictPath: false,
  aot: false,
}))
  .post('/items', async ({ accessToken, body, set }) => {
    try {
      const item = await createItem(accessToken, body)
      return { item }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    body: itemPayloadSchema,
  })
  .patch('/items/:itemId', async ({ accessToken, params, body, set }) => {
    try {
      if (!hasUpdatableField(body))
        throw new ShoppingServiceError(400, 'Provide at least one field to update')

      const item = await updateItem(accessToken, params.itemId, body)
      return { item }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: itemIdParams,
    body: itemUpdateSchema,
  })
  .delete('/items/:itemId', async ({ accessToken, params, set }) => {
    try {
      await deleteItem(accessToken, params.itemId)
      return { success: true }
    }
    catch (error) {
      return handleServiceError(set, error)
    }
  }, {
    params: itemIdParams,
  })

export default itemsController
