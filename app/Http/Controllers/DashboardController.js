'use strict'

const log = use('npmlog')

const Wallet = use('App/Model/Wallet')
const WalletService = make('App/Services/WalletService')

class DashboardController {

  /**
   * main dashboard page
   *
   * @param {object} request
   * @param {object} response
   */
  * index (request, response) {
    try {
      const user = yield request.auth.getUser()
      const res = yield user.wallets().fetch()
      const accounts = res.toJSON()
      log.info('accounts:', accounts)

      // get some balance
      const balances = yield WalletService.getAccountBalance(accounts)
      log.info(`Balance dashboard:`, balances)
      const args = {
        bitcoin: yield balances.filter(function(x) { return x.type === 'BITCOIN'})[0],
        ethereum: yield balances.filter(function(x) { return x.type === 'ETHEREUM'})[0],
        tracto: yield balances.filter(function(x) { return x.type === 'TRACTO'})[0]
      }
      log.info(`Balance dashboard:`, args)
      yield response.sendView('dashboard', {accounts: args})
    } catch(e) {
      log.error(e)
      response.redirect('/auth/login')
    }
  }

}

module.exports = DashboardController
