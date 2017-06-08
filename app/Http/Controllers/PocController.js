'use strict'

const log = require('npmlog')

class PocController {

  * orderbook (request, response) {
    log.info('Sending to POC index page')
    yield response.sendView('poc.orderbook')
  }

  * message (request, response) {
    yield response.sendView('poc.message')
  }

}

module.exports = PocController
