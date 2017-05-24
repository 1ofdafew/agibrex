'use strict'

const Mail = use('Mail')
const Env = use('Env')

const MailService = exports = module.exports = {}

/**
 * sends verification email to a given user by
 * using the default mail driver
 *
 * @param {Object} user
 *
 * @yield {Object}
 *
 * @public
 */
MailService.sendVerificationEmail = function * (user) {
  if (!user || typeof (user.toJSON) !== 'function') {
    throw new Error('Mailer expects a valid instance of User Model.')
  }
  return yield Mail.send('emails.user-verification', user.toJSON(), (message) => {
    message.to(user.email, user.name)
    message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
    message.subject('Verify Gibrex Account Email Address')
  })
}
