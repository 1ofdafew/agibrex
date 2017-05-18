'use strict'

const Schema = use('Schema')

class OrderbookTableSchema extends Schema {

  up () {
    this.create('order_books', (table) => {
      table.increments('id')
      table.string('type')
      table.string('asset')
      table.double('amount')
      table.double('price')
      table.boolean('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_books')
  }

}

module.exports = OrderbookTableSchema