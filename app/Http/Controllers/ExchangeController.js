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
    yield this.preparePage('Bitcoin', 'ETH', 'BTC', request, response)
  }

  * eth (request, response) {
    yield CoindeskService.maybeFetchBitcoinData()
    yield this.preparePage('Ethereum', 'BTC', 'ETH', request, response)
  }

  * preparePage(name, buyCurrency, sellCurrency, request, response) {

    // user maybe null as exchange is public, until he logs in.
    var ethWallet = ''            // wallet for ETH
      , btcWallet = ''            // wallet for BTC
      , trcWallet = ''            // wallet for TRC
      , btcAddress = ''           // BTC address
      , ethAddress = '0x98c9ff32b9c6f4a870399f86caa3c40a01b856ef' // ETH address
      , trcAddress = ''           // TRC address
      , ethCurrentBalance = '0'   // ETH current balance
      , btcCurrentBalance = '0'   // BTC current balance
      , trcCurrentBalance = '0'   // TRC current balance
      , btcSpotPrice = '2680.06'
      , ethSpotPrice = '370.44'
      , trcSpotPrice = '0.85'
      , fee = '0.015'             // gibrex fees

    const user = yield request.auth.getUser()
    if (user) {
      try {
        const wallets = yield user.wallets().fetch()
        // log.info('user wallets:', wallets.toJSON())

        const eth = yield this.getWallet(wallets.toJSON(), 'ETHEREUM')
        ethWallet = yield WalletService.getBalance('ethereum', eth.address)
        ethAddress = eth.address
        ethCurrentBalance = ethWallet.data.balance.available //ETH
        log.info(`ETH: ${ethAddress} -> ${ethCurrentBalance}`)

        const btc = yield this.getWallet(wallets.toJSON(), 'BITCOIN')
        btcWallet = yield WalletService.getBalance('bitcoin', btc.address)
        btcAddress = btc.address
        btcCurrentBalance = btcWallet.data.balance.available
        log.info(`BTC: ${btcAddress} -> ${btcCurrentBalance}`)

        const trc = yield this.getWallet(wallets.toJSON(), 'TRACTO')
        trcWallet = yield WalletService.getBalance('tracto', trc.address)
        trcAddress = trc.address
        trcCurrentBalance = trcWallet.data.balance.available
        log.info(`BTC: ${trcAddress} -> ${trcCurrentBalance}`)

      } catch (e) {
        // user don't create the wallet yet
        log.info('No wallets for user yet')
      }
    }

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const asks = yield orderBookCntrl.showask(buyCurrency)
    const bids = yield orderBookCntrl.showbid(buyCurrency)

    try {
      // These spot price are in cents, to eliminate rounding errors
      btcSpotPrice = yield MDService.getSpotPrice('BTC')
      ethSpotPrice = yield MDService.getSpotPrice('ETH')

      // log.info(`Spot Prices: ETH: ${ETHSpotPrice}, BTC: ${BTCSpotPrice}`)
      // coinInEth = parseFloat(BTCSpotPrice / ETHSpotPrice)

    } catch (e) {
      log.error('Unable to find the spot price')
    }

    // price of the BTC spot price
    // const btcSpotPrice = (BTCSpotPrice/100).toFixed( 2 )
    const args = {
      type: sellCurrency,
      name: name,
      fee : fee,
      asks : asks,
      bids : bids,
      ethAddress: ethAddress,
      ethCurrentBalance: '10', //ethCurrentBalance,
      btcAddress: btcAddress,
      btcCurrentBalance: '20', //btcCurrentBalance,
      trcAddress: trcAddress,
      trcCurrentBalance: '20', //trcCurrentBalance,
      buyCurrency : buyCurrency,
      sellCurrency : sellCurrency,
      btcSpotPrice: parseFloat(btcSpotPrice).toFixed(2),
      ethSpotPrice: parseFloat(ethSpotPrice).toFixed(2),
      trcSpotPrice: parseFloat(trcSpotPrice).toFixed(2)
    }

    log.info('Params:', args)
    yield response.sendView('exchange.index', args)
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
    response.sendView('exchange.index', { twt : twt })
  }

  * getWallet(wallets, type) {
    // log.info('Getting wallet', type, 'from', wallets)
    try {
      var wallet = undefined
      wallets.forEach((x, idx) => {
        if (x.type === type) {
          wallet = x
        }
      })
      return wallet
    } catch (e) {
      return undefined
    }
  }

}

module.exports = ExchangeController
