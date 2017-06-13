'use strict'

const log = make('App/Services/LogService')
const co = use('co')

const TxService = use('App/Services/TransactionService')
const MatchListener = exports = module.exports = {}

MatchListener.ok = function (orderBook_id, matched_id) {
  // this.emitter gives access to the event instance
  log.info('Listener: Matched,ok: orderBook id', orderBook_id)
  log.info('Listener: Matched,ok: matched id', matched_id)
  //send execute trade
  co(function * () {
    yield TxService.createTx(orderBook_id, matched_id)
  })
}

MatchListener.recheck = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Unmatched,recheck',data)
}

MatchListener.failed = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Failed, end',data)
}

// MatchListener.create_txn = function (data) {
//   // this.emitter gives access to the event instance
//   log.info('Listener: Created, txn',data)
// }
