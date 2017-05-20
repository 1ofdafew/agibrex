'use strict'

const Schema = use('Schema')

class UpdateUserTableTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.enum('status', ['pending-verification', 'active', 'disabled']).defaultTo('pending-verification')
      table.string('verification_code', 40).after('status')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('status')
      table.dropColumn('verification_code')
    })
  }

}

module.exports = UpdateUserTableTableSchema
