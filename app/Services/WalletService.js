'use strict'

const Exceptions = use('App/Exceptions')
const CoinFactory = use('App/Services/Coins/CoinFactory')

class WalletService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Wallet']
  }

  constructor (Wallet) {
    this.Wallet = Wallet
  }

  * create(type, user) {
    const factory = new 
  }

  * getWallet(username) {
    return yield this.Wallet.findByOrFail('username', username, function() {
      throw new Exceptions.ApplicationException(`Cannot find user wallet with ${field}`, 404)
    })
  }
}

module.exports = WalletService
