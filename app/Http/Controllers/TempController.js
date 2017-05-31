'use strict'

class TempController {

  * index (request, response) {
    yield response.sendView('temp')
  }

}

module.exports = TempController
