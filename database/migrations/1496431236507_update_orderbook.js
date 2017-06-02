'use strict'

const Schema = use('Schema')

class UpdateOrderbookTableSchema extends Schema {

  up () {

    this.table('order_books', (table) => {
      table.double('balance').after('amount')
    })
  }

  down () {
    this.table('order_books', (table) => {
      table.dropColumn('balance')
    })
  }

}

module.exports = UpdateOrderbookTableSchema