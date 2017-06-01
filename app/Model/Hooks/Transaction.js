'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const Transaction = exports = module.exports = {}

//check action
Transaction.checkAction = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.action)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Action data')
  }
  yield next
}

//check status
Transaction.checkStatus = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.status)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Status data')
  }
  yield next
}

//check account
Transaction.checkAcc = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.acc_type)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid Account Type data')
  }
  yield next
}