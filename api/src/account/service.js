const Account = require('./model')
const { hashPassword } = require('./utils')

exports.create = payload => {
  return Account.findOne({
    email: payload.email
  })
    .then(existingAccount => {
      if (existingAccount) {
        const err = new Error('Account already exists')
        err.code = 409
        throw err
      }
    })
    .then(() => {
      const { password } = payload
      payload.password = hashPassword(password)
      const account = new Account(payload)
      return account.save()
    })
}
exports.list = (params = {}, filter, fields = []) => {
  const limit = params.limit || 24
  const skip = params.skip || 0
  return Account.find(filter, fields.join(' '), {
    skip,
    limit })
}

exports.show = params => {
  if (params.id) {
    return Account.findById(params.id)
  }
  Account.findOne(params)
}

exports.destroy = id => {
  return Account.findOneAndRemove(id)
}

exports.update = (id, payload) => {
  return Account.update({ _id: id }, { $set: payload })
}
