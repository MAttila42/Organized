import Elysia from 'elysia'

export default new Elysia({
  prefix: '/shopping',
  strictPath: false,
  aot: false,
})
  .get('/', () => 'shopping module')
