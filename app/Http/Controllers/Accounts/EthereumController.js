'use strict'
const Database = use('Database')
const OrderBook = use('App/Model/OrderBook')
const EtherCoin = use('App/Services/Coins/Ethereum')

class EthereumController {

  * account (request, response) {


      const etherAcc = new EtherCoin()
      yield etherAcc.checkBalance('0xd5956c61571bb5d34e6db25290200d4572444581')
      response.ok(etherAcc)
      yield response.sendView('accounts/ethereum', { type: 'ethereum'})
  }

  * deposit (request, response) {
      yield response.sendView('accounts/deposit/ethereum', { type: 'ethereum'})
  }

  * withdraw (request, response) {
      yield response.sendView('accounts/withdraw/ethereum', { type: 'ethereum'})
  }

}

module.exports = EthereumController
