const service = require('./service')

module.exports = async function destroy (ctx) {
  try {
    const { id } = ctx.params
    await service.destroy(id)
    ctx.status = 204
    ctx.body = {}
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
