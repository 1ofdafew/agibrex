'use strict'

const User = use('App/Model/User')
const Validator = use('App/Services/Validator')
const UserService = make('App/Services/UserService')

const log = use('npmlog')

class RegisterController {

  /**
   * render the register page
   *
   * @param  {Object} request
   * @param  {Object} response
   */
  * index(request, response) {
    yield response.sendView('auth/register')
  }

  /**
   * Registers a user by creating a new user and
   * sending them email verification email.
   *
   * @param  {Object} request
   * @param  {Object} response
   */
  * register (request, response) {

    try {
      const userDetails = request.only('username', 'email', 'password')
      yield Validator.validate(userDetails, User.newUserRules, User.newUserMessages)

      const user = yield UserService.register(
          userDetails.username, userDetails.email, userDetails.password)

      const data = {
        verifyMethod: 'email',
        email: user.email
      }
      yield request.with(data).flash()
      response.redirect('verify')

    } catch(e) {
      // log.error('Invalid data for registration: ', e.fields)
      console.log(e.fields)
      if (e.fields != undefined) {
        yield request.with({ error: e.fields[0].message }).flash()
      } else {
        yield request.with({ error: 'Unable to register you at the moment' }).flash()
      }
      response.redirect('register')
    }
  }

}

module.exports = RegisterController
