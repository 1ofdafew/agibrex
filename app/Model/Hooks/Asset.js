'use strict'

const Hash = use('Hash')
const uuid = require('uuid/v4');
const Asset = exports = module.exports = {}


//check transaction ID
Asset.checkTransId = function * (next) {
  const re = /^\d+$/.exec(this.ast_trans_id)
 
 const inflect = require('inflect')
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid transaction id')
  }
  yield next
}

//check type
Asset.checkType = function * (next) {
  const re = /^[a-zA-Z]*$/.exec(this.type)
  console.log('re:', re)

  if (!re) {
    throw new Error('Invalid type')
  }
  yield next
}