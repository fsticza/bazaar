const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  coverUrl: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    enum: [
      'USD',
      'EUR',
      'HUF'
    ]
  }
}, {
  collection: 'products',
  toObject: {
    transform: function (doc, ret) {
      delete ret._id
      ret.v = ret.__v
      delete ret.__v
    }
  }
})

productSchema.index({
  title: 'text',
  description: 'text'
}, {
  weights: {
    title: 3,
    description: 2
  }
})

module.exports = mongoose.model('Product', productSchema)
