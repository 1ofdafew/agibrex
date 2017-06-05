'use strict'

const CoinFactory = make('App/Services/Coins/CoinFactory')
const Database = use('Database')
const uuid = require('uuid/v4');
const debug = require('debug')('gibrex')
const log = require('npmlog')

class TransactionService{

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Transaction']
  }

  /**
   * Constructor
   * @param {Transaction} - The Transaction model
   */
  constructor (Transaction) {
    this.Transaction = Transaction
  }

  //=>show all data
  * showAll() {
    return yield Database.table('transactions')
  }

  //=>insert data transaction
  * store (action, status, acc_type){
    const transaction = new this.Transaction()

    transaction.uuid = uuid()
    transaction.action = action
    transaction.status = status
    transaction.acc_type = acc_type

    yield transaction.save()

    const freshInstance = yield this.Transaction.find(transaction.id)

    return freshInstance
  }

  //=>show some data transaction
  * show(){
    return yield Database
      .table('transactions')
      .select('action', 'status', 'acc_type')
      .where({id:id})
  }

  // receive signal from MatchListener ( To create Tx (User) )
  * createTx (data) {

    /*
     * get data from Event match:ok
     * @params
     *       - bid_id : interger
     *       - ask_id : interger
     *       - amount : decimal
     */
    const bid = yield Database.select('user_id', 'type', 'asset', 'to_asset')
      .from('order_books')
      .where('status','ACTIVE')
      .where('id',data.bid_id)

    if (bid.length != 0) {

      const transaction = new this.Transaction()
      transaction.uuid = uuid()
      transaction.user_id = bid.user_id
      transaction.orderbook_id = data.id
      transaction.action = bid.type
      transaction.status = 'PENDING'
      transaction.trace = '1' // Process : Start

      yield transaction.save()

      const freshInstance = yield this.Transaction.find(transaction.id)

      // Call CoinFactory Svc to deduct ASSET
      /**
       * transfer coins from one to another
       *
       * @params transferData
       *            - from: string
       *            - to: string
       *            - value: float
       *            - pin: string
       */

      const dataDeduct = {
        from: '',
        to: '',
        value: '',
        pin: ''
      }
      const deduct = yield CoinFactory.transfer(dataDeduct)

      if ( deduct ) {
        // Update trace
        const dataTrace  = {
          tx_id: transaction.id,
          trace: '2', // Deduct Asset
          status 'PENDING'
        }

        const trace = yield this.doUpdateTrace(dataTrace)
      } else {
        // Update trace
        const dataTrace  = {
          tx_id: transaction.id,
          trace: '2', // Deduct Asset
          status 'ERROR'
        }

        const trace = yield this.doUpdateTrace(dataTrace)
      }

    } else {

      const errMsg = 'Orderbook not found.'

      log.error(`gibrex:Unable to create new Tx for Orderbook ID : ${data.id} `, errMsg)
      debug('Sending error message: ', errMsg)

      const dataRedirect = {
        status: 'error',
        error: errMsg
      }
    }
  }

  * doTransferToAsset (data) {
    /**
     * @params data
     *            - bid_id: interger
     *            - ask_id: interger
     *            - tx_id: interger
     */

    const bid = yield Database.select('user_id', 'type')
      .from('order_books')
      .where('status','ACTIVE')
      .where('id',data.bid_id)

    const asl = yield Database.select('user_id', 'type')
      .from('order_books')
      .where('status','ACTIVE')
      .where('id',data.ask_id)

    try {

      const dataDeduct = {
        from: '',
        to: '',
        value: '',
        pin: ''
      }
      const matching = yield CoinFactory.transfer(dataDeduct)

      // Update trace
      const dataTrace  = {
        tx_id: data.tx_id,
        trace: '7', // Execute Transaction Service
        status 'PENDING'
      }
      const trace = yield this.doUpdateTrace(dataTrace)

    } catch (e) {

      debug(e)
      const errMsg = `Error to execute Order ID : ${data.bid_id}.`

      log.error(`gibrex:Unable to execute Order ID ${data.bid_id}. Process failed at : 7 `, e)
      debug('Sending error message: ', errMsg)

      // Update trace
      const dataTrace  = {
        tx_id: data.tx_id,
        trace: '7', // Execute Transaction Service
        status 'FAILED'
      }
      const trace = yield this.doUpdateTrace(dataTrace)

      const dataRedirect = {
        status: 'error',
        error: errMsg
      }

      yield request.with(dataRedirect).flash()
      response.redirect(`/exchange/${bid.type}`)
    }
  }

  // receive signal from MatchListener ( To create Tx (User) )
  * createTx (data) {

    /*
     * get data from Event match:ok
     * @params
     *       - bid_id : interger
     *       - ask_id : interger
     *       - amount : decimal
     */
    const bid = yield Database.select('user_id', 'type', 'asset', 'to_asset')
      .from('order_books')
      .where('status','ACTIVE')
      .where('id',data.bid_id)

    if (bid.length != 0) {

      const transaction = new this.Transaction()
      transaction.uuid = uuid()
      transaction.user_id = bid.user_id
      transaction.orderbook_id = data.id
      transaction.action = bid.type
      transaction.status = 'PENDING'
      transaction.trace = '1' // Process : Start

      yield transaction.save()

      const freshInstance = yield this.Transaction.find(transaction.id)

      // Call CoinFactory Svc to deduct ASSET
      /**
       * transfer coins from one to another
       *
       * @params transferData
       *            - from: string
       *            - to: string
       *            - value: float
       *            - pin: string
       */

      const dataDeduct = {
        from: '',
        to: '',
        value: '',
        pin: ''
      }
      const deduct = yield CoinFactory.transfer(dataDeduct)

      if ( deduct ) {
        // Update trace
        const dataTrace  = {
          tx_id: transaction.id,
          trace: '2', // Deduct Asset
          status 'PENDING'
        }

        const trace = yield this.doUpdateTrace(dataTrace)
      } else {
        // Update trace
        const dataTrace  = {
          tx_id: transaction.id,
          trace: '2', // Deduct Asset
          status 'ERROR'
        }

        const trace = yield this.doUpdateTrace(dataTrace)
      }

    } else {

      const errMsg = 'Orderbook not found.'

      log.error(`gibrex:Unable to create new Tx for Orderbook ID : ${data.id} `, errMsg)
      debug('Sending error message: ', errMsg)

      const dataRedirect = {
        status: 'error',
        error: errMsg
      }

    }

  }

  * doTransferToAsset (data) {
    /**
     * @params data
     *            - bid_id: interger
     *            - ask_id: interger
     *            - tx_id: interger
     */

    const bid = yield Database.select('user_id', 'type')
      .from('order_books')
      .where('status','ACTIVE')
      .where('id',data.bid_id)

    const asl = yield Database.select('user_id', 'type')
      .from('order_books')
      .where('status','ACTIVE')
      .where('id',data.ask_id)

    try {

      const dataDeduct = {
        from: '',
        to: '',
        value: '',
        pin: ''
      }
      const matching = yield CoinFactory.transfer(dataDeduct)

      // Update trace
      const dataTrace  = {
        tx_id: data.tx_id,
        trace: '7', // Execute Transaction Service
        status 'PENDING'
      }
      const trace = yield this.doUpdateTrace(dataTrace)

    } catch (e) {

      debug(e)
      const errMsg = `Error to execute Order ID : ${data.bid_id}.`

      log.error(`gibrex:Unable to execute Order ID ${data.bid_id}. Process failed at : 7 `, e)
      debug('Sending error message: ', errMsg)

      // Update trace
      const dataTrace  = {
        tx_id: data.tx_id,
        trace: '7', // Execute Transaction Service
        status 'FAILED'
      }
      const trace = yield this.doUpdateTrace(dataTrace)

      const dataRedirect = {
        status: 'error',
        error: errMsg
      }

      yield request.with(dataRedirect).flash()
      response.redirect(`/exchange/${bid.type}`)
    }
  }

  * doSuccessTxProcess () {


  }

  * doUpdateTrace (data) {

    /**
     * @params data
     *            - tx_id: interger
     *            - trace_id: interger
     *            - status : String
     */

    return yield Database
      .table('transactions')
      .where('id', data.tx_id)
      .update('trace', data.trace_id)
      .update('status', data.status)
  }

}

module.exports = TransactionService
