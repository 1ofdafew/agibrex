'use strict'

const Schema = use('Schema')

class OrderBookTableSchema extends Schema {

  up () {
    this.create('OrderBook', (table) => {
      table.increments()
      table.string('type')
      table.string('asset')
      table.double('amount')
      table.double('price')
      table.boolean('status')
      table.timestamps()
    })
  }

  down () {
    this.drop('OrderBook')
  }

}

module.exports = OrderBookTableSchema
