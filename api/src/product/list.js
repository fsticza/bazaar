const service = require('./service')
const Product = require('./model')

module.exports = async function create (ctx) {
  try {
    const products = await service.list({}, ctx.query)
    ctx.status = 200
    ctx.body = {
      products: products.map(product => {
        return new Product(product).toObject({ virtuals: true })
      })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
