'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');
const HistoricalPrice = use('App/Model/HistoricalPrice')
const log = require('npmlog')

class HistoricalPriceService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
   	return ['App/Model/HistoricalPrice']
  }

  /**
   * Constructor
   * @param {HistoricalPrice} - The HistoricalPrice model
   */
  constructor (HistoricalPrice) {
    this.HistoricalPrice = HistoricalPrice
  }

	* saveBitcoinData(date, price) {
		const hp = new HistoricalPrice()
		hp.date = date
		hp.price = price
		hp.type = 'BTC'

		yield hp.save()
	}

	* fetchBitcoinData () {
		log.info('Fething BTC data')
		return yield Database.table('historical_prices')
			.query().where('type', 'BTC')
			.orderBy('date', 'asc')
	}

	* saveEthereum(date, price) {
  }		

}
module.exports = HistoricalPriceService

