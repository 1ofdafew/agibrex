'use strict'

const Schema = use('Schema')

class MatchingsTableSchema extends Schema {

  up () {
    this.create('matchings', (table) => {
      table.increments()
      table.integer('ask_id').unsigned().references('id').inTable('order_books')
      table.integer('bid_id').unsigned().references('id').inTable('order_books')
      table.string('amount')      
      table.timestamps()
    })
  }

  down () {
    this.drop('matchings')
  }

}

module.exports = MatchingsTableSchema
