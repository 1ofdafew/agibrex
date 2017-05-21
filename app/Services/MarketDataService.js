'use strict'

const Exceptions = use('App/Exceptions')
const Event = use('Event')
const Hash = use('Hash')

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
   * registers a new user with username, email address and password.
   *
   *
   *
   * @return {Object}
   *
   *  If unable to create a new user
   *
   * @public
   */
  * poll () {

    client.on('buy', (data) => {
      console.log('Got buy data', data)

      const md = new this.MarketData()
        md.type = 'USDT_BTC'
        md.volume = 'volume'
        md.price = data[i].data.rate
        md.exchange = 'poloniex'
        yield md.save()
      })


    // const freshInstance = yield this.MarketData.find(user.id)

    // firing email event in a non-blocking fashion
    // Event.fire('user:registered', freshInstance)
    //
    // return freshInstance
  }




}

module.exports = MarketDataService
