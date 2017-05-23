'use strict'

const CoinController = use('App/Http/Controllers/Accounts/CoinController')

class TractoController extends CoinController {

  constructor() {
    super('tracto')
  }

}

module.exports = TractoController

