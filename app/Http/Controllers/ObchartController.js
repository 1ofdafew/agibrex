'use strict'

const Database = use('Database')

class ObchartController {

  * index (request, response) {

    const bid = yield Database.select('price', 'balance')
      .from('order_books')
      .whereNot('asset', 'TRC') //filter TRC
      .where('type','bid')
      .where('status','ACTIVE')
      .orderBy('price', 'asc')
      .groupBy('price')

    const ask = yield Database.select('price', 'balance')
      .from('order_books')
      .whereNot('asset', 'TRC') //filter TRC
      .where('type', 'ask')
      .where('status','ACTIVE')
      .orderBy('price', 'asc')
      .groupBy('price')

    response.jsonp({bid: bid, ask: ask})
  }

  * bid (request, response) {
    const bid = yield Database.select('price', 'balance')
    .from('order_books')
    .where('type','bid')
    .where('status','ACTIVE')
    .orderBy('price', 'asc')
    .groupBy('price')
    response.jsonp(bid)
  }

  * ask (request, response) {
    const ask = yield Database.select('price', 'balance')
    .from('order_books')
    .where('type', 'ask')
    .where('status','ACTIVE')
    .orderBy('price', 'asc')
    .groupBy('price')
    response.jsonp(ask)
  }
  
}

module.exports = ObchartController
