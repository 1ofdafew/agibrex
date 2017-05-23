'use strict'

const CoinController = use('App/Http/Controllers/Accounts/CoinController')

class EthereumController extends CoinController {

  constructor() {
    super('ethereum')
  }

}

module.exports = EthereumController

