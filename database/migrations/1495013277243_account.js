'use strict'

const Schema = use('Schema')

class AccountTableSchema extends Schema {

  up () {
    this.create('Account', (table) => {
      table.increments()
      table.string('uuid')
      table.string('add')
      table.string('type')
      table.integer('balance')
      table.string('locked')
      table.string('available')
      table.timestamps()
    })
  }

  down () {
    this.drop('Account')
  }

}

module.exports = AccountTableSchema
