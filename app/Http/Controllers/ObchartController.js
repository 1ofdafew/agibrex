'use strict'

const Database = use('Database')

class ObchartController {

  * index (request, response) {

    const bid = yield Database.select('price', 'amount')
    .from('order_books')
    .where('type','bid')
    .where('status','1')
    .orderBy('price', 'asc')
    .groupBy('price')

    const ask = yield Database.select('price', 'amount')
    .from('order_books')
    .where('type', 'ask')
    .where('status','1')
    .orderBy('price', 'asc')
    .groupBy('price')

    // console.log('ask:', ask)
    // console.log('bid:', bid)
    // console.log(bid, ask)
    // const data = {bid: bid, ask: ask}
    console.log(ask)

    yield response.sendView('orderbook.chart',{
      bid_data : bid,
      ask_data : ask,

    })
    // const resp = `callback=([`, ask, bid,`]);`
    // console.log('resp:', resp)

    // response.jsonp({bid: bid, ask: ask})
    // return(bid,ask)
  }
  
}

module.exports = ObchartController