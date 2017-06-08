'use strict'

const log = use('npmlog')

const TxService = use('App/Services/TransactionService')
const MatchListener = exports = module.exports = {}

MatchListener.ok = function (id, type) {
  // this.emitter gives access to the event instance
  log.info('Listener: Matched,ok: orderBook id', id)
  log.info('Listener: Matched,ok: orderBook type', type)
  //send execute trade
  TxService.createTx(id, type)
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
