'use strict'

const UserService = make('App/Services/UserService')
const Hash = use('Hash')
const log = make('App/Services/LogService')

class ForgotPasswordController {

  * index (request, response) {
    yield response.sendView('auth/forgotPassword')
  }

  * reset (request, response) {
    console.log('Resetting password')

    try {
      const email = request.input('email')
      const user = yield UserService.findByOrFail('email', email)
      yield UserService.resetPassword(user)
      yield request.with({ info: 'ok' }).flash()
      response.redirect('back')

    } catch(e) {
      yield request.with({ error: 'Invalid email address' }).flash()
      response.redirect('back')
    }
  }

  * prepareResetPassword (request, response) {
    try {
      console.log('prepareResetPassword....')

      const token = request.input('token')
      const user = yield UserService.findByOrFail('verification_code', token)
      yield response.sendView('auth.passwordReset', {user: user.toJSON()})

    } catch(e) {
      log.error(e)
      yield request.with({ error: 'Invalid verification token' }).flash()
      yield response.redirect('login')
    }
  }

  * doResetPassword (request, response) {
    try {
      const cred = request.only('password1', 'password2', '_code')
      console.log(cred)

      if (cred.password1 === cred.password2) {
        const user = yield UserService.findByOrFail('verification_code', cred._code)
        console.log('User: ', user.toJSON())

        // update password
        user.password = yield Hash.make(user.password)
        yield user.save()

        // login the user
        yield request.auth.login(user)

        // redirect to dashboard.
        response.redirect('/dashboard')
      } else {
        // throw passwords not the same
        yield request.with({error: 'Passwords are not the same'}).flash()
        response.redirect('back')
        
      }
      throw new Error('Passwords are not the same')
    } catch(e) {
      log.error(e)
      yield response.redirect('login')
    }
  }

}

module.exports = ForgotPasswordController
