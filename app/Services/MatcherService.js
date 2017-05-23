'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')

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
  		return Event.fire('matched:result',data)
      } else {	//fail
  	  	log.info('unmatched:result')
  		return Event.fire('unmatched:result',data)
      }
  }

}

module.exports = MatcherService