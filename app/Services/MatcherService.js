'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')

class MatcherService {

  // static get inject () {
  //   return ['App/Model/OrderBook']
  // }

  * tryMatch(orderBook) {

    log.info('tryMatch:Trying to matching Orderbook...')

    // if (!orderBook || typeof (orderBook.toJSON) !== 'function') {
    //   throw new Error('MatcherService expects a valid instance of OrderBook Model.')
    // }

    const matched = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
      .from('order_books')
      .whereNot('type', orderBook.type)
      .where('to_asset', orderBook.asset)
      .where('status', 'ACTIVE')
      .where('price', orderBook.price)
      .groupBy('price')//price same

    log.info(`tryMatch:Matching Sql executed..`)
    log.info(`tryMatch:Matched Total = ${matched.length}`)

    if (matched.length != 0) {  //ok,matched
      log.info('matched:result')
      Event.fire('matcher:ok', orderBook, matched)
      return true
    }
    return false
  }

}

module.exports = MatcherService
