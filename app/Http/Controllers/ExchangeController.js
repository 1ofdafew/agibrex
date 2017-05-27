'use strict'

class ExchangeController {

  * index (request, response) {
    response.redirect('/exchange/btc')
  }

  * btc (request, response) {
    yield response.sendView('exchange.index', {type: 'BTC'})
  }

  * eth (request, response) {
    yield response.sendView('exchange.index', {type: 'ETH'})
  }

  * trc (request, response) {

    // TODO : Get Balance
    const balance = '372.37490000'

    const price = '0.85'
    const fee = '0.00'

    yield response.sendView(
        'exchange.index',
        {
            type: 'TRC',
            balance : balance,
            price : price,
            fee : fee,
        }
    )
  }

  * selltrc (request, response) {

    const price = '0.85'
    const amount = request.input('sell_amount')
    
    // response.send(request.input('sell_amount'))

  }

}

module.exports = ExchangeController
