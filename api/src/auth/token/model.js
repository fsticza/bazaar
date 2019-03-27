const mongoose = require('mongoose')
const Schema = mongoose.Schema
const config = require('./config')

module.exports = mongoose.model('Token', new Schema({
  createdAt: {
    type: Date,
    expires: config.tokenTTL,
    default: Date.now()
  },
  token: {
    type: String,
    index: true,
    required: true
  }
}, {
  collection: 'tokens',
  toObject: {
    transform: function (doc, ret) {
      delete ret._id
      ret.v = ret.__v
      delete ret.__v
    }
  }
}))
