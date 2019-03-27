const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('File', new Schema({
  lastModifiedDate: {
    type: Date,
    default: new Date().toISOString()
  },
  name: {
    type: String
  },
  size: {
    type: Number
  },
  type: {
    type: String
  },
  url: {
    type: String,
    required: true
  }
}, {
  collection: 'files',
  toObject: {
    transform: function (doc, ret) {
      delete ret._id
      ret.v = ret.__v
      delete ret.__v
    }
  }
}))
