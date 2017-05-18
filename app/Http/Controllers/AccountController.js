'use strict'

class AccountController {

   * index (request, response){

      const acc_type = request.param('acc_type')

      // response.send(acc_type)

      yield response.sendView('account',{ 'acc_type' : acc_type })
   }
}

module.exports = AccountController
