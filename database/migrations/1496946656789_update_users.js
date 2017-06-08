'use strict'

const Schema = use('Schema')

class UpdateUsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.string('tvn_id',30).after('id')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('tvn_id')
    })
  }

}

module.exports = UpdateUsersTableSchema
