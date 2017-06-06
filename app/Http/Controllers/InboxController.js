'use strict'

class InboxController {

  * index (request, response) {
    yield response.sendView('inbox')
  }

}

module.exports = InboxController
