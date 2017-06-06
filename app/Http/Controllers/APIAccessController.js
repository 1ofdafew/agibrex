'use strict'

class APIAccessController {

  * index (request, response) {
    yield response.sendView('apiAccess/api_Access')
  }

}

module.exports = APIAccessController
