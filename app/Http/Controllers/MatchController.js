'use strict'

const Database = use('Database')
const log = use('npmlog')
const Event = use('Event')
const OrderBook = use('App/Model/OrderBook')
const MatcherService = make('App/Services/MatcherService')

class MatchController {

* process(request, response) {
    const ws = request.only(['type', 'asset', 'amount', 'price'])
    const data = yield MatcherService.compare(ws)
    response.ok(data)
  }

}

module.exports = MatchController
