'use strict'

const Lucid = use('Lucid')
const uuid = require('uuid/v4');

class CreditCard extends Lucid {

  static boot () {
    super.boot()
    this.addHook('beforeCreate', 'CreditCard.checkNumber')
    this.addHook('beforeCreate', 'CreditCard.checkCVV')
  }

  static get visible(){
    return ['id', 'uuid', 'name', 'card_num', 'cvv']
  }

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = CreditCard
