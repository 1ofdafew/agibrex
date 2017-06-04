'use strict'

const Schema = use('Schema')

class UpdateHistoricalDateSizeTableSchema extends Schema {

  up () {
    this.table('historical_prices', (table) => {
			table.string('date', 30).defaultTo('--').notNullable().alter()
    })
  }

  down () {
    this.table('historical_prices', (table) => {
    })
  }

}

module.exports = UpdateHistoricalDateSizeTableSchema
