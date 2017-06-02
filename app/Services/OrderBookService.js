'use strict'

const Exceptions = use('App/Exceptions')
const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')
const User = use('App/Model/User')

class OrderBookService {

  static get inject () {
    return [
      'App/Model/OrderBook'
    ]
  }

  constructor (OrderBook) {
    this.OrderBook = OrderBook
  }

  * index() {
 	return yield Database.table('order_books')
    .where('status','ACTIVE')
  }

  * showdelete() {
  	return yield Database.table('order_books')
    .where('status','CANCELLED')
  }

  * delete(data) {
    return yield Database
      .table('order_books')
      .where('uuid', data.uuid)
      .update('status', 'CANCELLED')
  }

  * activate(data) {
    return yield Database
      .table('order_books')
      .where('uuid', data.uuid)
      .update('status', 'ACTIVE')
  }

  * store(data) {
    const ob = new OrderBook(data)
    yield ob.save()

    if (ob.isNew()) {
      throw new Exceptions.ApplicationException('Unable to create new OrderBook, pls try again', 400)
    }
    return ob
  }

  * findByUser(user) {
    if (!user || typeof (user.toJSON) !== 'function') {
      throw new Error('OrderBook expects a valid instance of User Model.')
    }
    return yield this.OrderBook.query().where('user_id', user.id).fetch()
  }

  // * showbid(asset) {
  // 	return yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
  //     .from('order_books')
  //     .where('type','bid')
  //     .where('asset',asset)
  //     .where('status','ACTIVE')
  //     .orderBy('price', 'desc')
  //     .orderBy('created_at','asc')
  // }

  // * showask(asset) {
  // 	return yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
  //     .from('order_books')
  //     .where('type','ask')
  //     .where('asset',asset)
  //     .where('status','ACTIVE')
  //     .orderBy('price', 'asc')
  //     .orderBy('created_at','asc')
  // }
}
module.exports = OrderBookService