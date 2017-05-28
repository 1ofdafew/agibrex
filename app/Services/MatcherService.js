'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')

class MatcherService {

  static get inject () {
    return ['App/Model/OrderBook']
  }

  // constructor (User) {
  //   this.User = User
  // }

  * test() {

 		return log.info('test service')
  }

  * compare(data) {
   	const db_ob = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type', data.type)
    .where('status','1')
    .where('price',data.price)

  	if ( db_ob.length != 0) {	//ok
  	  	log.info('matched:result')
  		return Event.fire('match:ok',data)
      } else {	//fail
      	if (data.type = 'bid') {
      		log.info('recheck')
  	  		const best_ask = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
	    	.from('order_books')
	    	.where('type', 'ask')
	    	.where('status','1')
	    	.orderBy('price', 'asc')
	    	.orderBy('created_at','asc')

	    	if(data.price > best_ask[0].price) {
	    		const ob = new OrderBook({type: 'ask', asset:'BTC', amount: data.amount, price: data.price})
	    		log.info('service make neworder')
	    		return Event.fire('match:ok',data)
	    	}else{
	    		log.info('end')
	    		return Event.fire('match:failed',data)
	    	}
  		
    	} else {
    		log.info('end')
      		return Event.fire('match:failed',data)
      	} 
      }
  }

}

module.exports = MatcherService