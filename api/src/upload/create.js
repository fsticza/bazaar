const service = require('./service')
const File = require('./model')

module.exports = async function create (ctx) {
  try {
    const file = await service.create(ctx.request.files.coverSrc)
    ctx.status = 201
    ctx.body = {
      file: new File(file).toObject({ virtuals: true })
    }
  } catch (err) {
    ctx.throw(err.code, err.message)
  }
}
