'use strict'

class TradesController {

  * index (request, response) {
    yield response.sendView('trades/index')
  }

  * trade_bitcoin (request, response) {
    yield response.sendView('trades/bitcoin')
  }

  * trade_tracto (request, response) {
    yield response.sendView('trades/tracto')
  }

  * trade_ethereum (request, response) {
    yield response.sendView('trades/ethereum')
  }

}

module.exports = TradesController
