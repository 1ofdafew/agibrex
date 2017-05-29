'use strict'

const Schema = use('Schema')

class UpdateOrderbookTableSchema extends Schema {

  up () {

    this.table('order_books', (table) => {
      table.dropColumn('asset')
      // table.dropColumn('to_asset')
      table.dropColumn('type')
    })

    this.table('order_books', (table) => {
        table.enum('asset', ['TRC', 'BTC', 'ETH', 'NONE']).after('uuid').defaultTo('NONE').notNullable()
        table.enum('to_asset',['TRC', 'BTC', 'ETH', 'NONE']).after('asset').defaultTo('NONE').notNullable()
        table.enum('type',['ASK', 'BID', 'NONE']).after('to_asset').defaultTo('NONE').notNullable()
    })
  }

  down () {
    this.table('order_books', (table) => {
      table.dropColumn('asset')
      table.dropColumn('type')
      table.dropColumn('to_asset')
    })
  }

}

module.exports = UpdateOrderbookTableSchema
