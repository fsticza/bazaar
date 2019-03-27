const users = require('./mock')

module.exports = async function update (ctx) {
  const user = ctx.request.body
  const id = ctx.params.id
  const index = users.findIndex(user => user.id === id)
  if (!index < 0) ctx.throw(404, 'invalid user id')
  users.splice(index, 1, user)
}
