'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class Transaction extends Lucid {

	static boot () {
    super.boot()
    this.addHook('beforeCreate', 'Transaction.checkAction')
    this.addHook('beforeCreate', 'Transaction.checkStatus')
    this.addHook('beforeCreate', 'Transaction.checkAcc')
  }

  static get visible(){
    return ['id', 'uuid', 'action', 'status','trace']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Transaction
