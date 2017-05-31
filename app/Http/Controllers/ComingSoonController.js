'use strict'

class TempController {

  * index (request, response) {
    yield response.sendView('coming_soon')
  }

}

module.exports = TempController
