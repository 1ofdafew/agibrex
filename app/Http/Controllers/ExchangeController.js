'use strict'

class ExchangeController {

  * index (request, response) {
    response.redirect('/exchange/btc')
  }

  * btc (request, response) {
    yield response.sendView('exchange.btc')
  }

}

module.exports = ExchangeController
