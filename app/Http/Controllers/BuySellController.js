'use strict'

class BuySellController {

   * index (request, response) {

      const acc_type = request.param('acc_type')

      yield response.sendView('buysell',{ 'acc_type' : acc_type })
   }
}

module.exports = BuySellController
