'use strict'

const UserService = make('App/Services/UserService')
const log = use('npmlog')

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
      yield request.with({error: 'Unable to activate your account. Invalid Verification Code'}).flash()
      response.redirect('verify')
    }
  }

  * resend (request, response) {
    yield response.sendView('auth.resendConf')
  }

  * doResend (request, response) {
    const email = request.input('email')

    try {
      const resp = yield UserService.findByOrFail('email', email)
      const user = resp.toJSON()
      const args = {
        info: 'Confirmation email sent.',
        email: email
      }
      yield response.sendView('auth.resendConf', args)      
    } catch(e) {
      const args = {
        info: 'Sorry, cannot find that user.'
      }
      yield response.sendView('auth.resendConf', args)      
    }

  }

}

module.exports = AccountVerifyController
