'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')

class OrderBookService {

  static get inject () {
    return ['App/Model/OrderBook']
  }

  * index() {
 	return yield Database.table('order_books')
    .where('status','1')
  }

  * showdelete() {
  	return yield Database.table('order_books')
    .where('status','0')
  }

  * delete(data) {
    return yield Database
      .table('order_books')
      .where('uuid', data.uuid)
      .update('status', '0')
  }

  * activate(data) {
    return yield Database
      .table('order_books')
      .where('uuid', data.uuid)
      .update('status', '1')
  }

  // * store(data) {
  //   const user = yield request.auth.getUser()
  //   const ob = new OrderBook(data, user)
  //   return yield ob.save()
  // }

  // * showbid(asset) {
  // 	return yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
  //     .from('order_books')
  //     .where('type','bid')
  //     .where('asset',asset)
  //     .where('status','1')
  //     .orderBy('price', 'desc')
  //     .orderBy('created_at','asc')
  // }

  // * showask(asset) {
  // 	return yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
  //     .from('order_books')
  //     .where('type','ask')
  //     .where('asset',asset)
  //     .where('status','1')
  //     .orderBy('price', 'asc')
  //     .orderBy('created_at','asc')
  // }
}
module.exports = OrderBookService