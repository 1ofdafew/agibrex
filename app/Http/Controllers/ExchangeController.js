'use strict'

class ExchangeController {

  * index (request, response) {
    response.redirect('/exchange/btc')
  }

  * btc (request, response) {
    yield response.sendView('exchange.index', {type: 'BTC'})
  }

  * eth (request, response) {
    yield response.sendView('exchange.index', {type: 'ETH'})
  }

  * trc (request, response) {
    yield response.sendView('exchange.index', {type: 'TRC'})
  }

}

module.exports = ExchangeController
