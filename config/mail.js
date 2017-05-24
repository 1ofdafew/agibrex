'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Driver
  |--------------------------------------------------------------------------
  |
  | driver defines the default driver to be used for sending emails. Adonis
  | has support for 'mandrill', 'mailgun', 'smtp', 'ses' and 'log' driver.
  |
  */
  driver: Env.get('MAIL_DRIVER', 'smtp'),

  /*
  |--------------------------------------------------------------------------
  | SMTP
  |--------------------------------------------------------------------------
  |
  | Here we define configuration for sending emails via SMTP.
  |
  */
  smtp: {
    pool: true,
    port: Env.get('MAIL_PORT'),
    host: Env.get('MAIL_HOST'),
    secure: false,
    auth: {
      user: Env.get('MAIL_USERNAME'),
      pass: Env.get('MAIL_PASSWORD')
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10
  },

  /*
  |--------------------------------------------------------------------------
  | Log
  |--------------------------------------------------------------------------
  |
  | Log driver is mainly for testing your emails expectations. Emails are
  | written inside a log file, which can be used for inspection.
  |
  */
  log: {
    toPath: Helpers.storagePath('logs/mail.eml')
  }  
}
