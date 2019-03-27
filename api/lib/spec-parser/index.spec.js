const test = require('ava')
const spec = require('./mock')
const specParser = require('../spec-parser')

test.beforeEach(async t => {
  t.context.spec = await specParser(spec)
})

test('Original spec has paths assigned', t => {
  t.is(typeof spec.paths, 'object')
})

test('Parsed result is an object', t => {
  t.is(typeof spec, 'object')
})

test('auth.signIn can be called without auth header', t => {
  const {
    spec
  } = t.context
  const signIn = spec.auth.signIn
  t.is(signIn.security.length === 0, true)
})
test('auth.signIn requires email', t => {
  const {
    spec
  } = t.context
  const signIn = spec.auth.signIn
  const signInSchema = signIn.requestBody.content['application/json'].schema
  t.is(signInSchema.required.includes('email'), true)
})
test('auth.signIn requires password', t => {
  const {
    spec
  } = t.context
  const signIn = spec.auth.signIn
  const signInSchema = signIn.requestBody.content['application/json'].schema
  t.is(signInSchema.required.includes('password'), true)
})
