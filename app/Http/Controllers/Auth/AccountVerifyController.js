'use strict'

const UserService = make('App/Services/UserService')
const log = make('App/Services/LogService')

class AccountVerifyController {

  * index (request, response) {
    const token = request.input('token')

    if (token) {
      log.info('Verifying token', token)
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
    } else {
      yield response.sendView('auth.accountVerify')      
    }
  }

  * verify (request, response) {

    try {
      const token = request.input('token')
      console.log('Auth Token:', token)
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
    } catch (e) {
      const args = {
        error: 'Unable to activate your account. Invalid Verification Code'
      }
      yield request.with(args).flash()
      response.redirect('verify')
    }
  }

  * resend (request, response) {
    yield response.sendView('auth.resendConf')
  }

  * doResend (request, response) {
    const email = request.input('email')

    try {
      const user = yield UserService.findByOrFail('email', email)
      yield UserService.resendEmail(user)
      
      const args = {
        info: 'Confirmation email sent.',
        email: email
      }
      yield request.with(args).flash()
      response.redirect('verify')
    } catch(e) {
      const args = {
        info: 'Sorry, cannot find that user.'
      }
      yield response.sendView('auth.resendConf', args)      
    }

  }

}

module.exports = AccountVerifyController
