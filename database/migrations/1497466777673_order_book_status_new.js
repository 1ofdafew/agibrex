'use strict'

const Schema = use('Schema')

class OrderBookStatusNewTableSchema extends Schema {

  up () {
    this.table('order_books', (table) => {
      table.enum('status', ['NEW', 'ACTIVE', 'CANCELLED', 'PENDING', 'CLOSED']).after('price').defaultTo('NEW').notNullable().alter()
      table.string('from_address', 120).after('asset')
      table.string('to_address', 120).after('to_asset')
    })
  }

  down () {
    this.table('order_books', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = OrderBookStatusNewTableSchema
