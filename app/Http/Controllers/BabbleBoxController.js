'use strict'

class BabbleBoxController {

  * index (request, response) {
    yield response.sendView('babblebox')
  }

}

module.exports = BabbleBoxController
