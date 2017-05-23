'use strict'

const Transaction = use('App/Model/Transaction')
const Database = use('Database');

class TransactionController {

	 * index (request, response) {

       const transaction = yield Database.table('transactions')
      response.json(transaction)
    }

    * store(request, response) {
      const data = request.only(['action', 'status', 'acc_type'])
      console.log('TransactionController data....')
      console.log(data)

          const transaction = new Transaction(data)
          yield transaction.save()
          response.ok(transaction)
      }

      * show(request, response) {

        const id = request.param("id");

        
        const data = yield Database
        .table('transactions')
        .select('action', 'status', 'acc_type')
        .where({id:1})

        response.json(data)

        }

}

module.exports = TransactionController
