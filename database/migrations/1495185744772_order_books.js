'use strict'

const Schema = use('Schema')

class OrderBooksTableSchema extends Schema {

  up () {
    this.create('order_books', (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('uuid',80).notNullable().unique()
      table.string('type')
      table.string('asset')
      table.double('amount')
      table.double('price')
      table.boolean('status').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('order_books')
  }

}

module.exports = OrderBooksTableSchema
