require('dotenv').config()
const accountSeed = require('./src/account/seed')

module.exports = () => {
  return accountSeed()
    .then(() => {
      console.log('account seed done')
    })
    .catch(err => {
      if (err.code !== 409) {
        console.error(err)
      }
    })
}
