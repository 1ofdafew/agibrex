'use strict'

const Wallet = use('App/Model/Wallet')
const Validator = use('App/Services/Validator')
const WalletService = make('App/Services/WalletService')

class EthereumController {

  * account (request, response) {
    const user = yield request.auth.getUser()
    const wallet = yield user.wallets().where('type', 'ETHEREUM').fetch()
    // console.log('eth: wallets =>', wallet)

    yield response.sendView('accounts/ethereum', {type: 'ethereum'})
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
