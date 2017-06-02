'use strict'

const Schema = use('Schema')

class UpdateOrderbookTableSchema extends Schema {

  up () {

    this.table('order_books', (table) => {
      table.dropColumn('status')
    })

    this.table('order_books', (table) => {
      table.enum('status', ['ACTIVE', 'CANCELLED', 'PENDING', 'CLOSED']).after('price').defaultTo('ACTIVE').notNullable()
    })
  }

  down () {
    this.table('order_books', (table) => {
      table.dropColumn('status')
    })
  }

}

module.exports = UpdateOrderbookTableSchema
