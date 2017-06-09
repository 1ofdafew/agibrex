'use strict'

const User = use('App/Model/User')
const Validator = use('App/Services/Validator')
const UserService = make('App/Services/UserService')
const Database = use('Database')
const log = use('npmlog')
const axios = require('axios')
const co = require('co')

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
    const checkUser = yield Database.count('id as total')
      .from('users')
      .where('tvn_id',tvn_uuid)
      .where('tvn_user','YES')

    // response.send(checkUser[0].total)
    if (tvn_uuid) {

        // if not register, check uuid is valid from tvn

        if (checkUser[0].total >= 1) {
          response.redirect('login')
        } else {

            const URL = `http://tractotvn.dev/verify-user/${tvn_uuid}`
            var code, username, email, args
            yield axios.get(URL)
              .then(function (resp) {
                co(function * () {

                  if (resp.data.t == 1) {
                     args = {
                         code: resp.data.code,
                         username: resp.data.username,
                         email: resp.data.email,
                         t: resp.data.t
                     }
                  } else {
                     response.redirect('login')
                  }

                })
            })
        }
    }

    yield response.sendView('auth.register',{ args : args })
  }

  /**
   * Registers a user by creating a new user and
   * sending them email verification email.
   *
   * @param  {Object} request
   * @param  {Object} response
   */
  * register (request, response) {

    const userDetails = request.only('code', 'username', 'email', 'password','t')
    if (userDetails.code === '') {
      const errMsg = 'Invalid invitation code.'
      yield request.with({ error: errMsg }).flash()
      response.redirect('back')
    } else {
      // fetch verification id by that code.
      try {

        var tvn_id = ''
        var tvn_user = 'NO'
        if (userDetails.t != 1) {
          yield UserService.findByOrFail('verification_code', userDetails.code)
        } else {
          tvn_id = userDetails.code
          tvn_user = 'YES'
        }

        // try to register
        try {
          // above should fail for invalid code, and threw exception below
          yield Validator.validate(userDetails, User.newUserRules, User.newUserMessages)

          const user = yield UserService.register(
              userDetails.username, userDetails.email, userDetails.password, tvn_id, tvn_user)

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
