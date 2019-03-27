const test = require('ava')
const utils = require('../../../lib/utils')
const testUtils = utils.testing

const mockCredentials = require('../../account/mock')
const accountService = require('../../account/service')
const { firstName, lastName, email, password } = mockCredentials[1]

testUtils.setup(test)

test('token create should return 201 and a new token', async t => {
  const spec = await utils.parseSpec()
  await accountService.create({ firstName, lastName, email, password })
  const res = await testUtils.createRequest()
    .post('/api' + spec.auth.signIn.path)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send({
      email,
      password
    })

  t.is(res.status, 201, 'status code is 201')
  t.is(!!res.body.token, true, 'body contains a token field')
})
