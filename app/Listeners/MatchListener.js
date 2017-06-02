'use strict'

const log = use('npmlog')

const MatchListener = exports = module.exports = {}

MatchListener.ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Matched,ok',data)//,data.type, data.price, data.amount, data.id, data.uuid, data.status)
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
