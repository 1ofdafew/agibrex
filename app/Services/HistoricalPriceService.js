'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');
const log = require('npmlog')

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

  * saveBitcoinData(bpi) {
    for (const key in bpi) {
      yield this.saveData('BTC', key, bpi[key])
    }
  }

  * saveEthereumData (data) {
    for (var i=0; i < data.length;i++) {
      yield this.saveData('ETH', data[i].time, data[i].usd)
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
      .orderBy('date', 'asc')
  }

  * saveData(type, date, price) {
    const hp = new HistoricalPrice()
    hp.date = date
    hp.price = price
    hp.type = type

    yield hp.save()
    // log.info('<< HP saved:', hp)
  }    

}
module.exports = HistoricalPriceService

