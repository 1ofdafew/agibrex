'use strict'

const Schema = use('Schema')

class AccountTableSchema extends Schema {

  up () {

    this.create('account', (table) => {
      table.increments()
      table.string('username', 80).notNullable().unique()
      table.string('wallet_id', 80).notNullable().unique()
      table.string('type', 20).notNullable().unique()
      table.timestamps()
    })
  }

  down () {
    this.table('account', (table) => {
      // opposite of up goes here
      this.drop('account')
    })
  }

}

module.exports = AccountTableSchema
