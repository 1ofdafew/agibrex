'use strict'

const log = require('npmlog')

class PocController {

  * index (request, response) {
    log.info('Sending to POC index page')
    yield response.sendView('poc.index')
  }

}

module.exports = PocController
