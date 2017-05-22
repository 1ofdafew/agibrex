'use strict'

class TractoController {

  * account (request, response) {
    yield response.sendView('accounts/tabs', { type: 'tracto'})
  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/tracto', { type: 'tracto'})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/tracto', { type: 'ethereum'})
  }


}

module.exports = TractoController
