'use strict'

const Database = use('Database')
const uuid = require('uuid/v4');


class PaymentService {

  /**
   * injecting required dependencies auto fulfilled
   * by IoC container
   *
   * @return {Array}
   */
  static get inject () {
    return ['App/Model/Payment']
  }

  /**
   * Constructor
   * @param {Payment} - The Payment model
   */
  constructor (Payment) {
    this.Payment = Payment
  }

  //=>show all data
  * showAll() {
    return yield Database.table('payments')
  }

  //=>insert data payment
  * store(trans_id, amount, type){

  	const payment = new this.Payment()

  	payment.uuid = uuid()
    payment.trans_id = trans_id
    payment.amount = amount
    payment.type = type

    yield payment.save()

    const freshInstance = yield this.Payment.find(payment.id)

    return freshInstance
  }

  //=>show some data payment
  * show(){

  	return yield Database
    .table('payments')
    .select('trans_id', 'amount', 'type')
    .where({id:id})

  }
}

 module.exports = PaymentService