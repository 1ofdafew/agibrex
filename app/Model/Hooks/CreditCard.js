'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const CreditCard = exports = module.exports = {}

CreditCard.checkNumber = function * (next) {
  const re = /\d{16}/.exec(this.card_num)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid card number data')
  }
  yield next
}

CreditCard.checkCVV = function * (next) {
  const re = /\d{3}/.exec(this.cvv)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid CVV data')
  }
  yield next
}