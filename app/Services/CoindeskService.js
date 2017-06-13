'use strict'

const axios = require('axios')
const log = make('App/Services/LogService')
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

  /**
   * Fetch historical data for Bitcoin.
   * This function is called by /bootstrap/redis.js
   */
  * cronFetchBitcoinData() {
    try {
      const last = yield this.cronFetchLastData('BTC')
      var which
      if (last === undefined) {
        which = '2010-07-18'
      } else {
        which = moment(last[0].date).format('YYYY-MM-DD')
      }
      yield this.fetchBitcoinData(which)
    } catch (e) {
      log.error('Unable to fetch Bitcoin data', e)
    }
  }

  /**
   * Fetch historical data for Ethereum
   * This function is called by /bootstrap/redis.js
   */
  * cronFetchEthereumData() {
    try {
      const last = yield this.cronFetchLastData('ETH')
      var which
      if (last === undefined) {
        which = '1970-01-01' //moment().format('YYYY-MM-DD')
      } else {
        which = moment(last[0].date)
      }
      yield this.fetchEthereumData(which)
    } catch (e) {
      log.error('Unable to fetch Ethereum data', e)
    }
  }
  
  
  * fetchBitcoinData (which) {
    log.info(`Fetching latest data from Coindesk`)

    const URL = 'http://api.coindesk.com/v1/bpi/historical/close.json'
    const end = moment().format('YYYY-MM-DD')
    const Location = `${URL}?start=${which}&end=${end}`
    return yield this.fetchData('BTC', Location, which)
  }

  * fetchEthereumData (which) {
    log.info(`Fetching latest data from Etherchain`)
    const URL = 'https://etherchain.org/api/statistics/price'
    axios.get(URL)
      .then(function (resp) {
        const data = resp.data.data
        //log.info('eth data:', data)
        co(function * () {
          yield HPService.saveEthereumData(data, which)
        })
      })
  }

  /**
   * fetch last saved data from database
   * @param type - string :: {'BTC', 'ETH', 'TRC'}
   * @return db records | null
   */
  * cronFetchLastData(type) {
    return yield this.cronFetchData(type)
  }

  /****************************************************************************
   * Private functions
   */

  * cronFetchData(type) { 
    log.info(`Fetching ${type} desc...`)
    const last = yield Db.table('historical_prices')
      .where('type', type)
      .orderBy('time', 'desc')
      .limit(1)
    if (JSON.stringify(last) === '[]') {
      return undefined
    }
    return last
  }

  * fetchData(type, URL, since) {
    log.info(`Fetching BTC data from ${URL}`)
    axios.get(URL)
      .then(function (resp) {
        const bpi = resp.data.bpi
        co(function * () {
          log.info('Saving BTC data...')
          yield HPService.saveBitcoinData(bpi, since)
        })
      })
    return true
  }

}

module.exports = CoindeskService

