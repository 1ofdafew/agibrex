'use strict'

const OrderBook = use('App/Model/OrderBook')
const Database = use('Database')

class OrderBookController {

  * index(request, response) {
    const ob = yield Database.table('order_books')
    .where('status','1')
    console.log('Display all orderbook....')
    console.log(ob)
    response.json(ob)//Show all from order_books table in json
  }


  * showdelete(request, response) {
    const ob = yield Database.table('order_books')
    .where('status','0')
    console.log('Display deleted orderbook....')
    console.log(ob)
    response.json(ob)//Show all from order_books table in json
  }
  // * create(request, response) {
  //   //
  // }

  * store(request, response) {
    const data=request.only(['type', 'asset', 'amount', 'price','status'])
    console.log('Storing new orderbook row....')
    console.log(data)
    const ob = new OrderBook(data)
    yield ob.save()//Save to new row table
    response.ok(ob)
  }

  // * show(request, response) {
  //   //
  // }

  * showbid(request, response) {
    const bidlist = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type','bid')
    .where('status','1')
    .orderBy('price', 'desc')
    .orderBy('created_at','asc')
    console.log('Display all bidlist....')
    console.log(bidlist)
    response.json(bidlist)//Show where type=bid from order_book table
  }

  * showask(request, response) {
    const asklist = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type', 'ask')
    .where('status','1')
    .orderBy('price', 'asc')
    .orderBy('created_at','asc')
    console.log('Display all asklist....')
    console.log(asklist)
    response.json(asklist)//Show where type=ask from order_book table
  }

  // * edit(request, response) {
  //   //
  // }

  * delete(request, response) {
    const data=request.only(['uuid'])
    console.log('Disable status with uuid:')
    console.log(data)
    const updateRow = yield Database
    .table('order_books')
    .where('uuid', data.uuid)
    .update('status', '0')
    response.ok(updateRow)
  }

  * activate(request, response) {
    const data=request.only(['uuid'])
    console.log('Enable status with uuid:')
    console.log(data)
    const updateRow = yield Database
    .table('order_books')
    .where('uuid', data.uuid)
    .update('status', '1')
    response.ok(updateRow)
  }

  // * destroy(request, response) {
  //   //
  // }

}

module.exports = OrderBookController
