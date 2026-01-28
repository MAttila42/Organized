import Elysia from 'elysia'
import invitesController from './controllers/invites.controller'
import itemsController from './controllers/items.controller'
import listsController from './controllers/lists.controller'
import membersController from './controllers/members.controller'

export default new Elysia({
  prefix: '/shopping',
  strictPath: false,
  aot: false,
})
  .get('/', () => 'shopping module')
  .use(listsController)
  .use(itemsController)
  .use(invitesController)
  .use(membersController)
