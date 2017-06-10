'use strict'

const Schema = use('Schema')

class HistoricalPricesRenDateTableSchema extends Schema {

  up () {
    this.table('historical_prices', (table) => {
      table.dropColumn('date')
      table.dateTime('time').after('id')
    })
  }

  down () {
    this.table('historical_prices', (table) => {
      table.dropColumn('date')
    })
  }

}

module.exports = HistoricalPricesRenDateTableSchema
