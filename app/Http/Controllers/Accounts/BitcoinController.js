'use strict'

const CoinController = use('App/Http/Controllers/Accounts/CoinController')

class BitcoinController extends CoinController {

  constructor() {
    super('bitcoin')
  }

}

module.exports = BitcoinController
