'use strict'

const OrderBook = use('App/Model/OrderBook')
const OrderBookCntrl = use('App/Http/Controllers/OrderBookController')
const uuid = require('uuid/v4')
const debug = require('debug')('gibrex')
const log = require('npmlog')


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

    const defaultBuyCurrency = "BTC"
    const btcBalance = '1.64320000'
    const ethBalance = '11.48300000'

    // TODO : Get Balance
    const balance = '372.37490000'
    const price = '0.85'
    const fee = '0.00'

    // Call showbid
    const orderBookCntrl = new OrderBookCntrl()
    const showask = yield orderBookCntrl.showask('TRC')

    // TODO : Get Btc Price
    // const result = Request.get('https://blockchain.info/tobtc?currency=USD&value=0.85')
    // response.send(result)

    const trcInBtc = '0.00038898' // Temporary
    const trcInEth = ' 0.00509165' // Temporary

    yield response.sendView(
        'exchange.index',
        {
            type: 'TRC',
            balance : balance,
            price : price,
            fee : fee,
            trcInBtc : trcInBtc,
            trcInEth : trcInEth,
            showasks : showask,
            btcBalance : btcBalance,
            ethBalance : ethBalance,
            defaultBuyCurrency : defaultBuyCurrency,
        }
    )
  }

  * selltrc (request, response) {

    const user = yield request.auth.getUser()

    const price = '0.85'
    const amount = request.input('sell_amount')

    const total = amount * price

    if (total != '' && amount != '') {

        try {
            const data=request.only(['type', 'asset', 'amount', 'price','status'])

            const orderBook = new OrderBook(data)
            orderBook.type = 'Ask'
            orderBook.asset = 'TRC'
            orderBook.amount = amount
            orderBook.price = price
            orderBook.status = 1

            yield orderBook.save()

            const dataRedirect = {
                success: 'Bid Successful!',
                type: 'TRC'
            }

            yield request.with(dataRedirect).flash()
            response.redirect('/exchange/trc')

        } catch(e) {

            debug(e)
            const errMsg = 'Error to save to OrderBook'

            log.error('gibrex:Unable to process new ASK', errMsg)
            debug('Sending error message: ', errMsg)

            yield request.with({ error: errMsg }).flash()
            response.redirect('back')

        }
    } else {

        const errMsg = 'Amount to Sell is required.'

        log.error('gibrex:Unable to process new ASK', errMsg)
        debug('Sending error message: ', errMsg)

        yield request.with({ error: errMsg }).flash()
        response.redirect('back')
    }


  }

}

module.exports = ExchangeController
