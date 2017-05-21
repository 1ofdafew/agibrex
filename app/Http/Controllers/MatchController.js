'use strict'

// const OrderBook = use('App/Model/OrderBook')
const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')

class MatchController {

  // * index(request, response) {
  //  }

  * bidprocess(request, response) {
    // const ws_bid = new this.ws_bid()
    // ws_bid.price = price
    // yield ws_bid.save()

    const ws_bid = 90.54//for testing, need to get input from bidsocket

    const db_ask = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type', 'ask')
    .where('status','1')
    .where('price',ws_bid)

    log.info('db_ask:')
    log.info(db_ask.length)

   
  	if ( db_ask.length != 0) {
  	//ok
  	Event.fire('matched:result')
  	log.info('matched:result')

      } else {
  	//fail
  	Event.fire('unmatched:result')
  	log.info('unmatched:result')


      }
    response.json(db_ask)

  }
    

  // * askprocess(request, response) {
  //   const ws_ask = new this.ws_ask()
  //   ws_ask.price = price
  //   yield ws_ask.save()

  //   const db_bid = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
  //   .from('order_books')
  //   .where('type', 'bid')
  //   .where('status','1')
  //   .where('price',ws_ask.price)



  // 	if ( db_bid.length != 0) {
  // 	//ok
  // 	Event.fire('matched:result')

  //     } else {
  // 	//fail
  // 	Event.fire('unmatched:result')

  //     }

  // }


}

module.exports = MatchController
