'use strict'

// const OrderBook = use('App/Model/OrderBook')
const MatcherService = make('App/Services/MatcherService')
const debug = require('debug')('gibrex')
const log = require('npmlog')

class TradeService {

    static get inject () {
      return ['App/Model/OrderBook']
    }

    constructor (OrderBook) {
        this.OrderBook = OrderBook
    }

    * doAskBid (data) {

        if (data) {

            try {
                // const data=request.only(['type', 'asset', 'amount', 'price','status','to_asset'])
                const orderBook = new this.OrderBook(data, data.user)
                // const orderBook = new OrderBook(data)
                orderBook.type = data.type
                orderBook.asset = data.asset
                orderBook.to_asset = data.to_asset
                orderBook.amount = data.amount
                orderBook.price = data.price
                orderBook.status = 1

                yield orderBook.save()

                if (orderBook.isNew()) {
                  throw new Exceptions.ApplicationException(`Unable to add your new ${data.type}.`, 400)
                }

                // const freshInstance = yield this.OrderBook.find(orderBook.id)

                // match to do the matching new ask/bid
                const matching = yield MatcherService.compare(data)

                const dataRedirect = {
                    status: 'ok',
                    success: `Successfully insert new ${data.type}.`
                }

                return dataRedirect

            } catch(e) {

                debug(e)
                const errMsg = `Error to save new ${data.type} to OrderBook.`

                log.error(`gibrex:Unable to process new ${data.type} `, e)
                debug('Sending error message: ', errMsg)

                const dataRedirect = {
                    status: 'error',
                    error: errMsg
                }

                return dataRedirect
            }
        } else {

            const errMsg = 'Amount is required.'

            log.error(`gibrex:Unable to process new ${data.type} `, errMsg)
            debug('Sending error message: ', errMsg)

            const dataRedirect = {
                status: 'error',
                error: errMsg
            }

            return dataRedirect
        }

    }

}

module.exports = TradeService
