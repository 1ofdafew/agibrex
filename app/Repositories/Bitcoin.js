'use strict'

const Coin = use('App/Repositories/Coin')

class Bitcoin extends Coin {

  constructor() {
    super()
  }

  * createWallet(username, pin) {
    console.log(`Creating Bitcoin wallet for ${username} with pin ${pin}`)
  }

}

module.exports = Bitcoin
