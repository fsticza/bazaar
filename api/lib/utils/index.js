const crypto = require('crypto')
const { promisify } = require('util')
const randomBytesAsync = promisify(crypto.randomBytes)
const testing = require('./testing')
const crudService = require('./crud-service')

const spec = require('../../openapi.json')
const specParser = require('../spec-parser')

exports.genRandomString = length => {
  return randomBytesAsync(Math.ceil(length / 2))
    .then(bytes => bytes.toString('hex').slice(0, length))
}

exports.parseSpec = () => specParser(spec)

exports.testing = testing

exports.crudService = crudService
