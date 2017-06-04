'use strict'

const Helpers = use('Helpers')
const storagePath = Helpers.storagePath()
const HPSvc = make('App/Services/HistoricalPriceService')
const log = require('npmlog')

class BitcoinController {

  * bitcoin (request, response) {
    const data = Helpers.publicPath('exchange/bitcoin.json')
    response.download(data)

		// const data = yield HPSvc.fetchBitcoinData()
		// log.info('Returning JSONP data...')
		// response.jsonp(data)
  }

  * ethereum (request, response) {
    const data = Helpers.publicPath('exchange/ethereum.json')
    response.download(data)
  }

  * apple (request, response) {
    const data = Helpers.publicPath('exchange/aapl.json')
    response.download(data)
  }
}

module.exports = BitcoinController
