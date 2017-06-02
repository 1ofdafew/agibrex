'use strict'

const log = use('npmlog')

const MatchListener = exports = module.exports = {}

MatchListener.ok = function (buyer, seller) {
  // this.emitter gives access to the event instance
  log.info('Listener: Matched,ok: buyer', buyer)
  log.info('Listener: Matched,ok: seller', seller)
  //send execute trade
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
