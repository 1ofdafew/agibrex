'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Transaction extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

	static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Transaction.checkAction')
    this.addHook('beforeCreate', 'Transaction.checkStatus')
    this.addHook('beforeCreate', 'Transaction.checkAcc')
  }

  static get visible(){
    return ['id', 'uuid', 'action', 'status', 'acc_type']
  }

}

module.exports = Transaction
