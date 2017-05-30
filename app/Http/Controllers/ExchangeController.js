'use strict'

const OrderBook = use('App/Model/OrderBook')
const OrderBookCntrl = use('App/Http/Controllers/OrderBookController')
const ExchangeService = make('App/Services/ExchangeService')
const WalletService = make('App/Services/WalletService')
const uuid = require('uuid/v4')
const debug = require('debug')('gibrex')
const log = require('npmlog')


class ExchangeController {

  * index (request, response) {
    response.redirect('/exchange/btc')
  }

  * btc (request, response) {

      const user = yield request.auth.getUser()
    //   const wallet = yield WalletService.getWallet(user.username)
    //   const wallet = yield WalletService.getBalance('ETH', address)

    //   response.send(wallet)

      const defaultBuyCurrency = "ETH"
      const curBalance1 = '11.48300000'  //ETH
      const curBalance2 = '11.48300000'

      // TODO : Get Balance BTC
      const balance = '1.49'
      const price = '2228.00'
      const fee = '0.00'

      // Call showask
      const orderBookCntrl = new OrderBookCntrl()
      const showask = yield orderBookCntrl.showask('BTC')

      // Call showbid
      const showbid = yield orderBookCntrl.showbid('BTC')

      // TODO : Get Btc Price
      // const result = Request.get('https://blockchain.info/tobtc?currency=USD&value=0.85')
      // response.send(result)

      const coinInBtc = '' // Temporary

      // 1 BTC = 2228.00
      // 1 ETH = 199.00
      // 1 BTC = 2228 / 199 = 11.19
      const coinInEth = '11.19' // Temporary

      yield response.sendView(
          'exchange.index',
          {
              type: 'BTC',
              name: 'Bitcoin',
              balance : balance,
              price : price,
              fee : fee,
              coinInBtc : coinInBtc,
              coinInEth : coinInEth,
              showasks : showask,
              showbids : showbid,
              curBalance1 : curBalance1,
              curBalance2 : curBalance2,
              defaultBuyCurrency : defaultBuyCurrency,
          }
      )
  }

  * eth (request, response) {
    yield response.sendView('exchange.index', {type: 'ETH', name: 'Ethereum'})
  }

  * trc (request, response) {

    const defaultBuyCurrency = "BTC"
    const curBalance1 = '1.64320000'
    const curBalance2 = '11.48300000'

    // TODO : Get Balance
    const balance = '372.37490000'
    const price = '0.85'
    const fee = '0.00'

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const showask = yield orderBookCntrl.showask('TRC')

    // Call showbid
    const showbid = yield orderBookCntrl.showbid('TRC')

    // TODO : Get Btc Price
    // const result = Request.get('https://blockchain.info/tobtc?currency=USD&value=0.85')
    // response.send(result)

    const coinInBtc = '0.00038898' // Temporary
    const coinInEth = ' 0.00509165' // Temporary

    yield response.sendView(
        'exchange.index',
        {
            type: 'TRC',
            name: 'Tracto',
            balance : balance,
            price : price,
            fee : fee,
            coinInBtc : coinInBtc,
            coinInEth : coinInEth,
            showasks : showask,
            showbids : showbid,
            curBalance1 : curBalance1,
            curBalance2 : curBalance2,
            defaultBuyCurrency : defaultBuyCurrency,
        }
    )
  }

  * selltrc (request, response) {

    const user = yield request.auth.getUser()

    const price = '0.85'
    const amount = request.input('sell_amount')
    const to_asset = request.input('sell_currency')
    const total = amount * price
    const asset = 'TRC'

    const doAsk = yield ExchangeService.doAsk(total, amount, asset, to_asset, price)


    if (doAsk) {
        yield request.with(doAsk).flash()
        response.redirect('/exchange/trc')
    }
    // if (total != '' && amount != '') {
    //
    //     try {
    //         const data=request.only(['type', 'asset', 'amount', 'price','status','to_asset'])
    //
    //         const orderBook = new OrderBook(data)
    //         orderBook.type = 'Ask'
    //         orderBook.asset = 'TRC'
    //         orderBook.to_asset = sellCurrency
    //         orderBook.amount = amount
    //         orderBook.price = price
    //         orderBook.status = 1
    //
    //         yield orderBook.save()
    //
    //         const dataRedirect = {
    //             success: 'Successfully insert new Ask.',
    //             type: 'TRC'
    //         }
    //
    //         yield request.with(dataRedirect).flash()
    //         response.redirect('/exchange/trc')
    //
    //     } catch(e) {
    //
    //         debug(e)
    //         const errMsg = 'Error to save to OrderBook.'
    //
    //         log.error('gibrex:Unable to process new ASK', errMsg)
    //         debug('Sending error message: ', errMsg)
    //
    //         yield request.with({ error: errMsg }).flash()
    //         response.redirect('back')
    //
    //     }
    // } else {
    //
    //     const errMsg = 'Amount to Sell is required.'
    //
    //     log.error('gibrex:Unable to process new ASK', errMsg)
    //     debug('Sending error message: ', errMsg)
    //
    //     yield request.with({ error: errMsg }).flash()
    //     response.redirect('back')
    // }

  }

  * buytrc (request, response) {

    const user = yield request.auth.getUser()

    // const price = ''
    const price = '0.85'
    const amount = request.input('buy_amount')
    const currency = request.input('buy_currency')

    if (currency == 'BTC') {
    //   this.price = request.input('trcbtc')
    } else if (currency == 'ETH') {
    //   this.price = request.input('trceth')
    }

    const total = amount * this.price

    if (total != '' && amount != '') {

        try {
            const data=request.only(['type', 'asset', 'amount', 'price','status','to_asset'])

            const orderBook = new OrderBook(data)
            orderBook.type = 'Bid'
            orderBook.asset = 'TRC'
            orderBook.to_asset = currency
            orderBook.amount = amount
            orderBook.price = price
            orderBook.status = 1

            yield orderBook.save()

            const dataRedirect = {
              success: 'Successfully insert new Bid.',
              type: 'TRC'
            }

            yield request.with(dataRedirect).flash()
            response.redirect('/exchange/trc')

        } catch(e) {

            debug(e)
            const errMsg = 'Error to save to OrderBook.'

            log.error('gibrex:Unable to process new BID', errMsg)
            debug('Sending error message: ', errMsg)

            yield request.with({ error: errMsg }).flash()
            response.redirect('back')
        }

    } else {

        const errMsg = 'Amount to Buy is required.'

        log.error('gibrex:Unable to process new BID', errMsg)
        debug('Sending error message: ', errMsg)

        yield request.with({ error: errMsg }).flash()
        response.redirect('back')
    }
  }

}

module.exports = ExchangeController
