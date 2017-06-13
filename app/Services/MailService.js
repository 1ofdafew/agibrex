'use strict'

const Mail = use('Mail')
const Env = use('Env')
const log = make('App/Services/LogService')

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

  const mode = Env.get('NODE_ENV')
  if (mode === 'production') {
    log.info(`MailService: sending verification email for ${user.email}`)
    return yield Mail.send('emails.userVerification', user.toJSON(), (message) => {
      message.to(user.email, user.name)
      message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
      message.subject('Verify Gibrex Account Email Address')
    })    
  }
}

MailService.sendResetPasswordEmail = function * (user) {
  if (!user || typeof (user.toJSON) !== 'function') {
    throw new Error('Mailer expects a valid instance of User Model.')
  }

  const mode = Env.get('NODE_ENV')
  if (mode === 'production') {
    log.info(`MailService: sending reset password for ${user.email}`)
    return yield Mail.send('emails.resetPassword', user.toJSON(), (message) => {
      message.to(user.email, user.name)
      message.from(Env.get('MAIL_FROM_EMAIL'), Env.get('MAIL_FROM_NAME'))
      message.subject('Reset Gibrex Account')
    })
  }
}
