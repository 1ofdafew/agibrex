'use strict'

const log = use('npmlog')

const UserRegistered = exports = module.exports = {}

/**
 * process
 *
 * @param  {Object} User data
 */
UserRegistered.process = function (data) {
  // this.emitter gives access to the event instance
  log.info('User verification token: ', data.email, ' -> ', data.verification_code)

  // send Welcome email

  // Create the Accounts for Ether, Tracto, Bitcoin
}
