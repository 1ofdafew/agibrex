'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const Payment = exports = module.exports = {}

Payment.checkTransId= function * (next) {
  const re = /^\d+$/.exec(this.trans_id)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Transaction ID')
  }
  yield next
}

Payment.checkAmount = function * (next) {
  const re = /[-+]?[0-9]*\.?[0-9]*./.exec(this.amount)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Amount data')
  }
  yield next
}

Payment.checkType = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.type)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid type data')
  }
  yield next
}