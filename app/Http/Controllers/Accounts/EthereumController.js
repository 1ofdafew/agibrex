'use strict'

const Validator = use('App/Services/Validator')
const Wallet = use('App/Model/Wallet')

class EthereumController {

  * account (request, response) {
    const user = yield request.auth.getUser()
    const wallet = yield user.wallets().where('type', 'ETHEREUM').fetch()
    console.log('eth: wallets =>', wallet)

    yield response.sendView('accounts/ethereum', {type: 'ethereum'})
  }

  * create (request, response) {
    try {
      const pins = request.only('pin1', 'pin2')
      yield Validator.validate(pins, Wallet.pinRules, Wallet.walletMessages)

      // yield WalletService.create('ethereum', request.auth.getUser())
      response.redirect('/accounts/ethereum')

    } catch(e) {
      console.log(e.fields)
      yield request.with({ error: e.fields }).flash()
      response.redirect('back')      
    }
  }

}

module.exports = EthereumController
