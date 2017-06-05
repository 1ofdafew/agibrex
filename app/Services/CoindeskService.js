'use strict'

const axios = require('axios')
const log = require('npmlog')
const moment = require('moment')
const co = require('co')

const Db = use('Database')
const HPService = make('App/Services/HistoricalPriceService')

class CoindeskService {

  * maybeFetchBitcoinData () {
    const count = yield HPService.countBitcoinData()
    log.info('BTC count:', count)

    if (count[0].id === 0) {
      log.error('No BTC data yet....')
      return yield this.fetchBitcoinData('all')
    } else {
      log.info('BTC data is already populated')
      return true
    }
  }

  * maybeFetchEthereumData () {
    log.info('Fetching Ethereum data...')
    const count = yield HPService.countEthereumData()
    log.info('ETH count:', count[0].id)
    if (count[0].id === 0) {
      log.error('No ETH data in the database yet...fetching')
      return yield this.fetchEthereumData('all')
    }
    return true
  }
  
  * fetchBitcoinData (which) {
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

  * fetchEthereumData (which) {
    log.info(`Fetching latest data from Etherchain`)
    const URL = 'https://etherchain.org/api/statistics/price'
    // set since when to pull the data from
    var start
    if (which === 'all') {
      start = '2015-08-30'
    } else {
      start = which
    }
    axios.get(URL)
      .then(function (resp) {
        const data = resp.data.data
        //log.info('eth data:', data)
        co(function * () {
          yield HPService.saveEthereumData(data)
        })
      })
  }

  * cronFetchBitcoinData() { 
    const last = Db.table('historical_prices')
      .where('symbol', 'BTC')
      .orderBy('created_at', 'desc')
      .limit(1)
  }
  
  * cronFetchEthereumData() { }

  * fetchData(type, URL) {
    log.info(`Fetching BTC data from ${URL}`)
    axios.get(URL)
      .then(function (resp) {
        const bpi = resp.data.bpi

        co(function * () {
          log.info('Saving BTC data...')
          yield HPService.saveBitcoinData(bpi)
        })
      })
    return true
  }

}

module.exports = CoindeskService

