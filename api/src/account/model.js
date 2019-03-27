const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hashPassword } = require('./utils')

const schema = new Schema({
  title: String,
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    index: true,
    lowercase: true,
    trim: true,
    select: false
  },
  password: {
    type: String,
    trim: true,
    select: false
  },
  avatarUrl: {
    type: String
  },
  roles: Array
}, {
  collection: 'accounts',
  toObject: {
    transform: function (doc, ret) {
      delete ret._id
      ret.v = ret.__v
      delete ret.__v
    }
  }
})

schema.methods = {
  isSamePassword (password) {
    return hashPassword(password, process.env.PW_SALT) === this.password
  }
}

schema.virtual('fullName').get(function () {
  return [this.title, this.firstName, this.lastName].join(' ')
})

module.exports = mongoose.model('Account', schema)
