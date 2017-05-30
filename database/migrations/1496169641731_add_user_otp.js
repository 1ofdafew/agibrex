'use strict'

const Schema = use('Schema')

class AddUserOtpTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('otp_secret', 80).after('status')
      table.enum('otp_status', ['enabled', 'disabled']).defaultTo('disabled')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('otp_secret')
      table.dropColumn('otp_status')
    })
  }

}

module.exports = AddUserOtpTableSchema
