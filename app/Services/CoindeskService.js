'use strict'

const axios = require('axios')
const log = require('npmlog')
const moment = require('moment')
const co = require('co')

const HPService = make('App/Services/HistoricalPriceService')

class CoindeskService {

  * fetchBTCLatest () {
		const data = HPService.fetchBitcoinData()
		log.info('Data:', data)
		if (Object.keys(data).length === 0) {
			log.error('No BTC data yet....')
			return true //yield this.fetchBTCData()
		} else {
		  log.info('len of BTC data:', data)
			return true
		}
  }

	* fetchBTCData () {
    log.info(`Fetching latest data from Coindesk`)

    const URL = 'http://api.coindesk.com/v1/bpi/historical/close.json'
    const start = '2010-07-18'
    const end = moment().format('YYYY-MM-DD') 

		axios.get(`${URL}?start=${start}&end=${end}`) 
			.then(function (resp) {
				const bpi = resp.data.bpi

				co(function * () {
					for (const key in bpi) {
						log.info('bpi:', key, bpi[key])
						yield HPService.saveBitcoinData(key, bpi[key])
					}
				})
			})
		return true
  }

  * processData(date, price) {
    log.info('Saving data - ${date}, ${price}')
    yield HPService.saveBitcoinData(date, price)
  }

}

module.exports = CoindeskService

