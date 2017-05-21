'use strict'

const KrakenClient = require('kraken-api')


// const req = use('Request');
// const MarketData = use('App/Model/MarketData')

class KrakenPoller {

  constructor() {
    this.kraken = new KrakenClient(
      '6lCCNDeQHFj9boJFzooth+ERlcLBOllletAhQifWnIPy87RvoTgZdHhC',
      'oumS1kGdpLzac73l4t+Ae/HQ4SayQO03pctb3XQao6x0KpRMBT5niE1qrEs/KpQDvB/7hm7eBv0O+ALqyHiu5w==')
  }

  * poll() {
    this.kraken.api('Ticker', {"pair": 'XBLTXBTC'}, function(error, data) {
      if (!error) {
        return data.result
      }
    })
  }

}

module.exports = KrakenPoller
