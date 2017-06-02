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

    if (!orderBook || typeof (orderBook.toJSON) !== 'function') {
      throw new Error('MatcherService expects a valid instance of OrderBook Model.')
    }

    const possibleMatch = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
      .from('order_books')
      .whereNot('type', orderBook.type)//type not same
      .where('status', 'ACTIVE')
      .where('price', orderBook.price)
      .groupBy('price')//price same

    log.info(possibleMatch.length)

    if (possibleMatch.length != 0) {  //ok,matched
      log.info('matched:result')
      return Event.fire('matcher:ok', orderBook, possibleMatch[0])
    } else {  //failed, initially not match
      // if (orderBook.type === 'BID') {
      //   log.info('recheck')
      //   const best_ask = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
      //     .from('order_books')
      //     .where('type', 'ASK')
      //     .where('status','ACTIVE')
      //     .orderBy('price', 'asc')
      //     .orderBy('created_at','asc')

      //   if (data.price > best_ask[0].price) { //create new orderbook
      //     const ob = new OrderBook({type: 'ASK', asset:'BTC', amount: data.amount, price: data.price})
      //     log.info('service make neworder')
      //     return Event.fire('match:ok',data)
      //   } else {
      //     log.info('end')
      //     return Event.fire('match:failed',data)
      //   }
      // } else {
      // log.info('end')
      //     return Event.fire('match:failed',data)
      // }
    }
  }

}

module.exports = MatcherService
