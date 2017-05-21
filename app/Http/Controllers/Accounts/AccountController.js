'use strict'

class AccountController {

  * index (request, response) {
    yield response.sendView('accounts/index')
  }

}

module.exports = AccountController
