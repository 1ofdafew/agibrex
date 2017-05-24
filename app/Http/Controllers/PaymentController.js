'use strict'

const Payment = use('App/Model/Payment')
const Validator = use('App/Services/Validator')
const PaymentService = make('App/Services/PaymentService')

const Database = use('Database');

class PaymentController {

  * index (request, response) {
    const payment = yield PaymentService.showAll()
      response.json(payment)
    }
  

  * store(request, response) {
    const data = request.only('trans_id', 'amount', 'type')
      
    const payment = yield PaymentService.store(
      data.trans_id, data.amount, data.type)

      console.log('PaymentController data....')
      console.log(data)

      response.json(payment)
    }

  * show(request, response) {
    const payment = yield PaymentService.show()
      response.json(payment)
    }
}

module.exports = PaymentController
