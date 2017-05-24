'use strict'

const log = use('npmlog')

const MatchedResult = exports = module.exports = {}

MatchedResult.ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Matched,ok',data)//,data.type, data.price, data.amount, data.id, data.uuid, data.status)
  //send execute trade
}

MatchedResult.recheck = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Unmatched,recheck',data)
}

MatchedResult.failed = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Failed, end',data)
}