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
      'App/Model/OrderBook',
      'App/Model/User'
    ]
  }

  constructor (OrderBook, User) {
    this.OrderBook = OrderBook
    this.User = User
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

  * store(data, user) {
    const ob = new OrderBook()
    ob.user_id = user.id,
    ob.amount = data.amount,
    ob.price = data.price,
    ob.status = data.status,
    ob.asset = data.asset,
    ob.to_asset = data.to_asset,
    ob.type = data.type    
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
    const all = yield this.OrderBook.query().where('user_id', user.id).fetch()
    // console.log(all)
    return all
  }

  * getLowestBid(assetFrom, assetTo) {
    return yield Database.table('order_books')
      .where('asset', assetFrom)
      .where('to_asset', assetTo)
      .orderBy('price', desc)
      .limit(1)
  }

  * getHighestBid(assetFrom, assetTo) {
    return yield Database.table('order_books')
      .where('asset', assetFrom)
      .where('to_asset', assetTo)
      .orderBy('price', asc)
      .limit(1)
  }
}
module.exports = OrderBookService

