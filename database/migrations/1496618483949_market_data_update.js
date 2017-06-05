'use strict'

const Schema = use('Schema')

class MarketDataUpdateTableSchema extends Schema {

	// this is how the data looks
	//   symbol: resp.data.symbol,
	//   price: resp.data.price.usd,
	//   change1h: resp.data.change1h,
	//   change24h: resp.data.change24h,
	//   volume24h: {
	//   	usd: resp.data.volume24.usd,
	//   	eur: resp.data.volume24.eur,
	//   	btc: resp.data.volume24.btc
	//   }
  up () {
    this.table('market_data', (table) => {
			table.dropColumn('uuid')
			table.dropColumn('type')
			table.dropColumn('volume')
			table.dropColumn('exchange')
			table.enum('symbol', ['BTC', 'ETH', 'LTC', 'TRC', 'NONE']).notNullable().defaultTo('NONE').after('id')
			table.float('price').defaultTo(0.0).notNullable().alter().after('symbol')
			table.float('change1h').defaultTo(0.0).after('price')
			table.float('change24h').defaultTo(0.0).after('change1h')
			table.float('vol24h_usd').defaultTo(0.0).after('change24h')
			table.float('vol24h_eur').defaultTo(0.0).after('vol24h_usd')
			table.float('vol24h_btc').defaultTo(0.0).after('vol24h_eur')
    })
  }

  down () {
    this.table('market_data', (table) => {
		  table.dropColumn('symbol')
    })
  }

}

module.exports = MarketDataUpdateTableSchema
