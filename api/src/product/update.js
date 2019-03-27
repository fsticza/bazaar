const products = require('./mock')

module.exports = async function update (ctx) {
  const product = ctx.request.body
  const id = ctx.params.id
  const index = products.findIndex(product => product.id === id)
  if (!index < 0) ctx.throw(404, 'invalid product id')
  products.splice(index, 1, product)
}
