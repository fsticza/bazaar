const Product = require('./model')
const { crudService } = require('../../lib/utils')

Object.assign(exports, crudService(Product))
