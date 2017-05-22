'use strict'

const log = use('npmlog')

const MatchedResult = exports = module.exports = {}

MatchedResult.ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Ok, result matched')
  //send execute trade
}

MatchedResult.recheck = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Failed, recheck')
}

MatchedResult.end = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Failed, end')
}