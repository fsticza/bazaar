const service = require('./service')

module.exports = async function create (ctx) {
  const { body } = ctx.request
  try {
    // const { id } = ctx.state.jwtData
    const product = await service.create(body)
    ctx.status = 201
    ctx.body = {
      product
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
