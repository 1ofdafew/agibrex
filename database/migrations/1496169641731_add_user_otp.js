'use strict'

const Schema = use('Schema')

class AddUserOtpTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('otp_secret', 80).after('status')
      table.enum('otp_status', ['enabled', 'disabled']).defaultTo('disabled').after('otp_secret')
      table.string('sms_token', 80).after('status').after('otp_status')
      table.enum('sms_status', ['enabled', 'disabled']).defaultTo('disabled').after('sms_token')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('otp_secret')
      table.dropColumn('otp_status')
      table.dropColumn('sms_token')
      table.dropColumn('sms_status')
    })
  }

}

module.exports = AddUserOtpTableSchema
