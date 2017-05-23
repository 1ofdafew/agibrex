'use strict'

class ExchangeController {

    * index (request, response) {

        yield response.sendView('exchange')
    }
}

module.exports = ExchangeController
