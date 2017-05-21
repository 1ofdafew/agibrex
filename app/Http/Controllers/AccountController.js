'use strict'

class AccountController {

  * index (request, response) {
    response.sendView('account/index')
  }

  * account_btc (request, response) {
    response.sendView('account/btc', { acc_type: 'Bitcoin'})
  }

  * account_tracto (request, response) {
    response.sendView('account/tracto', { acc_type: 'Tracto'})
  }

  * account_ethereum (request, response) {
    response.sendView('account/tracto', { acc_type: 'Ethereum'})
  }
}

module.exports = AccountController
