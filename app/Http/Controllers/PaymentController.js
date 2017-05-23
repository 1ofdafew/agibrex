'use strict'

const Payment = use('App/Model/Payment')
const Database = use('Database');

class PaymentController {

* index (request, response) {

      const payment = yield Database.table('payments')
      response.json(payment)
    }
  

    * store(request, response) {
      const data = request.only(['trans_id', 'amount', 'type'])
      console.log('PaymentController data....')
      console.log(data)

          const payment = new Payment(data)
          yield payment.save()
          response.ok(payment)
      }

      * show(request, response) {

        const id = request.param("id");

        
        const data = yield Database
        .table('payments')
        .select('trans_id', 'amount', 'type')
        .where({id:id})

        response.json(data)

        }

}

module.exports = PaymentController
