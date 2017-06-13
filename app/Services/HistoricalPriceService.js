'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');
const log = make('App/Services/LogService')
const moment = require('moment')

const HistoricalPrice = use('App/Model/HistoricalPrice')

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

  * saveBitcoinData(bpi, since) {
    for (const key in bpi) {
      if (moment(key).isAfter(moment(since))) {
        log.info(`Saving BTC data ${key} -> ${bpi[key]}`)
        yield this.saveData('BTC', key, bpi[key])
      }
    }
  }

  /**
   * Save data from Ethereum data input
   * @param data{Array} - data input
   * @param since{String} - the date from
   */
  * saveEthereumData (data, since) {
    for (var i=0; i < data.length;i++) {
      log.info(`Data: ${data[i].time}, Since: ${since}`)
      if (moment(data[i].time).isAfter(moment(since))) {
        log.info('Saving ETH data', data[i])
        yield this.saveData('ETH', data[i].time, data[i].usd)
      }
    }
  }

  * countBitcoinData () {
    return yield this.count('BTC')
  }

  * countEthereumData () {
    return yield this.count('ETH')
  }

  * count (type) {
    return yield Database  
      .from('historical_prices')
      .count('id as id')
      .where('type', type)
  }
  * fetchBitcoinData () {
    return yield this.fetchData('BTC')
  }

  * fetchEthereumData () {
    return yield this.fetchData('ETH')
  }

  * fetchData (type) {
    log.info(`Fething ${type} data...`)
    return yield Database.table('historical_prices')
      .where('type', type)
      .orderBy('time', 'asc')
  }

  * saveData(type, date, price) {
    const hp = new HistoricalPrice()
    hp.time = date
    hp.price = price
    hp.type = type

    yield hp.save()
    // log.info('<< HP saved:', hp)
  }    

}
module.exports = HistoricalPriceService

