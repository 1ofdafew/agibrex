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

    // if user come from tvn
    const tvn_uuid = request.input('u')
    const from = request.input('f')

    // checking if uuid already register (if registered, redirect to login)
    // const checkUser = yield Database.select('tvn_id')
    //  .from('transactions')
    //  .where('id',data.tx_id)
    // if not register, check uuid is valid from tvn

    // response.send(from)
    yield response.sendView('auth.register')
  }

  /**
   * Registers a user by creating a new user and
   * sending them email verification email.
   *
   * @param  {Object} request
   * @param  {Object} response
   */
  * register (request, response) {

    const userDetails = request.only('code', 'username', 'email', 'password')
    if (userDetails.code === '') {
      const errMsg = 'Invalid invitation code.'
      yield request.with({ error: errMsg }).flash()
      response.redirect('back')
    } else {
      // fetch verification id by that code.
      try {
        yield UserService.findByOrFail('verification_code', userDetails.code)

        // try to register
        try {
          // above should fail for invalid code, and threw exception below
          yield Validator.validate(userDetails, User.newUserRules, User.newUserMessages)

          const user = yield UserService.register(
              userDetails.username, userDetails.email, userDetails.password)

          const data = {
            verifyMethod: 'email',
            email: user.email
          }
          yield request.with(data).flash()
          response.redirect('verify')
        } catch (e) {
          // log.error('Invalid data for registration: ', e.fields)
          console.log(e.fields)
          if (e.fields != undefined) {
            yield request.with({ error: e.fields[0].message }).flash()
          } else {
            yield request.with({ error: 'Unable to register you at the moment' }).flash()
          }
          response.redirect('register')
        }
      } catch (e) {
        const errMsg = 'Invalid invitation code.'
        yield request.with({ error: errMsg }).flash()
        response.redirect('back')
      }
    }
  }

  * resetPassword (request, response) {
    yield response.sendView('auth.passwordReset')
  }

  * doResetPassword (request, response) {
    response.redirect('login')
  }

}

module.exports = RegisterController

