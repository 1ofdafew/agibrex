'use strict'

const logger = make('App/Services/LogService')

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
      logger.info('accounts:', accounts)

      // get some balance
      const balances = yield WalletService.getAccountBalance(accounts)
      logger.info(`Balance dashboard:`, balances)
      const args = {
        bitcoin: balances.filter(function(x) { return x.type === 'BITCOIN'})[0],
        ethereum: balances.filter(function(x) { return x.type === 'ETHEREUM'})[0],
        tracto: balances.filter(function(x) { return x.type === 'TRACTO'})[0]
      }
      logger.info(`Balance dashboard:`, args)
      yield response.sendView('dashboard', {accounts: args})
    } catch(e) {
      logger.error(e)
      response.redirect('/auth/login')
    }
  }

}

module.exports = DashboardController
