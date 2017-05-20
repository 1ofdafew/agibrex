'use strict'

const UserService = make('App/Services/UserService')

class AccountVerifyController {

  * index (request, response) {
    yield response.sendView('auth/accountVerify')
  }

  * verify (request, response) {
    const token = request.input('token')
    const user = yield UserService.findByOrFail('verification_code', token)

    user.status = 'active'
    const updateUser = yield user.save()

    if (!updateUser) {
      yield request.with({error: 'Unable to activate your account. Invalid Verification Code'}).flash()
      response.redirect('verify')
    } else {
      yield request.with({info: 'Account activated. Please login'}).flash()
      response.redirect('login')
    }

  }

}

module.exports = AccountVerifyController
