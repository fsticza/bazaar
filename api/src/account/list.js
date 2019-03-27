const service = require('./service')
const Account = require('./model')

module.exports = async function create (ctx) {
  try {
    const accounts = await service.list({}, ctx.query)
    ctx.status = 200
    ctx.body = {
      accounts: accounts.map(account => {
        return new Account(account).toObject({ virtuals: true })
      })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
