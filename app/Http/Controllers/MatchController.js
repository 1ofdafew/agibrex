'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')

class MatchController {

  * bidprocess(request, response) {
	const ws_bid=request.only(['type', 'asset', 'amount', 'price'])
    const db_ask = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type', 'ask')
    .where('status','1')
    .where('price',ws_bid.price)

	log.info('ws_bid.price:',ws_bid.price)
    log.info('db_ask.length:',db_ask.length)
   
  	if ( db_ask.length != 0) {	//ok
  	  	log.info('matched:result')
  	Event.fire('matched:result')
      } else {	//fail
  	  	log.info('unmatched:result')
  	Event.fire('unmatched:result')
      }
    response.json(db_ask)
  }
   
  * askprocess(request, response) {
	const ws_ask=request.only(['type', 'asset', 'amount', 'price'])
    const db_bid = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type', 'bid')
    .where('status','1')
    .where('price',ws_ask.price)

	log.info('ws_ask.price:',ws_ask.price)
    log.info('db_bid.length:',db_bid.length)

  	if ( db_bid.length != 0) {	//ok
  	  	log.info('matched:result')
  	Event.fire('matched:result')
      } else {	//fail
  	  	log.info('unmatched:result')
  	Event.fire('unmatched:result')
      }
    response.json(db_bid)
  }
}

module.exports = MatchController
