'use strict'

const log = use('npmlog')

const MatchedResult = exports = module.exports = {}

MatchedResult.ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Ok, result matched',data)//,data.type, data.price, data.amount, data.id, data.uuid, data.status)
  //send execute trade
}

MatchedResult.recheck = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Failed, recheck',data)
}

MatchedResult.end = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Failed, end',data)
}