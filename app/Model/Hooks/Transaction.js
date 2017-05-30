'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const Transaction = exports = module.exports = {}

Transaction.checkAction = function * (next) {
  const re = /.*/.exec(this.action)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Action data')
  }
  yield next
}

Transaction.checkStatus = function * (next) {
  const re = /.*/.exec(this.status)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Status data')
  }
  yield next
}

Transaction.checkAcc = function * (next) {
  const re = /.*/.exec(this.acc_type)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Account Type data')
  }
  yield next
}