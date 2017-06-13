'use strict'

const log = make('App/Services/LogService')

const TradeListener = exports = module.exports = {}

TradeListener.execute = function (data) {
  // this.emitter gives access to the event instance
  log.info('Listener: Execute,ok',data)//,data.type, data.price, data.amount, data.id, data.uuid, data.status)
  //send execute trade
}
