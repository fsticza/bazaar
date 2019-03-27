const service = require('./service')
const emailService = require('../email/service')
const Account = require('./model')

module.exports = async function create (ctx) {
  const { body } = ctx.request
  try {
    const account = await service.create(body)
    emailService.create({
      toAddresses: [body.email],
      subject: 'New Bazaar Registration',
      text: 'Registration',
      html: 'Registration'
    })
    ctx.status = 201
    ctx.body = {
      account: new Account(account).toObject({ virtuals: true })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
