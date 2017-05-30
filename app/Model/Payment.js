'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Payment extends Lucid {

	static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Payment.checkTransId')
    this.addHook('beforeCreate', 'Payment.checkAmount')
    this.addHook('beforeCreate', 'Payment.checkType')
  } 

  static get visible(){
    return ['id', 'uuid', 'trans_id', 'amount', 'type']
  }

  // user () {
  //   return this.belongsTo('App/Model/User')
  // }
}

module.exports = Payment
