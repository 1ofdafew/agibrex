'use strict'

class BitcoinController {

  * account (request, response) {
    yield response.sendView('accounts/bitcoin', { type: 'bitcoin'})
  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/bitcoin', { type: 'bitcoin'})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/bitcoin', { type: 'bitcoin'})
  }

}

module.exports = BitcoinController
