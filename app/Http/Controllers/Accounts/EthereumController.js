'use strict'

class EthereumController {

  * account (request, response) {
    yield response.sendView('accounts/ethereum', { type: 'ethereum'})
  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/ethereum', { type: 'ethereum'})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/ethereum', { type: 'ethereum'})
  }

}

module.exports = EthereumController
