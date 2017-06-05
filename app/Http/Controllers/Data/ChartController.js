'use strict'

const Helpers = use('Helpers')
const storagePath = Helpers.storagePath()
const HPSvc = make('App/Services/HistoricalPriceService')
const log = require('npmlog')

class BitcoinController {

  * bitcoin (request, response) {
    const data = yield HPSvc.fetchBitcoinData()
    log.info('Returning JSONP data for Bitcoin...')
    response.jsonp(data)
  }

  * ethereum (request, response) {
    const data = yield HPSvc.fetchEthereumData()
    log.info('Returning JSONP data for Ethereum...')
    response.jsonp(data)
  }

  * apple (request, response) {
    const data = Helpers.publicPath('exchange/aapl.json')
    response.download(data)
  }
}

module.exports = BitcoinController
