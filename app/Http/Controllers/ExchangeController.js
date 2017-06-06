'use strict'

const OrderBook = use('App/Model/OrderBook')
const OrderBookCntrl = use('App/Http/Controllers/OrderBookController')
const TradeService = make('App/Services/TradeService')
const WalletService = make('App/Services/WalletService')
const uuid = require('uuid/v4')
const debug = require('debug')('gibrex')
const log = require('npmlog')

const CoindeskService = make('App/Services/CoindeskService')
const MDService = make('App/Services/MarketDataService')

class ExchangeController {

  * index (request, response) {
    response.redirect('/exchange/btc')
  }

  * btc (request, response) {
    yield CoindeskService.maybeFetchBitcoinData()
    const currentData = yield MDService.getBitcoinCurrentData()
    // log.info('BTC current data:', currentData)

    // user maybe null as exchange is public, until he logs in.
    var ethWallet = ''
      , btcWallet = ''
      , curBalance1 = 0
      , curBalance2 = 0

    const user = yield request.auth.getUser()
    if (user ) {
      const w = yield WalletService.getWallet(user.username)
      ethWallet = yield WalletService.getBalance('ethereum', w.address)
      btcWallet = yield WalletService.getBalance('bitcoin', w.address)

      const curBalance1 = ethWallet.data.balance.available //ETH
      const curBalance2 = ethWallet.data.balance.available
    }
    // response.send(btcWallet)

    const defaultBuyCurrency = 'ETH'

    // TODO : Get Balance BTC
    const balance = '0.0'
    const price = '2782.99'
    const fee = '0.00'

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const showask = yield orderBookCntrl.showask('BTC')
    const showbid = yield orderBookCntrl.showbid('BTC')

    // TODO : Get Btc Price
    // const result = Request.get('https://blockchain.info/tobtc?currency=USD&value=0.85')
    // response.send(result)

    // These spot price are in cents, to eliminate rounding errors
    const BTCSpotPrice = yield MDService.getSpotPrice('BTC')
    const ETHSpotPrice = yield MDService.getSpotPrice('ETH')
    log.info(`Spot Prices: ETH: ${ETHSpotPrice}, BTC: ${BTCSpotPrice}`)

    const coinInBtc = '' // Temporary

    // 1 BTC = 2228.00
    // 1 ETH = 199.00
    // 1 BTC = 2228 / 199 = 11.19
    // const coinInEth = '11.19' // Temporary
    const coinInEth = parseFloat(BTCSpotPrice / ETHSpotPrice)

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
        currentData: currentData
      }
    )
  }

  * eth (request, response) {
    yield CoindeskService.maybeFetchEthereumData()

    const defaultBuyCurrency = 'BTC'
    const currentData = yield MDService.getEthereumCurrentData()
    const BTCSpotPrice = yield MDService.getSpotPrice('BTC')
    const ETHSpotPrice = yield MDService.getSpotPrice('ETH')

    const coinInBtc = parseFloat(ETHSpotPrice / BTCSpotPrice)

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const showask = yield orderBookCntrl.showask('ETH')
    const showbid = yield orderBookCntrl.showbid('ETH')

    const args = {
      type: 'ETH',
      name: 'Ethereum',
      coinInBtc: coinInBtc,
      coinInEth: coinInEth,
      showasks : showask,
      showbids : showbid,
      currentData: currentData,

      // temp data
      balance : '30000.00',
      price : parseFloat(ETHSpotPrice),
      fee : '0.025',
      curBalance1 : '0.001',
      curBalance2 : '1.02',
      defaultBuyCurrency : defaultBuyCurrency,
    }
    yield response.sendView('exchange.index', args)
  }

  * trc (request, response) {

    const defaultBuyCurrency = 'BTC'
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

    const amount = request.input('sell_amount')
    const price = '0.85'

    const data = {
      user: user,
      price: price,
      amount: amount,
      to_asset: request.input('sell_currency'),
      total: amount * price,
      asset: 'TRC',
      type: 'ASK'
    }

    const doAsk = yield TradeService.doAskBid(data)

    if (doAsk) {
      yield request.with(doAsk).flash()
      response.redirect('/exchange/trc')
    }

  }

  * buytrc (request, response) {

    const user = yield request.auth.getUser()

    const amount = request.input('buy_amount')
    const price = '0.85'

    const data = {
      user: user,
      price: price,
      amount: amount,
      to_asset: request.input('buy_currency'),
      total: amount * price,
      asset: 'TRC',
      type: 'BID'
    }

    // if (to_asset == 'BTC') {
    // //   this.price = request.input('trcbtc')
    // } else if (to_asset == 'ETH') {
    // //   this.price = request.input('trceth')
    // }

    const doAsk = yield TradeService.doAskBid(data)

    if (doAsk) {
      yield request.with(doAsk).flash()
      response.redirect('/exchange/trc')
    }

  }

  * buybtc (request, response) {

    const user = yield request.auth.getUser()

    const amount = request.input('buy_amount')
    const buy_available = request.input('buy_available')
    const price = '2228.00'

    if (buy_available == 0) {

         const dataError = {
           status: 'error',
           error: 'Insufficient balance. Please deposit your account.'
         }
         yield request.with(dataError).flash()
         response.redirect('/exchange/btc')
    }

    const data = {
      user: user,
      price: price,
      amount: amount,
      to_asset: request.input('buy_currency'),
      total: amount * price,
      asset: 'BTC',
      type: 'BID'
    }

    const doAsk = yield TradeService.doAskBid(data)

    if (doAsk) {
      yield request.with(doAsk).flash()
      response.redirect('/exchange/btc')
    }

  }

  * sellbtc (request, response) {
    const user = yield request.auth.getUser()
    const amount = request.input('sell_amount')
    const price = '2228.00'

    const data = {
      user: user,
      price: price,
      amount: amount,
      to_asset: request.input('sell_currency'),
      total: amount * price,
      asset: 'BTC',
      type: 'ASK'

    }

    const doAsk = yield TradeService.doAskBid(data)


    if (doAsk) {
      yield request.with(doAsk).flash()
      response.redirect('/exchange/btc')
    }

  }

}

module.exports = ExchangeController
