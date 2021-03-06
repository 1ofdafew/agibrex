'use strict'

const Database = use('Database')
const log = make('App/Services/LogService')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')
const Matching = use('App/Model/Matching')

class MatcherService {

  // static get inject () {
  //   return ['App/Model/OrderBook']
  // }

  * tryMatch(orderBook) {

    log.info('tryMatch:Trying to matching Orderbook...')

    // if (!orderBook || typeof (orderBook.toJSON) !== 'function') {
    //   throw new Error('MatcherService expects a valid instance of OrderBook Model.')
    // }

    const matched = yield Database.select('type', 'price', 'amount', 'id', 'uuid', 'status', 'balance')
      .from('order_books')
      .whereNot('type', orderBook.type)
      .where('to_asset', orderBook.asset)
      .where('status', 'ACTIVE')
      .where('price', orderBook.price)
      .whereNot('balance', 0)
      .orderBy('created_at','asc')
     //  .groupBy('price')//price same

    log.info(`tryMatch:Matching Sql executed..`)
    log.info(`tryMatch:Matched Total = ${matched.length}`)
    // log.info('tryMatch:Matching to ', matched)
    if (matched.length != 0) {  //ok,matched
     //  log.info('matched:result')
     var asset_balance = orderBook.balance
     var to_asset_balance = 0
     var diff = 0
     log.info(`Asset start balance before matching : ${asset_balance}`) // 1
     for (var i = 0; i < matched.length; i++) {

       if (asset_balance > 0) {
           log.info(`_______________Matching ${i+1} Start_______________`)
           log.info(`Matching ${i+1}: Uuid = ${matched[i].uuid}`)

           to_asset_balance = matched[i].balance

           if (asset_balance >= to_asset_balance) {
                diff = to_asset_balance.toFixed(8)
           } else {
                diff = asset_balance.toFixed(8)
           }

           log.info(`Matching ${i+1}: ToAsset Balance before: ${to_asset_balance}`)

           asset_balance = (asset_balance - diff).toFixed(8)
           to_asset_balance = (to_asset_balance - diff).toFixed(8)

           log.info(`Matching ${i+1}: ToAsset Balance after: ${to_asset_balance}`)
           log.info(`Matching ${i+1}: Asset balance after matching : ${asset_balance}`)

           // insert to matchings table
           if (orderBook.type == 'BID') {
               const matching_bid = new Matching()
               matching_bid.ask_id = matched[i].id
               matching_bid.bid_id = orderBook.id
               matching_bid.amount = diff
               yield matching_bid.save()

               const matchOK = yield Database.select('id', 'ask_id', 'bid_id', 'amount', 'created_at', 'updated_at')
                 .from('matchings')
                 .where('ask_id', orderBook.id)
                 .where('bid_id', matched[i].id)

               // log.info(`matchOK value: ${matchOK.id}`)

           }else{
               const matching_ask = new Matching()
               matching_ask.ask_id = orderBook.id
               matching_ask.bid_id = matched[i].id
               matching_ask.amount = diff
               yield matching_ask.save()

               const matchOK = yield Database.select('id', 'ask_id', 'bid_id', 'amount', 'created_at', 'updated_at')
                 .from('matchings')
                 .where('ask_id', orderBook.id)
                 .where('bid_id', matched[i].id)

               // log.info(`matchOK value: ${matchOK.id}`)

           }

           log.info(`Matching ${i+1}: Saved matching to table...`)

           // update balance to orderbooks
           var status = 'ACTIVE'
           if (to_asset_balance == 0) {
               status = 'CLOSED'
           }

           const updateOb = yield Database
             .table('order_books')
             .where('id', matched[i].id)
             .update('status', status)
             .update('balance', to_asset_balance)

           log.info(`Matching ${i+1}: Updated balance for Orderbook ID : ${matched[i].id}`)

           log.info(`_______________Matching ${i+1} End_______________`)
       }

       var statusAssetOb = 'ACTIVE'
       if (asset_balance == 0) {
          statusAssetOb = 'CLOSED'
       }
       const updateOb = yield Database
         .table('order_books')
         .where('id', orderBook.id)
         .update('status', statusAssetOb)
         .update('balance', asset_balance)

       log.info(`tryMatch: Updated balance for Asset's Orderbook ID : ${orderBook.id}`)
       log.info(`test : ${matching_bid.id}`)
       
       Event.fire('matcher:ok',matchOK, orderBook.id)
     }

      return true
    }
    return false
  }

}

module.exports = MatcherService
