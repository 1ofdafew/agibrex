'use strict'

class TractoController {

  * account (request, response) {
    yield response.sendView('accounts/tracto', { type: 'tracto'})
  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/tracto', { type: 'tracto'})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/tracto', { type: 'ethereum'})
  }


}

module.exports = TractoController
