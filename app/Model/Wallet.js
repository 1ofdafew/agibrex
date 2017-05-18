'use strict'

const Lucid = use('Lucid')

class Wallet extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

}

module.exports = Wallet
