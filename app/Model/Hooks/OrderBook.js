'use strict'

const uuid = require('uuid/v4');
const OrderBook = exports = module.exports = {}

OrderBook.createUUID = function * (next) {
  this.uuid = uuid()
  yield next
}
