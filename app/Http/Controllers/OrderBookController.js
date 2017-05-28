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

  * store(request, response) {
    const data=request.only(['type', 'asset', 'amount', 'price','status'])
    console.log('Storing new orderbook row....')
    console.log(data)
    const ob = new OrderBook(data)
    yield ob.save()//Save to new row table
    response.ok(ob)
  }

  * showbid(asset) {
    const bidlist = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status')
    .from('order_books')
    .where('type','bid')
    .where('asset',asset)
    .where('status','1')
    .orderBy('price', 'desc')
    .orderBy('created_at','asc')
    console.log('Display all bidlist....')
    console.log(bidlist)
    response.json(bidlist)//Show where type=bid from order_book table
  }

  * showask(asset) {
    const asklist = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
    .from('order_books')
    .where('type', 'ask')
    .where('asset',asset)
    .where('status','1')
    .orderBy('price', 'asc')
    .orderBy('created_at','asc')
    console.log('Display all asklist....')
    console.log(asklist)
    return asklist//Show where type=ask from order_book table
  }

  * delete(request, response) {
    const data=request.only(['uuid'])
    console.log('Disable status with uuid:')
    console.log(data)
    const updateRow = yield Database
    .table('order_books')
    .where('uuid', data.uuid)
    .update('status', '0')
    response.ok(updateRow)//Deactivate row by change status=0
  }

  * activate(request, response) {
    const data=request.only(['uuid'])
    console.log('Enable status with uuid:')
    console.log(data)
    const updateRow = yield Database
    .table('order_books')
    .where('uuid', data.uuid)
    .update('status', '1')
    response.ok(updateRow)//Activate row by change status=1
  }

}

module.exports = OrderBookController
