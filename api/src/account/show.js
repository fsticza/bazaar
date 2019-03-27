const service = require('./service')
const Account = require('./model')

module.exports = async function create (ctx) {
  const { query, params } = ctx
  try {
    const { id } = ctx.state.jwtData
    if (id && params.id === 'me') {
      params.id = id
    }
    const account = await service.show(Object.assign({}, query, params))
    ctx.status = 200
    ctx.body = {
      account: new Account(account).toObject({ virtuals: true })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
