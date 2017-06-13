'use strict'

const DataFetcher = exports = module.exports = {}
const CoindeskService = use('App/Services/CoindeskService')

const log = make('App/Services/LogService')

DataFetcher.fetchDaily = function (data) {
  // this.emitter gives access to the event instance
  log.info('Fetching daily data...')
}
