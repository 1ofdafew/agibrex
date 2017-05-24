'use strict'

const Transaction = use('App/Model/Transaction')
const Validator = use('App/Services/Validator')
const TransactionService = make('App/Services/TransactionService')

const Database = use('Database');

class TransactionController {

  * index (request, response) {
    const transaction = yield TransactionService.showAll()
      response.json(transaction)
    }

  * store(request, response) {
    const data = request.only('action', 'status', 'acc_type')
      yield Validator.validate(data)

    const trans = yield TransactionService.store(
      data.action, data.status, data.acc_type)

      console.log('TransactionController data....')
      console.log(data)

      response.json(trans)
    }

  * show(request, response) {
    const transaction = yield TransactionService.show()
      response.json(transaction)
    }
}

module.exports = TransactionController
