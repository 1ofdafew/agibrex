'use strict'

class GibrexController {

  * aboutGibrex (request, response) {
    yield response.sendView('gibrex.aboutGibrex')
  }

  * ourSecurity (request, response) {
    yield response.sendView('gibrex.ourSecurity')
  }

  * fees (request, response) {
    yield response.sendView('gibrex.exchangeFees')
  }

  * contactUs (request, response) {
    yield response.sendView('gibrex.contactUs')
  }

}

module.exports = GibrexController
