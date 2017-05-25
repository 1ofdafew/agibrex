'use strict'

class ExchangeController {

  * index (request, response) {
    yield response.sendView('exchange.main')
  }

}

module.exports = ExchangeController
