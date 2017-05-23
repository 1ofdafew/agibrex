'use strict'

const Wallet = use('App/Model/Wallet')
const Validator = use('App/Services/Validator')
const WalletService = make('App/Services/WalletService')

class CoinController {

  constructor(CoinType) {
    this.CoinType = CoinType
  }

  * account (request, response) {
    const user = yield request.auth.getUser()
    // console.log('User:', user)
    // console.log('Type:', this.CoinType.toUpperCase())

    const resp = yield user.wallets().where('type', this.CoinType.toUpperCase()).fetch()
    // console.log('Response:', resp)

    const wallet = resp.toJSON()[0]

    // console.log(this.CoinType, ':: wallets =>', wallet)
    // console.log('eth: wallets =>', wallet)

    if (wallet === undefined) {
      const args = { type: this.CoinType }
      yield response.sendView('accounts.index', args)      
    } else {
      const balance = yield WalletService.getBalance(this.CoinType, wallet.address)
      // console.log(this.CoinType, '::Controller balance:', balance.data)

      // if (this.CoinType) {
      //     balResp = {
      //       available: bal.availableBalance,
      //       pending: bal.lockedAmount
      //     }         
      // } else if (this.CoinType === 'bitcoin') {
      //     balResp = {
      //       available: bal.data.available,
      //       pending: bal.data.pending
      //     }
      // } else if (this.CoinType === 'ethereum') {
      //     balResp = {
      //       available: parseFloat(bal.data.balance).toFixed(10)
      //     }
      // } else {
      //     balResp = {
      //       available: '0.0',
      //       pending: '0.0'
      //     }
      // }

      // console.log(this.CoinType, ':: Balance:', balance)
      const args = {
        type: this.CoinType.replace(/\b\w/g, l => l.toUpperCase()),
        balance: balance.data.balance,
        wallet: wallet
      }
      return yield response.sendView(`accounts.${this.CoinType}`, args)
    }

  }

  * create (request, response) {
    try {
      const pins = request.only('pin1', 'pin2')
      yield Validator.validate(pins, Wallet.pinRules, Wallet.walletMessages)

      const user = yield request.auth.getUser()
      const pin = pins.pin1
      console.log(this.CoinType, ':: request data: user =>', user, 'pin =>', pin)

      const wallet = yield WalletService.create(this.CoinType, user, pin)
      console.log(wallet)

      response.redirect(`/accounts/${this.CoinType}`)

    } catch(e) {
      yield request.with({ error: e.fields }).flash()
      response.redirect('back')      
    }
  }

  * deposit (request, response) {
    yield response.sendView('accounts/deposit/bitcoin', { type: TYPE})
  }

  * withdraw (request, response) {
    yield response.sendView('accounts/withdraw/bitcoin', { type: TYPE})
  }

}

module.exports = CoinController
