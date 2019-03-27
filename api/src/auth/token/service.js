const jwt = require('jsonwebtoken')
const Token = require('./model')
const config = require('./config')
const Account = require('../../account/model')
const expiresIn = config.tokenTTL

exports.create = payload => {
  const { email } = payload
  console.log(email)
  return Account.findOne({ email }).select('+password')
    .then(account => {
      if (!account || !account.isSamePassword(payload.password)) {
        const err = new Error('Unauthorized')
        err.code = 401
        throw err
      }
      const { id } = account
      const token = jwt.sign({ id, debug: process.env.NODE_ENV === 'development' }, process.env.JWT_SECRET, {
        expiresIn
      })
      const authToken = new Token({ token })
      // NOTE: account contains password at this point, DO NOT FORWARD IT
      return authToken.save()
    })
}
exports.destroy = id => {
  // TODO: make id optional
  return Token.findOneAndRemove(id)
}
exports.update = payload => {
}
