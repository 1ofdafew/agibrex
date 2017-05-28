'use strict'

class ExchangeController {

  * index (request, response) {
    response.redirect('/exchange/btc')
  }

  * btc (request, response) {
    yield response.sendView('exchange.index', {type: 'BTC', name: 'Bitcoin'})
  }

  * eth (request, response) {
    yield response.sendView('exchange.index', {type: 'ETH', name: 'Ethereum'})
  }

  * trc (request, response) {
    yield response.sendView('exchange.index', {type: 'TRC', name: 'Tracto'})
  }

}

module.exports = ExchangeController
