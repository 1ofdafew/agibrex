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
		yield this._saveData('BTC', date, price)
	}

	* saveEthereumData(date, price) {
		yield this._saveData('ETH', date, price)
	}

	* fetchBitcoinData () {
		return yield this._fetchData('BTC')
	}

	* fetchEthereumData () {
		return yield this._fetchData('ETH')
	}

	* _fetchData (type) {
		log.info('Fething BTC data')
		return yield Database.table('historical_prices')
			.where('type', type)
			.orderBy('date', 'asc')
	}

	* _saveData(type, date, price) {
		const hp = new HistoricalPrice()
		hp.date = date
		hp.price = price
		hp.type = type

		yield hp.save()
  }		

}
module.exports = HistoricalPriceService

