'use strict'

class GibrexController {

  * aboutGibrex (request, response) {
    yield response.sendView('gibrex/about_Gibrex')
  }

  * ourSecurity (request, response) {
    yield response.sendView('gibrex/our_Security')
  }

  * fees (request, response) {
    yield response.sendView('gibrex/exchange_Fees')
  }

  * contactUs (request, response) {
    yield response.sendView('gibrex/contactUs')
  }

}

module.exports = GibrexController
