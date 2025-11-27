import Elysia from 'elysia'
import itemsController from './controllers/items.controller'
import listsController from './controllers/lists.controller'

export default new Elysia({
  prefix: '/shopping',
  strictPath: false,
  aot: false,
})
  .get('/', () => 'shopping module')
  .use(listsController)
  .use(itemsController)
