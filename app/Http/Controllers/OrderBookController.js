'use strict'

const OrderBook = use('App/Model/OrderBook')
const Database = use('Database')

class OrderBookController {

  * index(request, response) {
    const ob = yield OrderBook.all()
    response.json(ob)     
  }

  * create(request, response) {
    //
  }

  * store(request, response) {
    const data=request.only(['type','asset','amount','price'])
    const ob = new OrderBook(data)
    yield ob.save()
    response.ok(ob)
  }

  * show(request, response) {
    //const bidlist = yield Database.select('type','price','amount','id','create_at').from('order_books').where('type', 'bidlist').orderBy('price', 'desc').orderBy('created_at','asc')
    const bidlist = yield Database.select('type','price','amount','id','create_at').from('order_books').where('type','bid')
    //const bidlist = yield Database.table('order_books').where('type', 'test').orderBy('price', 'desc').orderBy('created_at','asc')
    response.json(bidlist)
  }

  * edit(request, response) {
    //
  }

  * update(request, response) {
    //
  }

  * destroy(request, response) {
    //
  }

}

module.exports = OrderBookController
