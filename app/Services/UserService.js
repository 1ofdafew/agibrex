'use strict'

const Exceptions = use('App/Exceptions')
const Event = use('Event')
const Hash = use('Hash')

class UserService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/User']
  }

  constructor (User) {
    this.User = User
  }

  /**
   * registers a new user with username, email address and password.
   *
   * @param  {String} username
   * @param  {String} email
   * @param  {String} password
   *
   * @return {Object}
   *
   * @throws {ApplicationException} If unable to create a new user
   *
   * @public
   */
  * register (username, email, password) {

    const user = new this.User()
    user.username = username
    user.email = email
    user.password = password
    yield user.save()

    if (user.isNew()) {
      throw new Exceptions.ApplicationException('Unable to create your account, please try after some time', 400)
    }
    const freshInstance = yield this.User.find(user.id)
    
    // firing email event in a non-blocking fashion
    Event.fire('user:registered', freshInstance)

    return freshInstance
  }

  /**
   * Reset user account
   * @param {string} email
   */
  * resetPassword (email) {

  }

  /**
   * finds a user with a given field and value.
   *
   * @param  {String} verificationCode
   *
   * @return {Object}
   *
   * @throws {ApplicationException} If unable to find user with verification code
   *
   * @public
   */
  * findByOrFail (field, value) {

    return yield this.User.findByOrFail(field, value, function () {
      throw new Exceptions.ApplicationException(`Cannot find user with ${field}`, 404)
    })
  }

  /**
   * finds a user using email and password
   *
   * @param  {String} email
   * @param  {String} password
   *
   * @throws {ApplicationException} If Unable to find user with email address
   * @throws {ApplicationException} If Cannot verify user password
   *
   * @return {Object}
   */
  * findViaCredentials (email, password) {

    const user = yield this.User.findByOrFail('email', email, function () {
      throw new Exceptions.ApplicationException('Unable to find any account with this email address', 400)
    })

    const isMatchedPassword = yield Hash.verify(password, user.password)

    if (!isMatchedPassword) {
      throw new Exceptions.ApplicationException('Password mismatched', 400)
    }
    return user
  }


}

module.exports = UserService
