'use strict'

const Lucid = use('Lucid')

class Wallet extends Lucid {

  user () {
    return this.belongsTo('App/Model/User')
  }

  static get pinRules () {
    return {
      pin1: 'required',
      pin2: 'required'
    }
  }

  /**
   * login validation messages
   *
   * @return {Object}
   */
  static get walletMessages () {
    return {
      'pin1.required': 'PIN is required to create your account',
      'pin2.required': 'Confirmation PIN is required to create your account'
    }
  }
}

module.exports = Wallet
