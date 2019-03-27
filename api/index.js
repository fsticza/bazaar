require('dotenv').config()

const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-body')
const json = require('koa-json')
const helmet = require('koa-helmet')
const cors = require('@koa/cors')

const router = require('./router')
const db = require('./db')
const seed = require('./seed')
const app = new Koa()
const PORT = process.env.PORT || 3001

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

app.use((ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      }
    } else {
      throw err
    }
  })
})

app.use(helmet())

app.use(logger())

app.use(json())

app.use(cors())

app.use(bodyParser({
  multipart: true
}))

app.use(router.routes())

app.use(router.allowedMethods())

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

if (!module.parent) {
  db.connect()
    .then(() => {
      console.log('Connectedd to DB')
      return seed()
    })
    .catch(err => {
      console.error('Failed to connect to DB')
      console.error(err)
      process.exit(1)
    })

  app.listen(PORT, () => console.log(`Listening on ${PORT}`))
}

module.exports = app
