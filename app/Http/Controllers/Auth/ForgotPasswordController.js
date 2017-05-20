'use strict'

const UserService = make('App/Services/UserService')

class ForgotPasswordController {

  * index (request, response) {
    yield response.sendView('auth/forgotPassword')
  }

  * reset (request, response) {
    console.log('Resetting password')

    try {
      const email = request.input('email')
      yield UserService.resetPassword(email)

      yield request.with({ info: 'ok' }).flash()
      response.redirect('back')

    } catch(e) {
      yield request.with({ error: 'Invalid email address' }).flash()
      response.redirect('back')
    }

  }
}

module.exports = ForgotPasswordController
