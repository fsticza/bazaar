const test = require('ava')
const Account = require('./model')
const URI = require('urijs')
const _ = require('lodash')
require('urijs/src/URITemplate')
const utils = require('../../lib/utils')
const testUtils = utils.testing
const mock = require('./mock')
const service = require('./service')
const tokenService = require('../auth/token/service')
const { firstName, lastName, email, password } = mock[0]

testUtils.setup(test)

test.serial('account create should return 201', async t => {
  const spec = await utils.parseSpec()
  const res = await testUtils.createRequest()
    .post('/api' + spec.account.createAccount.path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      firstName,
      lastName,
      email,
      password
    })

  t.is(res.status, 201, 'status code is 201')
})

test.serial('account show should fail without token', async t => {
  const spec = await utils.parseSpec()
  const res = await testUtils.createRequest()
    .get('/api' + URI.expand(spec.account.showAccount.path, {id: 1}))
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  t.is(res.status, 401, 'throws 401')
})

test.serial('account show should return account with valid token', async t => {
  await Account.remove()
  const spec = await utils.parseSpec()
  const { id } = await service.create({ firstName, lastName, email, password })
  const { token } = await tokenService.create({ email, password })
  const res = await testUtils.createRequest()
    .get('/api' + URI.expand(spec.account.showAccount.path, { id }))
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  const { account } = res.body
  t.is(res.status, 200, 'status code is 200')
  t.is(_.isObject(account), true, 'account is an object')
  t.is(account.id, id, 'stores and returns the same account')
  t.is(account.password, undefined, 'no password field mapped on account')
})

test.serial('account list should fail without token', async t => {
  const res = await testUtils.createRequest()
    .get('/accounts')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  t.is(res.status, 401, 'throws 401')
})

test.serial('account list should return accounts', async t => {
  await Account.remove()
  await Promise.all(mock.map(mock => {
    return service.create(mock)
  }))
  const { token } = await tokenService.create({ email, password })
  const res = await testUtils.createRequest()
    .get('/accounts')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')

  const { accounts } = res.body
  t.is(res.status, 200, 'status code is 200')
  t.is(Array.isArray(accounts), true, 'accounts in response is an array')
  t.is(accounts[0].password, undefined, 'no password field mapped on account')
})
