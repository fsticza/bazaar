const Router = require('koa-router')
const product = require('../src/product')
const account = require('../src/account')
const token = require('../src/auth/token')
const upload = require('../src/upload')
const jwt = require('../middlewares/jwt')

const router = new Router({
  prefix: '/api'
})

router
  .post('/auth/token', token.actions.create)
  .delete('/auth/token', jwt, token.actions.destroy)

router
  .get('/products', product.actions.list)
  .post('/products', jwt, product.actions.create)
  .get('/products/:title-:id', product.actions.show)
  .delete('/products/:id', jwt, product.actions.destroy) // FIXME: isAdmin

router
  .get('/accounts', jwt, account.actions.list)
  .post('/accounts', account.actions.create)
  .get('/accounts/:id', jwt, account.actions.show)
  .patch('/accounts/:id', jwt, account.actions.update)
  .delete('/accounts/:id', jwt, account.actions.destroy) // FIXME: isAdmin

router
  .post('/uploads', jwt, upload.actions.create)

module.exports = router
