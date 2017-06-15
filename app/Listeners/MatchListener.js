'use strict'

const log = make('App/Services/LogService')
const co = use('co')

const TxService = use('App/Services/TransactionService')
const MatchListener = exports = module.exports = {}

MatchListener.ok = function (data, obID) {
  // this.emitter gives access to the event instance
  log.info('Listener: Matched,ok: ask id', data.ask_id)
  log.info('Listener: Matched,ok: bid id', data.bid_id)
  log.info('Listener: Matched,ok: orderBook id', obID)
  //send execute trade
  co(function * () {
    yield TxService.createTx(data, obID)
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
