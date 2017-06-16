'use strict'

const uuid = require('uuid/v4');
const OrderBook = exports = module.exports = {}

OrderBook.createUUID = function * (next) {
  this.uuid = uuid()
  yield next
}

OrderBook.checkFromAddress = function *(next) {
  if (this.from_address === '') {
    throw new Error('Empty from address')
  }
  yield next
}

OrderBook.checkToAddress = function *(next) {
  if (this.to_address === '') {
    throw new Error('Empty destination address')
  }
  yield next
}
