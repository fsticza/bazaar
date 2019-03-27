const create = require('./create')
const list = require('./list')
const show = require('./show')
const update = require('./update')
const destroy = require('./destroy')

const actions = {
  create,
  list,
  show,
  update,
  destroy
}

module.exports = {
  actions
}
