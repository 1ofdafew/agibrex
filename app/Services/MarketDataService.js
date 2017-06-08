'use strict'

const Exceptions = use('App/Exceptions')
const Event = use('Event')
const Hash = use('Hash')

const MarketData = use('App/Model/MarketData')
const Db = use('Database')

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

  * getSpotPrice (type) {
    const URL = `https://api.coinbase.com/v2/prices/${type}-USD/spot`
    var num
    yield axios.get(URL)
      .then(function (resp) {
        co(function * () {
          const value = parseInt(parseFloat(resp.data.data.amount) * 100)
          // log.info('spot value for', type, ' =', value)
          num = value
        })
    })
    return num
  }

  * getBitcoinCurrentData () {
    return yield this.getCurrentData('BTC')
  }

  * getEthereumCurrentData () {
    return yield this.getCurrentData('ETH')
  }

  * getCurrentData(type) {
    const data = yield Db.table('market_data')
        .where('symbol', type)
        .orderBy('created_at', 'desc')
        .limit(1)

    // log.info('current data:', data)
    if (JSON.stringify(data) === '[]') {
      yield this.fetchCurrentData(type)
      return yield this.getCurrentData(type)
    } else {
      return data[0]
    }
  }

  * fetchCurrentData (type) {
    const URL = `http://coinmarketcap.northpole.ro/api/v6/${type}.json`
    yield axios.get(URL)
      .then(function (resp) {
        co(function * () {
          const data = {
            symbol: resp.data.symbol,
            price: resp.data.price.usd,
            change1h: resp.data.change1h,
            change24h: resp.data.change24h,
            change7d: resp.data.change7d,
            volume24h: {
              usd: resp.data.volume24.usd,
              eur: resp.data.volume24.eur,
              btc: resp.data.volume24.btc
            }
          }
          const md = new MarketData(data)
          yield md.save()
        })
      })
  }

}

module.exports = MarketDataService
