'use strict'

const log = make('App/Services/LogService')

const TxListener = exports = module.exports = {}

TxListener.create_ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Tx create ok ',data)
  //send to cron(verify)
}

TxListener.execute_ok = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Tx execute ok ',data)
  //send to execute(Trade listener)
}