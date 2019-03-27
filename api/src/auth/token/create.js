const service = require('./service')
const Token = require('./model')

module.exports = async function create (ctx) {
  const { body } = ctx.request
  try {
    const token = await service.create(body)
    ctx.status = 201
    ctx.body = {
      token: new Token(token).toObject({ virtuals: true })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
