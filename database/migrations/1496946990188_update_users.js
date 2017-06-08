'use strict'

const Schema = use('Schema')

class UpdateUsersTableSchema extends Schema {

  up () {
    this.table('users', (table) => {
      table.enum('tvn_user', ['YES', 'NO']).after('tvn_id').defaultTo('NO').notNullable()
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('tvn_user')
    })
  }

}

module.exports = UpdateUsersTableSchema
