'use strict'

const WalletService = make('App/Services/WalletService')

class EthController {

  * account (request, response) {
    const user = yield request.auth.getUser()
    const wallet = yield user.wallets().where('type', 'ETHEREUM').fetch()
    console.log('eth: wallets =>', wallet)

    yield response.sendView('accounts/ethereum')
  }

  * create(request, response) {
    yield WalletService.create('ethereum', request.auth.getUser())
    response.redirect('/accounts/ethereum')
  }

  * deposit(request, response) {
    yield response.sendView('accounts/deposit/ethereum')
  }

  * withdraw(request, response) {
    yield response.sendView('accounts/withdraw/ethereum')
  }

}

module.exports = EthController
