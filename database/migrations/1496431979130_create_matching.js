'use strict'

const Schema = use('Schema')

class CreateMatchingTableSchema extends Schema {

  up () {
    this.create('matching', (table) => {
      table.increments()
      table.integer('ask_id').notNullable()
      table.integer('bid_id').notNullable()
      table.string('amount')
      table.timestamps()
    })
  }

  down () {
    this.drop('matching')
  }

}

module.exports = CreateMatchingTableSchema
