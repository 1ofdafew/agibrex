'use strict'

const log = make('App/Services/LogService')

const MailService = use('App/Services/MailService')
const UserRegistered = exports = module.exports = {}

/**
 * process
 *
 * @param  {Object} User data
 */
UserRegistered.process = function * (user) {

  if (!user || typeof (user.toJSON) !== 'function') {
    throw new Error('Mailer expects a valid instance of User Model.')
  }
  
  // this.emitter gives access to the event instance
  log.info('User verification token: ', user.email, ' -> ', user.verification_code)

  // send Welcome email
  log.info(`Sending email to ${user.email}`)
  yield MailService.sendVerificationEmail(user)

  // Create the Accounts for Ether, Tracto, Bitcoin
}

UserRegistered.resendConfirmation = function * (user) {
  // send Welcome email
  log.info(`Sending email to ${user.email}`)
  yield MailService.sendVerificationEmail(user)
}

UserRegistered.sendResetPassword = function * (user) {
  log.info(`Sending email to ${user.email} to reset password`)
  yield MailService.sendResetPasswordEmail(user)
}
