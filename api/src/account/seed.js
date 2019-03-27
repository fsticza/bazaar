const accountService = require('./service')

module.exports = () => {
  console.log('create admin')
  return accountService.create({
    firstName: 'Admin',
    lastName: 'Bazaar',
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PW,
    roles: ['USER', 'ADMIN']
  }).then(res => {
    console.log('response')
    console.log(res)
    return res
  })
}
