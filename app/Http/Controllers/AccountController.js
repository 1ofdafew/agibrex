'use strict'

class AccountController {

  * index (request, response) {

      const user = yield request.auth.getUser()

      const acc_type = request.param('acc_type')

      // const sql = yield Database.from('wallet').where({ type: acc_type }).where({ uuid: user.id) })

      // response.send(sql)
      // if (account) {

         // response.send(account.wallet_id)
      // } else {
      //
      // }


      yield response.sendView('account',{ 'acc_type' : acc_type })
      
    response.sendView('account')

  }
}

module.exports = AccountController
