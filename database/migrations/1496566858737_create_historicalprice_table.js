'use strict'

const Schema = use('Schema')

class HistoricalPricesTableSchema extends Schema {

  up () {
    this.create('historical_prices', (table) => {
      table.increments()
			table.string('date', 14).defaultTo('--').notNullable()
			table.enum('type', ['ETH', 'BTC', 'TRC', 'NONE']).defaultTo('NONE').notNullable()
			table.float('price').defaultTo(0.0).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('historical_prices')
  }

}

module.exports = HistoricalPricesTableSchema
