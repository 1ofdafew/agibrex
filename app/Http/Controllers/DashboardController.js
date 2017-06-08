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
        bitcoin: yield this.toDecimals(
          balances.filter(function(x) { return x.type === 'BITCOIN'})[0]),
        ethereum: yield this.toDecimals(
          balances.filter(function(x) { return x.type === 'ETHEREUM'})[0]),
        tracto: yield this.toDecimals(
          balances.filter(function(x) { return x.type === 'TRACTO'})[0])
      }
      log.info(`Balance dashboard:`, args)
      yield response.sendView('dashboard', {accounts: args})
    } catch(e) {
      log.error(e)
      response.redirect('/auth/login')
    }
  }

  * toDecimals(account) {
    log.info('parsing ', account)
    if (account !== undefined) {
      const available = parseFloat(account.balance.available).toFixed(8)
      if (account.balance.pending !== undefined) {
        const pending = parseFloat(account.balance.pending).toFixed(8)
        account.balance.available = available
        account.balance.pending = pending
        return account
      }
      account.balance.available = available
      return account
    }
  }

}

module.exports = DashboardController
