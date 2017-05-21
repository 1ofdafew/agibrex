'use strict'

const log = use('npmlog')

const MatchedResult = exports = module.exports = {}

MatchedResult.ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Ok, result matched')
  //send execute trade
}

MatchedResult.failed = function (data) {
  // this.emitter gives access to the event instance
  log.info('Failed, redo')
}
