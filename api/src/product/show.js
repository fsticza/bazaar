const service = require('./service')
const Product = require('./model')

module.exports = async function create (ctx) {
  const { query, params } = ctx
  try {
    const product = await service.show(Object.assign({}, query, params))
    ctx.status = 200
    ctx.body = {
      product: new Product(product).toObject({ virtuals: true })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
