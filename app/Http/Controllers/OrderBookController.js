'use strict'

const OrderBook = use('App/Model/OrderBook')
const Database = use('Database')
const OBService = make('App/Services/OrderBookService')

class OrderBookController {

  * index(request, response) {
    const ob = yield OBService.index()
    response.json(ob)
  }

  * showdelete(request, response) {
    const ob = yield OBService.showdelete()
    response.json(ob)//Show all from order_books table in json
  }

  * store(request, response) {
    const data = request.post()
    console.log('Storing new orderbook row:', data)
    // console.log(data)
    const user = yield request.auth.getUser()
    const ob = new OrderBook(data, user)
    yield ob.save()//Save to new row table
    response.json({status: 'ok', data: ob})
  }

  * showbid(asset) {
    const bidlist = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
      .from('order_books')
      .where('type','bid')
      .where('asset',asset)
      .where('status','ACTIVE')
      .orderBy('price', 'desc')
      .orderBy('created_at','asc')
    console.log('Display all bidlist....')
    console.log(bidlist)
    return bidlist//Show where type=bid from order_book table
  }

  * showask(asset) {
    const asklist = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'to_asset')
      .from('order_books')
      .where('type', 'ask')
      .where('asset',asset)
      .where('status','ACTIVE')
      .orderBy('price', 'asc')
      .orderBy('created_at','asc')
    console.log('Display all asklist....')
    console.log(asklist)
    return asklist//Show where type=ask from order_book table
  }

  * delete(request, response) {
    const data=request.only(['uuid'])
    const ob = yield OBService.delete(data)
    response.ok(data)//Deactivate row by change status=0
  }

  * activate(request, response) {
    const data=request.only(['uuid'])
    const ob = yield OBService.activate(data)
    response.ok(data)//Activate row by change status=1
  }

}

module.exports = OrderBookController
