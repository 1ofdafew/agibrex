'use strict'

// const OrderBook = use('App/Model/OrderBook')
const MatcherService = make('App/Services/MatcherService')
const TxService = make('App/Services/TransactionService')
const debug = require('debug')('gibrex')
const log = require('npmlog')

class TradeService {

  static get inject () {
    return ['App/Model/OrderBook']
  }

  constructor (OrderBook) {
    this.OrderBook = OrderBook
  }

  * doAskBid (data) {

    if (data) {

      try {
        // const data=request.only(['type', 'asset', 'amount', 'price','status','to_asset'])
        const orderBook = new this.OrderBook(data, data.user)
        // const orderBook = new OrderBook(data)
        orderBook.type = data.type
        orderBook.asset = data.asset
        orderBook.to_asset = data.to_asset
        orderBook.amount = data.amount
        orderBook.price = data.price
        orderBook.status = 1
        yield orderBook.save()

        if (orderBook.isNew()) {
          throw new Exceptions.ApplicationException(`Unable to add your new ${data.type}.`, 400)
        }
        // const freshInstance = yield this.OrderBook.find(orderBook.id)
        // match to do the matching new ask/bid
        const matching = yield MatcherService.compare(data)
        const dataRedirect = {
          status: 'ok',
          success: `Successfully insert new ${data.type}.`
        }
        return dataRedirect

      } catch(e) {

        debug(e)
        const errMsg = `Error to save new ${data.type} to OrderBook.`

        log.error(`gibrex:Unable to process new ${data.type} `, e)
        debug('Sending error message: ', errMsg)

        const dataRedirect = {
          status: 'error',
          error: errMsg
        }
        return dataRedirect
      }
    } else {
      const errMsg = 'Amount is required.'

      log.error(`gibrex:Unable to process new orderbook: ${errMsg}`)

      debug('Sending error message: ', errMsg)
      const dataRedirect = {
        status: 'error',
        error: errMsg
      }
      return dataRedirect
    }

  }

  * doUpdateOrderbook(data) {

     /** From TxSvc (doSuccessTxProcess)
     * @params data
     *            - tx_id: interger
     */
     const tx = yield Database.select('orderbook_id','amount')
      .from('transactions')
      .where('id',data.tx_id)

     const bid = yield Database.select('bid_id','ask_id','amount')
      .from('matchings')
      .where('bid_id',tx.orderbook_id)

     // TODO : looping bid checking amount
     const totalAskAmount = '';

     if (totalAskAmount == tx.amount) {

          yield Database
            .table('order_books')
            .where('id', tx.orderbook_id)
            .update('balance', '0')
            .update('status', 'CLOSED')

          const dataTrace  = {
            tx_id: data.tx_id,
            trace: '10', // Update Trade Service
            status:'SUCCESS'
          }

          yield TxService.doUpdateTrace(dataTrace)
     } else {

          // TODO : if not enough matching amount
     }


  }

}

module.exports = TradeService
