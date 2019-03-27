const test = require('ava')
const Product = require('./model')
const Account = require('../account/model')
const URI = require('urijs')
const _ = require('lodash')
require('urijs/src/URITemplate')
const utils = require('../../lib/utils')
const testUtils = utils.testing
const mock = require('./mock')
const accountMock = require('../account/mock')
const service = require('./service')
const accountService = require('../account/service')
const tokenService = require('../auth/token/service')
const { title, description, created, startsAt, endsAt, kind, limit, attendees } = mock[0]
const { firstName, lastName, email, password } = accountMock[0]

testUtils.setup(test)

test.serial('product create should return 401 without token', async t => {
  const spec = await utils.parseSpec()
  const res = await testUtils.createRequest()
    .post('/api' + spec.product.createProduct.path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      title,
      description,
      created,
      startsAt,
      endsAt,
      kind,
      limit,
      attendees
    })

  t.is(res.status, 401, 'status code is 401')
})

test.serial('product create should return 201 if token is valid', async t => {
  await Product.remove()
  const spec = await utils.parseSpec()
  await accountService.create({ firstName, lastName, email, password })
  const { token } = await tokenService.create({ email, password })
  const res = await testUtils.createRequest()
    .post('/api' + spec.product.createProduct.path)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      title,
      description,
      created,
      startsAt,
      endsAt,
      kind,
      limit,
      attendees
    })

  t.is(res.status, 201, 'status code is 201')
})

test.serial('product show should fail without token', async t => {
  const spec = await utils.parseSpec()
  const res = await testUtils.createRequest()
    .get('/api' + URI.expand(spec.product.showProduct.path, {id: 1, title: 'bla'}))
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  t.is(res.status, 401, 'throws 401')
})

test.serial('product show should return product if token is valid', async t => {
  await Account.remove()
  await Product.remove()
  const spec = await utils.parseSpec()
  const { id } = await service.create({
    title,
    description,
    created,
    startsAt,
    endsAt,
    kind,
    limit,
    attendees
  })
  await accountService.create({ firstName, lastName, email, password })
  const { token } = await tokenService.create({ email, password })
  const res = await testUtils.createRequest()
    .get('/api' + URI.expand(spec.product.showProduct.path, { id, title }))
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  const { product } = res.body
  t.is(res.status, 200, 'status code is 200')
  t.is(_.isObject(product), true, 'product is an object')
  t.is(product.id, id, 'stores and returns the same product')
})

test.serial('product list should fail without token', async t => {
  const spec = await utils.parseSpec()
  const res = await testUtils.createRequest()
    .get('/api' + spec.product.listProducts.path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  t.is(res.status, 401, 'throws 401')
})

test.serial('product list should return products', async t => {
  await Account.remove()
  await Product.remove()
  await Promise.all(mock.map(mock => {
    return service.create(mock)
  }))
  await accountService.create({ firstName, lastName, email, password })
  const { token } = await tokenService.create({ email, password })
  const spec = await utils.parseSpec()
  const res = await testUtils.createRequest()
    .get('/api' + spec.product.listProducts.path)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  const { products } = res.body
  t.is(res.status, 200, 'status code is 200')
  t.is(Array.isArray(products), true, 'products in response is an array')
})
