'use strict'

// const OrderBook = use('App/Model/OrderBook')
const Exceptions = use('App/Exceptions')

const MatcherService = make('App/Services/MatcherService')
const TxService = make('App/Services/TransactionService')
const OrderBook = use('App/Model/OrderBook')

const logger = make('App/Services/LogService')

class TradeService {

  static get inject () {
    return ['App/Model/OrderBook']
  }

  constructor (OrderBook) {
    this.OrderBook = OrderBook
  }

  * addOrderBook(user, data) {
    try {
      logger.info('Adding new order book for user', user.username, ' with data', data)
      const ob = new this.OrderBook()
      ob.user_id = user.id
      ob.type = data.type
      ob.asset = data.asset
      ob.from_address = data.fromAddress
      ob.to_address = data.toAddress
      ob.to_asset = data.to_asset
      ob.amount = data.amount
      ob.price = data.price
      ob.balance = data.amount

      logger.info('OrderBook:', ob)

      yield ob.save()
      if (ob.isNew()) {
        throw new Exceptions.ApplicationException(`Unable to add your new ${data.type}.`, 400)
      }
      return yield this.OrderBook.find(ob.id)
    } catch(e) {
      logger.error('Unable to save orderbook:', e.message)
      throw new Exceptions.ApplicationException('Unable to create order book', 400)
    }
  }

  * getOrderBook(orderBookId) {
    try {
      return yield this.OrderBook.find(orderBookId)
    } catch(e) {
      throw new Error('Invalid order book id')
    }
  }

  * doAskBid(user, data) {
    logger.info(`doAskBid:Starting doAskBid Process...`)
    if (data) {
      logger.info(`doAskBid:Data founded...`)
      try {
        logger.info(`doAskBid:Try processing data...`)
        //const orderBook = new this.OrderBook(data, data.user)
        const orderBook = new this.OrderBook()
        orderBook.user_id = user.id
        orderBook.type = data.type
        orderBook.asset = data.asset
        orderBook.to_asset = data.to_asset
        orderBook.amount = data.amount
        orderBook.balance = data.amount
        orderBook.price = data.price
        orderBook.status = 'ACTIVE'
        yield orderBook.save()

        logger.info(`doAskBid:OrderBook saved...`)

        if (orderBook.isNew()) {
          throw new Exceptions.ApplicationException(`Unable to add your new ${data.type}.`, 400)
        }
        const freshInstance = yield this.OrderBook.find(orderBook.id)
        // match to do the matching new ask/bid
        const matching = yield MatcherService.tryMatch(freshInstance)
        const dataRedirect = {
          status: 'ok',
          success: `Successfully insert new ${data.type}.`
        }
        return dataRedirect

      } catch(e) {

        const errMsg = `Error to save new ${data.type} to OrderBook.`

        logger.error(`gibrex:Unable to process new ${data.type} `, e)
        logger.debug('Sending error message: ', errMsg)

        const dataRedirect = {
          status: 'error',
          error: errMsg
        }
        return dataRedirect
      }
    } else {
      const errMsg = 'Amount is required.'

      logger.error(`gibrex:Unable to process new orderbook: ${errMsg}`)
      logger.debug('Sending error message: ', errMsg)
      const dataRedirect = {
        status: 'error',
        error: errMsg
      }
      return dataRedirect
    }

  }

  * activateOrderBook(Id) {
    try {
      const ob = yield OrderBook.find(Id)
      logger.info('OrderBook fetched:', ob)
      ob.status = 'ACTIVE'
      yield ob.save()
    } catch (e) {
      logger.error('Unable to update OrderBook to active:', e.message)
      throw new Error('Unable to activate orderBook:', e.message)
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
