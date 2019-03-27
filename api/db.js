const mongoose = require('mongoose')
mongoose.Promise = Promise
const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
  async connect () {
    const connection = await mongoose.connect(DATABASE_URL, {
      useNewUrlParser: true
    })
    return connection
  }
}
