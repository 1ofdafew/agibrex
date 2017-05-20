'use strict'

const User = use('App/Model/User')
const Validator = use('App/Services/Validator')

const UserService = make('App/Services/UserService')

class RegisterController {

  /**
   * render the register page
   *
   * @param  {Object} request
   * @param  {Object} response
   */
  * index(request, response) {
    yield response.sendView('register')
  }

  /**
   * Registers a user by creating a new user and
   * sending them email verification email.
   *
   * @param  {Object} request
   * @param  {Object} response
   */
  * register (request, response) {

    const userDetails = request.only('username', 'email', 'password')
    yield Validator.validate(userDetails, User.newUserRules, User.newUserMessages)

    const user = yield UserService.register(
        userDetails.username, userDetails.email, userDetails.password)

    // response.ok({message: 'Account created successfully', status: 200, data: user})
    response.redirect('/login')
  }


  // * doRegister(request, response) {
  //   const user = new User()
  //   user.username = request.input('username')
  //   user.email = request.input('email')
  //   //   user.password = yield Hash.make(request.input('password'))
  //   user.password = request.input('password')

  //   yield user.save()

  //   var registerMessage = {
  //     success: 'Registration Successful! Now go ahead and login'
  //   }

  //   yield response.sendView('register', { registerMessage : registerMessage })
  // }
}

module.exports = RegisterController
