'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')
const MatcherService = make('App/Services/MatcherService')

class MatchController {

* process(request, response) {
    const ws = request.only(['type', 'asset', 'amount', 'price'])
    const data = yield MatcherService.compare(ws)
    response.ok(data)
  }


 //  * bidprocess(request, response) {
	// const ws_bid=request.only(['type', 'asset', 'amount', 'price'])
 //    const db_ask = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
 //    .from('order_books')
 //    .where('type', 'ask')
 //    .where('status','1')
 //    .where('price',ws_bid.price)

	// log.info('ws_bid.price:',ws_bid.price)
 //    log.info('db_ask.length:',db_ask.length)
   
 //  	if ( db_ask.length != 0) {	//ok
 //  	  	log.info('matched:result')
 //  		Event.fire('matched:result',db_ask)
 //      } else {	//fail
 //  	  	log.info('unmatched:result')
 //  		Event.fire('unmatched:result',ws_bid)
 //      }
 //    response.json(db_ask)
 //  }
   
 //  * askprocess(request, response) {
	// const ws_ask=request.only(['type', 'asset', 'amount', 'price'])
 //    const db_bid = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
 //    .from('order_books')
 //    .where('type', 'bid')
 //    .where('status','1')
 //    .where('price',ws_ask.price)

	// log.info('ws_ask.price:',ws_ask.price)
 //    log.info('db_bid.length:',db_bid.length)

 //  	if ( db_bid.length != 0) {	//ok
 //  	  	log.info('matched:result')
 //  		Event.fire('matched:result',db_bid)
 //      } else {	//fail
 //  	  	log.info('unmatched:result')
 //  		Event.fire('unmatched:result',ws_ask)
 //      }
 //    response.json(db_bid)
 //  }

 //  * neworder(request, response) {
 //  	const bid_price=request.only(['type', 'asset', 'amount', 'price'])
 //  	const best_ask = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
 //    .from('order_books')
 //    .where('type', 'ask')
 //    .where('status','1')
 //    .orderBy('price', 'asc')
 //    .orderBy('created_at','asc')

 //    log.info('bid_price.price:',bid_price.price)
 //    log.info('best_ask[0].price:',best_ask[0].price)

 //    if (bid_price.price > best_ask[0].price) {
 //    	log.info('create new order ask')
 //    	const data={type: 'ask', asset:'BTC', amount: bid_price.amount, price: bid_price.price}
 //    	const ob = new OrderBook(data)
 //  	  	log.info('matched:result')
 //  		Event.fire('matched:result',data)
 //    	yield ob.save()
 //    	 } else {
 //  	  	log.info('end:result')
 //  		Event.fire('end:result')
 //      }
 //    response.ok(bid_price)
 
 //  }
}

module.exports = MatchController
