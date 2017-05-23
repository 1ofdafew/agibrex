'use strict'

const Wallet = use('App/Model/Wallet')
const Validator = use('App/Services/Validator')
const WalletService = make('App/Services/WalletService')
const View = use('View')

const TYPE = 'ethereum'

class EthereumController {

  constructor() {
  }

  * account (request, response) {
    const user = yield request.auth.getUser()
    const resp = yield user.wallets().where('type', 'ETHEREUM').fetch()
    const wallet = resp.toJSON()[0]

    console.log('eth: wallets =>', wallet)
    // console.log('eth: wallets =>', wallet)

    if (wallet.uuid) {
      const bal = yield WalletService.getBalance(TYPE, wallet.address)
      const balance = parseFloat(bal.data.balance).toFixed(10)
      console.log('Balance:', bal)
      const args = {
        type: 'Ethereum',
        balance: balance,
        wallet: wallet
      }
      yield response.sendView('accounts.tabs', args)
    } else {
      const args = {
        type: 'ethereum'
      }
      yield response.sendView('accounts.index', args)
    }
  }

  * create (request, response) {
    try {
      const pins = request.only('pin1', 'pin2')
      yield Validator.validate(pins, Wallet.pinRules, Wallet.walletMessages)

      const user = yield request.auth.getUser()
      const pin = pins.pin1
      console.log('request data: user =>', user, 'pin =>', pin)

      const wallet = yield WalletService.create('ethereum', user, pin)
      console.log(wallet)

      response.redirect('/accounts/ethereum')

    } catch(e) {
      yield request.with({ error: e.fields }).flash()
      response.redirect('back')
    }
  }

}

module.exports = EthereumController
