'use strict'

class AccountController {

  * index (request, response) {
    const user = yield request.auth.getUser()
    if (user) {
      yield response.sendView('accounts/index')
    }
    response.redirect('/auth/login')
  }
}

module.exports = AccountController
