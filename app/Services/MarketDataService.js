'use strict'

const Exceptions = use('App/Exceptions')
const Event = use('Event')
const Hash = use('Hash')

const log = require('npmlog')
const axios = require('axios')
const co = require('co')

class MarketDataService {

	/**
	 * injecting required dependencies auto fulfilled
	 * by IoC container
	 *
	 * @return {Array}
	 */
	static get inject () {
		return ['App/Model/MarketData']
	}

	constructor (MarketData) {
		this.MarketData = MarketData
	}

	/**
	 *
	 *
	 * @public
	 */
	* poll () {
		client.on('buy', function (data){
			co(function * () {
				console.log('Got buy data', data)

				const md = new this.MarketData()
				md.type = 'USDT_BTC'
				md.volume = 'volume'
				md.price = data[i].data.rate
				md.exchange = 'poloniex'
				yield md.save()
			})
		})

		// const freshInstance = yield this.MarketData.find(user.id)
		// firing email event in a non-blocking fashion
		// Event.fire('user:registered', freshInstance)
		//
		// return freshInstance
	}

	* getBitcoinCurrentData () {
		return yield this.getCurrentData('BTC')
	}

	* getEthereumCurrentData () {
		return yield this.getCurrentData('ETH')
	}

	* getCurrentData (type) {
		const URL = `http://coinmarketcap.northpole.ro/api/v6/${type}.json`
		var mdata 
		yield axios.get(URL)
			.then(function (resp) {
				co(function * () {
					const data = {
						symbol: resp.data.symbol,
						price: resp.data.price.usd,
						change1h: resp.data.change1h,
						change24h: resp.data.change24h,
						volume24h: {
							usd: resp.data.volume24.usd,
							eur: resp.data.volume24.eur,
							btc: resp.data.volume24.btc
						}
					}
					mdata = data
				})
			})
		// log.info('BTC data:', mdata)
		return mdata
	}




}

module.exports = MarketDataService
