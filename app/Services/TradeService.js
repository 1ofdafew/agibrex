'use strict'

// const OrderBook = use('App/Model/OrderBook')
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
