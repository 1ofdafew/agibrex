'use strict'

const User = use('App/Model/User')
const Validator = use('App/Services/Validator')

const UserService = make('App/Services/UserService')

class AuthController {

   * index (request, response) {
      yield response.sendView('login')
    }

   * login(request, response) {
     console.log('Processing login')

     try {

         const credentials = request.only('email', 'password')
         yield Validator.validate(credentials, User.loginRules, User.loginMessages)

         const user = yield UserService.findViaCredentials(credentials.email, credentials.password)

         console.log(user)
         const loginToken = yield request.auth.attempt(
            credentials.email, credentials.password)

         console.log('Login is succesful')

         response.redirect('/account/btc')

     } catch (e) {
        console.log(e)
        const errMsg = 'Invalid username, or password'
        yield response.sendView('login', {error: errMsg})
     }

   }

   * logout(request, response) {
        yield request.auth.logout()

        response.redirect('/')
    }
}

module.exports = AuthController
