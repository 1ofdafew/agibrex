'use strict'

const Schema = use('Schema')

class MarketDataLenTableSchema extends Schema {

  up () {
    this.table('market_data', (table) => {
      // alter market_data table
      table.decimal('price', 16, 2).defaultTo(0.0).notNullable().alter().after('symbol').alter()
			table.decimal('change1h', 16, 2).defaultTo(0.0).after('price').alter()
			table.decimal('change24h', 16, 2).defaultTo(0.0).after('change1h').alter()
			table.decimal('vol24h_usd', 16, 2).defaultTo(0.0).after('change24h').alter()
			table.decimal('vol24h_eur', 16, 2).defaultTo(0.0).after('vol24h_usd').alter()
			table.decimal('vol24h_btc', 16, 2).defaultTo(0.0).after('vol24h_eur').alter()
    })
  }

  down () {
    this.table('market_data', (table) => {
      // opposite of up goes here
    })
  }

}

module.exports = MarketDataLenTableSchema
