'use strict'

const uuid = require('uuid/v4')
const debug = require('debug')('gibrex')
const log = require('npmlog')

const OrderBook = use('App/Model/OrderBook')
const OrderBookCntrl = use('App/Http/Controllers/OrderBookController')

const TradeService = make('App/Services/TradeService')
const WalletService = make('App/Services/WalletService')
const CoindeskService = make('App/Services/CoindeskService')
const MDService = make('App/Services/MarketDataService')
const TwitterService = make('App/Services/TwitterService')

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
      , ethCurrentBalance = '10'
      , btcCurrentBalance = '20'
      , fee = '0.015'
      , buyCurrency = 'ETH'
      , sellCurrency = 'BTC'

    const user = yield request.auth.getUser()
    if (user ) {
      try {
        const w = yield WalletService.getWallet(user.username)
        ethWallet = yield WalletService.getBalance('ethereum', w.address)
        btcWallet = yield WalletService.getBalance('bitcoin', w.address)

        const ethCurrentBalance = ethWallet.data.balance.available //ETH
        const btcCurrentBalance = ethWallet.data.balance.available
      } catch (e) {
        // user don't create the wallet yet
        log.info('No wallets for user yet')
      }
    }

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const asks = yield orderBookCntrl.showask('BTC')
    const bids = yield orderBookCntrl.showbid('BTC')

    var BTCSpotPrice = '268006'
      , ETHSpotPrice = '37044'
    try {
      // These spot price are in cents, to eliminate rounding errors
      // BTCSpotPrice = yield MDService.getSpotPrice('BTC')
      // ETHSpotPrice = yield MDService.getSpotPrice('ETH')

      // log.info(`Spot Prices: ETH: ${ETHSpotPrice}, BTC: ${BTCSpotPrice}`)
      // coinInEth = parseFloat(BTCSpotPrice / ETHSpotPrice)

    } catch (e) {
      log.error('Unable to find the spot price')
    }

    // price of the BTC spot price
    // const btcSpotPrice = (BTCSpotPrice/100).toFixed( 2 )
    const args = {
      type: 'BTC',
      name: 'Bitcoin',
      fee : fee,
      asks : asks,
      bids : bids,
      ethCurrentBalance : ethCurrentBalance,
      btcCurrentBalance : btcCurrentBalance,
      buyCurrency : buyCurrency,
      sellCurrency : sellCurrency,
      currentData: currentData,
      btcSpotPrice: BTCSpotPrice/100,
      ethSpotPrice: ETHSpotPrice/100
    }

    yield response.sendView('exchange.index', args)
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
      showasks : showask,
      showbids : showbid,
      currentData: currentData,

      // temp data
      balance : '30000.00',
      price : parseFloat(ETHSpotPrice),
      fee : '0.025',
      ethCurrentBalace : '0.001',
      btcCurrentBalace : '1.02',
      defaultBuyCurrency : defaultBuyCurrency,
    }
    yield response.sendView('exchange.index', args)
  }

  * trc (request, response) {

    const defaultBuyCurrency = 'BTC'
    const ethCurrentBalace = '1.64320000'
    const btcCurrentBalace = '11.48300000'

    // TODO : Get Balance
    const balance = '372.37490000'
    const fee = '0.00'

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const showask = yield orderBookCntrl.showask('TRC')

    // Call showbid
    const showbid = yield orderBookCntrl.showbid('TRC')

    // TODO : Get Btc Price
    // const result = Request.get('https://blockchain.info/tobtc?currency=USD&value=0.85')
    // response.send(result)

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
        ethCurrentBalace : ethCurrentBalace,
        btcCurrentBalace : btcCurrentBalace,
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
    const curr_balance = request.input('curr_balance')
    const price = request.input('price')

    if (curr_balance <= 0) {
         const dataError = {
           status: 'error',
           error: 'Insufficient balance. Please deposit your account.'
         }
         yield request.with(dataError).flash()
         response.redirect('/exchange/btc')
    }

    if (amount == 0) {

         const dataError = {
           status: 'error',
           error: 'Amount is required. Please enter valid amount.'
         }
         yield request.with(dataError).flash()
         response.redirect('/exchange/btc')
    }

    const data = {
      user: user,
      price: price,
      amount: amount,
      to_asset: 'BTC',
      total: amount * price,
      asset: request.input('buy_currency'),
      type: 'BID'
    }

    // response.send(data)

    const doAsk = yield TradeService.doAskBid(data)

    if (doAsk) {
      yield request.with(doAsk).flash()
      response.redirect('/exchange/btc')
    }

  }

  * sellbtc (request, response) {
    const user = yield request.auth.getUser()
    const amount = request.input('sell_amount')
    const price = request.input('sell_price')

    const data = {
      user: user,
      price: price,
      amount: amount,
      balance: amount,
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

  * twitter(request, response) {
    const twt = yield TwitterService.getTweet()
    log.info('this tweet: >> ', twt)
    // response.ok(twt)
    yield response.sendView(
      'exchange.index',
      {
        twt : twt,
      }
    )
  }

}

module.exports = ExchangeController
