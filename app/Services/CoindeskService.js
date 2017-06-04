'use strict'

const axios = require('axios')
const log = require('npmlog')
const moment = require('moment')
const co = require('co')

const HPService = make('App/Services/HistoricalPriceService')

class CoindeskService {

  * maybeFetchBTCData () {
    const data = yield HPService.fetchBitcoinData()
		//log.info('Data:', JSON.stringify(data))

    if (JSON.stringify(data) === '{}') {
      log.error('No BTC data yet....')
      return yield this.fetchBTCData('all')
    } else {
      log.info('BTC data is already populated')
      return true
    }
  }

  * fetchBTCData (which) {
    log.info(`Fetching latest data from Coindesk`)

    const URL = 'http://api.coindesk.com/v1/bpi/historical/close.json'
    // set since when to pull the data from
		var start
    if (which === 'all') {
      start = '2010-07-18'
    } else {
      start = which
    }
    const end = moment().format('YYYY-MM-DD') 
    const Location = `${URL}?start=${start}&end=${end}`
		log.info('Location:', Location)

    return yield this.fetchData('BTC', Location)
  }

  * fetchData(type, URL) {
		log.info(`Fetching BTC data from ${URL}`)
    axios.get(URL)
      .then(function (resp) {
        const bpi = resp.data.bpi

        co(function * () {
					switch (type) {
						case 'BTC':
							log.info('Saving BTC data...')
							for (const key in bpi) {
								yield HPService.saveBitcoinData(key, bpi[key]) 
							}
							break;
						case 'ETH':
							log.info('Saving ETH data...')
							for (const key in bpi) {
								yield HPService.saveEthereumData(key, bpi[key]) 
							}
							break;
						default:
							log.error('Unknown coin type:', type)
							break;
					}
				})
      })
    return true
  }

}

module.exports = CoindeskService

