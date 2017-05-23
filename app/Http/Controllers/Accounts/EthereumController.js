'use strict'

class EthereumController {

  * account (request, response) {
    const user = yield request.auth.getUser()
    const wallet = yield user.wallets().where('type', 'ETHEREUM').fetch()
    console.log('eth: wallets =>', wallet)

    yield response.sendView('accounts/index', {type: 'ethereum'})
  }

}

module.exports = EthereumController
