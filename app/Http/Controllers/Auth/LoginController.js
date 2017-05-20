'use strict'

const User = use('App/Model/User')
const Validator = use('App/Services/Validator')

const UserService = make('App/Services/UserService')

const debug = require('debug')('gibrex')
const log = require('npmlog')

class LoginController {

  * index (request, response) {
    yield response.sendView('auth/login')
  }

  * login (request, response) {
    debug('Processing login')

    try {

      const credentials = request.only('email', 'password')
      yield Validator.validate(credentials, User.loginRules, User.loginMessages)
      log.info('gibrex:login Logging user ', credentials.email)

      const user = yield UserService.findViaCredentials(credentials.email, credentials.password)

      debug('User: ', user)
      const loginToken = yield request.auth.attempt(credentials.email, credentials.password)

      log.info('gibrex:login Login is succesful')
      response.redirect('/dashboard')

    } catch (e) {

      debug(e)
      const errMsg = 'Invalid username, or password'

      log.error('gibrex:login Logging user failed.', errMsg)
      debug('Sending error message: ', errMsg)

      yield request.with({ error: errMsg }).flash()
      response.redirect('back')
    }

  }

  * logout (request, response) {

    yield request.auth.logout()
    response.redirect('/')
  }
}

module.exports = LoginController
