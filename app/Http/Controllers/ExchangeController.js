'use strict'

const uuid = require('uuid/v4')
const debug = require('debug')('gibrex')
//const log = make('App/Services/LogService')
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
    response.redirect('/exchange/btc/eth')
  }

  * btcEth (request, response) {
    yield CoindeskService.maybeFetchBitcoinData()
    yield this.preparePage('Bitcoin', 'BTC', 'ETH', request, response)
  }

  * btcTrc (request, response) {
    yield CoindeskService.maybeFetchBitcoinData()
    yield this.preparePage('Bitcoin', 'BTC', 'TRC', request, response)
  }

  * ethBtc (request, response) {
    yield CoindeskService.maybeFetchBitcoinData()
    yield this.preparePage('Ethereum', 'ETH', 'BTC', request, response)
  }

  * ethTrc (request, response) {
    yield CoindeskService.maybeFetchBitcoinData()
    yield this.preparePage('Ethereum', 'ETH', 'TRC', request, response)
  }

  * trcEth (request, response) {
    yield this.preparePage('Tracto', 'TRC', 'ETH', request, response)
  }
  
  * trcBtc (request, response) {
    yield this.preparePage('Tracto', 'TRC', 'BTC', request, response)
  }

  * preparePage(name, baseCurrency, extCurrency, request, response) {

    // user maybe null as exchange is public, until he logs in.
    var ethWallet = ''            // wallet for ETH
      , btcWallet = ''            // wallet for BTC
      , trcWallet = ''            // wallet for TRC
      , btcAddress = ''           // BTC address
      , ethAddress = '0x98c9ff32b9c6f4a870399f86caa3c40a01b856ef' // ETH address
      , trcAddress = ''           // TRC address
      , ethCurrentBalance = '0.00000000'   // ETH current balance
      , btcCurrentBalance = '0.00000000'   // BTC current balance
      , trcCurrentBalance = '0.00000000'   // TRC current balance
      , btcSpotPrice = '2680.06'
      , ethSpotPrice = '370.44'
      , trcSpotPrice = '0.85'
      , btcFee = '0.004'
      , ethFee = '0.000441021'
      , trcFee = '0.0001'
      , fee = '0.015'             // gibrex fees

    const user = yield request.auth.getUser()
    if (user) {
      try {
        const wallets = yield user.wallets().fetch()
        // log.info('user wallets:', wallets.toJSON())

        const trc = yield this.getWallet(wallets.toJSON(), 'TRACTO')
        trcWallet = yield WalletService.getBalance('tracto', trc.address)
        trcAddress = trc.address
        trcCurrentBalance = trcWallet.data.balance.available
        log.info(`BTC: ${trcAddress} -> ${trcCurrentBalance}`)

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

      } catch (e) {
        // user don't create the wallet yet
        log.info('No wallets for user yet')
      }
    }

    // Call showask
    const orderBookCntrl = new OrderBookCntrl()
    const asks = yield orderBookCntrl.showask(baseCurrency)
    const bids = yield orderBookCntrl.showbid(baseCurrency)

    try {
      // These spot price are in cents, to eliminate rounding errors
      btcSpotPrice = yield MDService.getSpotPrice('BTC')
      ethSpotPrice = yield MDService.getSpotPrice('ETH')

      // log.info(`Spot Prices: ETH: ${ETHSpotPrice}, BTC: ${BTCSpotPrice}`)
      // coinInEth = parseFloat(BTCSpotPrice / ETHSpotPrice)

    } catch (e) {
      log.error('Unable to find the spot price')
    }

    // prepare for market data

    const args = {
      type: extCurrency,
      name: name,
      fee : fee,
      asks : asks,
      bids : bids,
      ethAddress: ethAddress,
      btcAddress: btcAddress,
      trcAddress: trcAddress,
      ethCurrentBalance: ethCurrentBalance,
      btcCurrentBalance: btcCurrentBalance,
      trcCurrentBalance: '30.00000000', //trcCurrentBalance,
      baseCurrency : baseCurrency,
      extCurrency : extCurrency,
      buyPair: `${baseCurrency}/${extCurrency}`,
      sellPair: `${extCurrency}/${baseCurrency}`,
      baseCurrencyLower : baseCurrency.toLowerCase(),
      extCurrencyLower : extCurrency.toLowerCase(),
      btcSpotPrice: parseFloat(btcSpotPrice).toFixed(2),
      ethSpotPrice: parseFloat(ethSpotPrice).toFixed(2),
      trcSpotPrice: parseFloat(trcSpotPrice).toFixed(2),
      btcFee: btcFee,
      ethFee: ethFee,
      trcFee: trcFee
    }

    log.info('Params:', args)
    yield response.sendView('exchange.index', args)
  }

  * buyBtcFromEth (request, response) {
    yield this.buy(request, response)
  }
  * buyBtcFromTrc (request, response) {
    yield this.buy(request, response)
  }

  * buyEthFromBtc (request, response) {
    yield this.buy(request, response)
  }
  * buyEthFromTrc (request, response) {
    yield this.buy(request, response)
  }

  * buyTrcFromBtc (request, response) {
    yield this.buy(request, response)
  }
  * buyTrcFromEth (request, response) {
    yield this.buy(request, response)
  }

  /**
   * Generic buy method that takes the generic input form the pages
   * which is the same for all currencies anyway.
   * and parse all the data for further processing
   */
  * buy (request, response) {
    const data = request.only([
      'buy_total', 'buy_price', 'buy_amount',
      'buy_currency', 'sell_currency',
      'from_address', 'to_address', 
      'order_type'
    ])
    log.info('buy data:', data)
    // info buy data: { buy_total: '7.11239522',
    // info buy data:   buy_price: '2752.40',
    // info buy data:   buy_amount: '1' }

    const order = {
      amount: data.buy_amount,
      price: data.buy_price,
      total: data.buy_total,
      asset: data.sell_currency,
      to_asset: data.buy_currency,
      type: data.order_type,
      fromAddress: data.from_address,
      toAddress: data.to_address
    }
    log.info('Order book:', order)
    yield this.confirmPin(order, request, response)
  }

  * sellBtcToEth (request, response) {
    log.info('Processing ASK for BTC/TRC pair')
    yield this.sell(request, response)
  }
  * sellBtcToTrc (request, response) {
    yield this.sell(request, response)
  }

  * sellEthToBtc (request, response) {
    yield this.sell(request, response)
  }
  * sellEthToTrc (request, response) {
    yield this.sell(request, response)
  }

  * sellTrcToBtc (request, response) {
    log.info('Processing ASK for TRC/BTC pair')
    yield this.sell(request, response)
  }
  * sellTrcToEth (request, response) {
    yield this.sell(request, response)
  }

  /**
   * Generic sell method that takes the generic input form the pages
   * which is the same for all currencies anyway.
   * and parse all the data for further processing
   */
  * sell (request, response) {
    const data = request.only([
      'sell_total', 'sell_price', 'sell_amount',
      'sell_currency', 'buy_currency',
      'from_address', 'to_address', 
      'order_type'
    ])
    console.log('sell data:', data)
    const order = {
      amount: data.sell_amount,
      price: data.sell_price,
      total: data.sell_total,
      asset: data.sell_currency,
      to_asset: data.buy_currency,
      type: data.order_type,
      fromAddress: data.from_address,
      toAddress: data.to_address
    }
    log.info('calling confirmPin function')
    this.confirmPin(order, request, response)
  }

  * confirmPin(data, request, response) {
    log.info('Preparing pin request for order', data)
    const user = yield request.auth.getUser()
    const order = {
      amount: data.sell_amount,
      price: data.sell_price,
      total: data.sell_total,
      asset: data.sell_currency,
      to_asset: data.sell_currency,
      type: data.type,
      btcAddress: data.btc_address,
      ethAddress: data.eth_address,
      trcAddress: data.trc_address
    }
    log.info('Order book:', order)

    try {
      const ob = TradeService.addOrderBook(user, order)
      yield request.with({orderBook: ob}).flash()
      yield response.redirect('/exchange/confirm')

    } catch (e) {
      const from = order.asset.toLowerCase()
      const to = order.to_asset.toLowerCase()
      const err = {
        error: 'Invalid order. Please try again'
      }
      yield request.with(err).flash()
      yield response.redirect(`/exchange/${from}/${to}`)
    }
  }

  * askForPin(request, response) {
    yield response.sendview('exchange.confirm')
  }

  * confirmPin(request, response) {
    // get back all the data
    // including the PIN
  }

  * executeOrder (order, request, response) {
    try {
      const user = yield request.auth.getUser()
      var currBalance = 0
      switch (order.fromAsset) {
        case 'BTC':
          // get BTC balance from address
          if (order.btcAddress !== '' || order.btcAddress !== undefined) {
            const btcWallet = yield WalletService.getBalance('bitcoin', order.btcAddress) 
            currBalance = btcWallet.data.balance.available
          }
          break
        case 'ETH':
          // get ETH wallet balance
          if (order.ethAddress !== '' || order.ethAddress !== undefined) {
            const ethWallet = yield WalletService.getBalance('ethereum', order.ethAddress) 
            currBalance = ethWallet.data.balance.available
          }
          break
        case 'TRC':
          // get TRC wallet balance
          if (order.trcAddress !== '' || order.trcAddress !== undefined) {
            const trcWallet = yield WalletService.getBalance('trcereum', order.trcAddress) 
            currBalance = trcWallet.data.balance.available
          }
          break
        default:
          break
      }
      
      // check if balance is enough to deduct
      if (currBalance < order.total) {
        const err = {
          status: 'error',
          error: 'Insufficient balance. Please deposit your account.'
        }
        log.error('Insufficient balance...')

        yield request.with(err).flash()
      } else {
        // ok, data is good. Create new order book
        log.info('Adding orderbook:', order)
        const doAsk = yield TradeService.doAskBid(user, order) 
        yield request.with(doAsk).flash() 
      }
    } catch (e) {
      log.error('Unable to execute buying option', e)
    }
    // location to return to
    const from = order.asset.toLowerCase()
    const to = order.to_asset.toLowerCase()
    response.redirect(`/exchange/${from}/${to}`)
  }

  * twitter(request, response) {
    const twt = yield TwitterService.getTweet()
    // log.info('this tweet: >> ', twt)
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
