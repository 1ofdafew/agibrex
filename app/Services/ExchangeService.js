'use strict'

// const OrderBook = use('App/Model/OrderBook')
const debug = require('debug')('gibrex')
const log = require('npmlog')

class ExchangeService {

    static get inject () {
      return ['App/Model/OrderBook']
    }

    constructor (OrderBook) {
        this.OrderBook = OrderBook
    }

    * doAsk (total, amount, asset, to_asset, price) {

        if (total != '' && amount != '' && asset != '' && to_asset != '' && price != '') {

            try {
                // const data=request.only(['type', 'asset', 'amount', 'price','status','to_asset'])
                const orderBook = new this.OrderBook()
                // const orderBook = new OrderBook(data)
                orderBook.type = 'ASK'
                orderBook.asset = asset
                orderBook.to_asset = to_asset
                orderBook.amount = amount
                orderBook.price = price
                orderBook.status = 1

                yield orderBook.save()

                const dataRedirect = {
                    status: 'ok',
                    success: 'Successfully insert new Ask.'
                }

                return dataRedirect

            } catch(e) {

                debug(e)
                const errMsg = 'Error to save to OrderBook.'

                log.error('gibrex:Unable to process new ASK', e)
                debug('Sending error message: ', errMsg)

                const dataRedirect = {
                    status: 'error',
                    error: errMsg
                }

                return dataRedirect
            }
        } else {

            const errMsg = 'Amount to Sell is required.'

            log.error('gibrex:Unable to process new ASK', errMsg)
            debug('Sending error message: ', errMsg)

            const dataRedirect = {
                status: 'error',
                error: errMsg
            }

            return dataRedirect
        }

    }

}

module.exports = ExchangeService
